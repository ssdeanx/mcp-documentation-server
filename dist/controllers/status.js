"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metricsController = exports.statusController = void 0;
const health_1 = require("../utils/health");
const metrics_1 = require("../utils/metrics");
const cache_1 = require("../utils/cache");
const rateLimit_1 = require("../utils/rateLimit");
const statusController = (req, res) => {
    const health = health_1.healthChecker.getStatus();
    const cacheStats = cache_1.cacheManager.getStats();
    const currentMetrics = metrics_1.metrics.getMetrics();
    res.json({
        status: health.status,
        version: health.version,
        uptime: health.uptime,
        metrics: currentMetrics,
        cache: cacheStats,
        rateLimits: {
            search: rateLimit_1.rateLimiter.getRemainingRequests('search'),
            analyze: rateLimit_1.rateLimiter.getRemainingRequests('analyze')
        },
        lastError: health.lastError
    });
};
exports.statusController = statusController;
const metricsController = (req, res) => {
    res.json({
        process: {
            memory: process.memoryUsage(),
            cpu: process.cpuUsage(),
            uptime: process.uptime(),
            pid: process.pid
        },
        metrics: metrics_1.metrics.getMetrics(),
        health: health_1.healthChecker.getStatus(),
        cache: cache_1.cacheManager.getStats(),
        rateLimits: {
            search: rateLimit_1.rateLimiter.getRemainingRequests('search'),
            analyze: rateLimit_1.rateLimiter.getRemainingRequests('analyze')
        }
    });
};
exports.metricsController = metricsController;
