"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheMiddleware = void 0;
const cache_1 = require("../utils/cache");
const cacheMiddleware = (type) => {
    return async (req, res, next) => {
        const key = type === 'search' ?
            cache_1.cacheManager.generateSearchKey(req.body) :
            cache_1.cacheManager.generateAnalysisKey(req.body);
        const cachedData = cache_1.cacheManager.get(key);
        if (cachedData) {
            // Add cache headers
            res.setHeader('Cache-Control', 'public, max-age=3600');
            res.setHeader('ETag', `"${key}"`);
            return res.json({ success: true, results: cachedData });
        }
        // Store the key for later use
        res.locals.cacheKey = key;
        next();
    };
};
exports.cacheMiddleware = cacheMiddleware;
