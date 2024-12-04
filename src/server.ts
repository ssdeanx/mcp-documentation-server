        // Status function
        this.server.addFunction({
            name: 'get_status',
            description: 'Get server status and capabilities',
            parameters: {
                type: 'object',
                properties: {}
            },
            handler: async () => {
                const health = healthChecker.getStatus();
                const cacheStats = cacheManager.getStats();
                const currentMetrics = metrics.getMetrics();

                return {
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
                };
            }
        });

        // System monitoring function
        this.server.addFunction({
            name: 'get_system_metrics',
            description: 'Get detailed system metrics and performance data',
            parameters: {
                type: 'object',
                properties: {}
            },
            handler: async () => {
                return {
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
                };
            }
        });
    }

    public async start(): Promise<void> {
        try {
            // Start periodic cleanup
            this.startCleanupInterval();

            // Start the server
            await this.server.listen(this.config.port);
            logger.info(`MCP Documentation Server started on port ${this.config.port}`);
        } catch (error) {
            logger.error('Failed to start server:', error);
            process.exit(1);
        }
    }

    private startCleanupInterval(): void {
        setInterval(() => {
            try {
                // Reset metrics every hour
                metrics.reset();

                // Log current status
                const health = healthChecker.getStatus();
                logger.info('System status:', { health });

                // Log cache stats
                const cacheStats = cacheManager.getStats();
                logger.info('Cache stats:', { cacheStats });
            } catch (error) {
                logger.error('Error in cleanup interval:', error);
            }
        }, this.config.updateInterval);
    }

    public async stop(): Promise<void> {
        try {
            await this.server.close();
            logger.info('Server stopped');
        } catch (error) {
            logger.error('Error stopping server:', error);
            throw error;
        }
    }
}