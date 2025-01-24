"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analysisController = void 0;
const codeAnalysisHandler_1 = require("../handlers/codeAnalysisHandler");
const metrics_1 = require("../utils/metrics");
const health_1 = require("../utils/health");
const cache_1 = require("../utils/cache");
const logger_1 = __importDefault(require("../utils/logger"));
const analysisController = async (req, res) => {
    const startTime = Date.now();
    try {
        metrics_1.metrics.increment('analyses');
        const analysis = await (0, codeAnalysisHandler_1.analyzeCode)(req.body);
        // Cache results
        if (res.locals.cacheKey) {
            cache_1.cacheManager.set(res.locals.cacheKey, analysis);
        }
        // Record metrics
        metrics_1.metrics.recordTiming('analysis_duration', Date.now() - startTime);
        // Add caching headers
        res.setHeader('Cache-Control', 'public, max-age=86400');
        if (res.locals.cacheKey) {
            res.setHeader('ETag', `"${res.locals.cacheKey}"`);
        }
        res.json({ success: true, analysis });
    }
    catch (error) {
        metrics_1.metrics.increment('errors');
        health_1.healthChecker.recordError(error);
        logger_1.default.error('Analysis error:', error);
        res.status(500).json({
            success: false,
            error: {
                message: error.message,
                code: error.code || 'ANALYSIS_ERROR'
            }
        });
    }
};
exports.analysisController = analysisController;
