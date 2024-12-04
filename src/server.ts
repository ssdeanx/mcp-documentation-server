import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import compression from 'compression';
import { loadConfig } from './config';
import { handleError } from './middleware/errorHandler';
import { validateSearchParams, validateCodeAnalysisParams } from './middleware/validation';
import { searchDocumentation } from './handlers/searchHandler';
import { analyzeCode } from './handlers/codeAnalysisHandler';
import { SearchParams, CodeAnalysisParams } from './types';
import { rateLimiter } from './utils/rateLimit';
import { cacheManager } from './utils/cache';
import { metrics } from './utils/metrics';
import { healthChecker } from './utils/health';
import logger from './utils/logger';

export class DocumentationServer {
    private app: Express;
    private config: ReturnType<typeof loadConfig>;
    private server: any;

    constructor() {
        this.config = loadConfig();
        this.app = express();
        this.setupMiddleware();
        this.setupRoutes();
    }

    private setupMiddleware(): void {
        this.app.use(cors());
        this.app.use(compression());
        this.app.use(express.json());
    }

    private setupRoutes(): void {
        // Search documentation endpoint
        this.app.post('/api/search', async (req: Request, res: Response) => {
            const startTime = Date.now();
            try {
                if (!rateLimiter.isAllowed('search')) {
                    throw new Error('Rate limit exceeded');
                }

                const params = req.body as SearchParams;
                validateSearchParams(params);

                const cachedResults = cacheManager.getSearchResults(params);
                if (cachedResults) {
                    metrics.increment('cache_hits');
                    return res.json({ success: true, results: cachedResults });
                }

                metrics.increment('searches');
                const results = await searchDocumentation(params);
                cacheManager.setSearchResults(params, results);
                metrics.recordTiming('search_duration', Date.now() - startTime);

                res.json({ success: true, results });
            } catch (error) {
                metrics.increment('errors');
                healthChecker.recordError(error);
                res.status(500).json(handleError(error));
            }
        });

        // Code analysis endpoint
        this.app.post('/api/analyze', async (req: Request, res: Response) => {
            const startTime = Date.now();
            try {
                if (!rateLimiter.isAllowed('analyze')) {
                    throw new Error('Rate limit exceeded');
                }

                const params = req.body as CodeAnalysisParams;
                validateCodeAnalysisParams(params);

                const cachedResults = cacheManager.getAnalysisResults(params);
                if (cachedResults) {
                    metrics.increment('cache_hits');
                    return res.json({ success: true, analysis: cachedResults });
                }

                metrics.increment('analyses');
                const analysis = await analyzeCode(params);
                cacheManager.setAnalysisResults(params, analysis);
                metrics.recordTiming('analysis_duration', Date.now() - startTime);

                res.json({ success: true, analysis });
            } catch (error) {
                metrics.increment('errors');
                healthChecker.recordError(error);
                res.status(500).json(handleError(error));
            }
        });

        // Status endpoint
        this.app.get('/api/status', (req: Request, res: Response) => {
            const health = healthChecker.getStatus();
            const cacheStats = cacheManager.getStats();
            const currentMetrics = metrics.getMetrics();

            res.json({
                status: health.status,
                version: health.version,
                uptime: health.uptime,
                metrics: currentMetrics,
                cache: cacheStats,
                rateLimits: {
                    search: rateLimiter.getRemainingRequests('search'),
                    analyze: rateLimiter.getRemainingRequests('analyze')
                },
                lastError: health.lastError,
                config: {
                    updateInterval: this.config.updateInterval,
                    cacheDuration: this.config.cacheDuration,
                    debugMode: this.config.debugMode
                }
            });
        });

        // System metrics endpoint
        this.app.get('/api/metrics', (req: Request, res: Response) => {
            res.json({
                process: {
                    memory: process.memoryUsage(),
                    cpu: process.cpuUsage(),
                    uptime: process.uptime(),
                    pid: process.pid
                },
                metrics: metrics.getMetrics(),
                health: healthChecker.getStatus(),
                cache: cacheManager.getStats(),
                rateLimits: {
                    search: rateLimiter.getRemainingRequests('search'),
                    analyze: rateLimiter.getRemainingRequests('analyze')
                }
            });
        });
    }

    public async start(): Promise<void> {
        try {
            this.startCleanupInterval();
            
            return new Promise((resolve) => {
                this.server = this.app.listen(this.config.port, () => {
                    logger.info(`Documentation Server started on port ${this.config.port}`);
                    resolve();
                });
            });
        } catch (error) {
            logger.error('Failed to start server:', error);
            throw error;
        }
    }

    private startCleanupInterval(): void {
        setInterval(() => {
            try {
                metrics.reset();
                const health = healthChecker.getStatus();
                logger.info('System status:', { health });
                const cacheStats = cacheManager.getStats();
                logger.info('Cache stats:', { cacheStats });
            } catch (error) {
                logger.error('Error in cleanup interval:', error);
            }
        }, this.config.updateInterval);
    }

    public async stop(): Promise<void> {
        try {
            if (this.server) {
                await new Promise((resolve) => {
                    this.server.close(resolve);
                });
                logger.info('Server stopped');
            }
        } catch (error) {
            logger.error('Error stopping server:', error);
            throw error;
        }
    }
}