"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchController = void 0;
const searchHandler_1 = require("../handlers/searchHandler");
const metrics_1 = require("../utils/metrics");
const health_1 = require("../utils/health");
const cache_1 = require("../utils/cache");
const logger_1 = __importDefault(require("../utils/logger"));
const searchController = async (req, res) => {
    const startTime = Date.now();
    try {
        metrics_1.metrics.increment('searches');
        const results = await (0, searchHandler_1.searchDocumentation)(req.body);
        // Cache results
        if (res.locals.cacheKey) {
            cache_1.cacheManager.set(res.locals.cacheKey, results);
        }
        // Record metrics
        metrics_1.metrics.recordTiming('search_duration', Date.now() - startTime);
        // Add caching headers
        res.setHeader('Cache-Control', 'public, max-age=3600');
        if (res.locals.cacheKey) {
            res.setHeader('ETag', `"${res.locals.cacheKey}"`);
        }
        res.json({ success: true, results });
    }
    catch (error) {
        metrics_1.metrics.increment('errors');
        health_1.healthChecker.recordError(error);
        logger_1.default.error('Search error:', error);
        res.status(500).json({
            success: false,
            error: {
                message: error.message,
                code: error.code || 'SEARCH_ERROR'
            }
        });
    }
};
exports.searchController = searchController;
