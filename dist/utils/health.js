"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthChecker = exports.HealthChecker = void 0;
const metrics_1 = require("./metrics");
const logger_1 = __importDefault(require("./logger"));
class HealthChecker {
    constructor() {
        this.startTime = Date.now();
    }
    getStatus() {
        const currentMetrics = metrics_1.metrics.getMetrics();
        const errorRate = this.calculateErrorRate(currentMetrics);
        return {
            status: this.determineStatus(errorRate),
            version: process.env.npm_package_version || '1.0.0',
            uptime: Math.floor((Date.now() - this.startTime) / 1000),
            metrics: currentMetrics,
            lastError: this.lastError
        };
    }
    recordError(error) {
        this.lastError = error.message;
        logger_1.default.error('Service error:', { error: error.message, stack: error.stack });
    }
    calculateErrorRate(metrics) {
        const totalRequests = metrics.total_requests || 0;
        const totalErrors = metrics.total_errors || 0;
        return totalRequests > 0 ? (totalErrors / totalRequests) * 100 : 0;
    }
    determineStatus(errorRate) {
        if (errorRate >= 25)
            return 'unhealthy';
        if (errorRate >= 10)
            return 'degraded';
        return 'healthy';
    }
}
exports.HealthChecker = HealthChecker;
exports.healthChecker = new HealthChecker();
