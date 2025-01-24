"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentationServer = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const config_1 = require("./config");
const routes_1 = __importDefault(require("./routes"));
const errorHandler_1 = require("./middleware/errorHandler");
const metrics_1 = require("./utils/metrics");
const health_1 = require("./utils/health");
const logger_1 = __importDefault(require("./utils/logger"));
class DocumentationServer {
    constructor() {
        this.config = (0, config_1.loadConfig)();
        this.app = (0, express_1.default)();
        this.setupMiddleware();
        this.setupRoutes();
        this.setupErrorHandling();
    }
    setupMiddleware() {
        // Basic middleware
        this.app.use((0, cors_1.default)());
        this.app.use((0, helmet_1.default)());
        this.app.use((0, compression_1.default)());
        this.app.use(express_1.default.json());
        // Request logging
        this.app.use((req, res, next) => {
            const startTime = Date.now();
            logger_1.default.info(`${req.method} ${req.url} started`);
            res.on('finish', () => {
                const duration = Date.now() - startTime;
                logger_1.default.info(`${req.method} ${req.url} ${res.statusCode} - ${duration}ms`);
                metrics_1.metrics.recordTiming('request_duration', duration);
            });
            next();
        });
    }
    setupRoutes() {
        this.app.use(routes_1.default);
        // Health check endpoint
        this.app.get('/health', (req, res) => {
            res.json(health_1.healthChecker.getStatus());
        });
    }
    setupErrorHandling() {
        // 404 handler
        this.app.use((req, res) => {
            res.status(404).json({
                success: false,
                error: {
                    code: 'NOT_FOUND',
                    message: 'Resource not found'
                }
            });
        });
        // Error handler
        this.app.use(errorHandler_1.errorHandler);
    }
    async start() {
        try {
            // Start cleanup interval
            this.startCleanupInterval();
            // Start server
            return new Promise((resolve) => {
                this.server = this.app.listen(this.config.port, () => {
                    logger_1.default.info(`Documentation Server started on port ${this.config.port}`);
                    resolve();
                });
            });
        }
        catch (error) {
            logger_1.default.error('Failed to start server:', error);
            throw error;
        }
    }
    startCleanupInterval() {
        setInterval(() => {
            try {
                metrics_1.metrics.reset();
                const health = health_1.healthChecker.getStatus();
                logger_1.default.info('System status:', { health });
            }
            catch (error) {
                logger_1.default.error('Error in cleanup interval:', error);
            }
        }, this.config.updateInterval);
    }
    async stop() {
        try {
            if (this.server) {
                await new Promise((resolve) => {
                    this.server.close(resolve);
                });
                logger_1.default.info('Server stopped');
            }
        }
        catch (error) {
            logger_1.default.error('Error stopping server:', error);
            throw error;
        }
    }
}
exports.DocumentationServer = DocumentationServer;
