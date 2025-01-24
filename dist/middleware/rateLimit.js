"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimitMiddleware = void 0;
const rateLimit_1 = require("../utils/rateLimit");
const errors_1 = require("../errors");
const rateLimitMiddleware = (type) => {
    return (req, res, next) => {
        if (!rateLimit_1.rateLimiter.isAllowed(type)) {
            throw new errors_1.RateLimitExceededError(`Rate limit exceeded for ${type}`);
        }
        // Add rate limit headers
        res.setHeader('X-RateLimit-Limit', '100');
        res.setHeader('X-RateLimit-Remaining', rateLimit_1.rateLimiter.getRemainingRequests(type).toString());
        res.setHeader('X-RateLimit-Reset', Math.floor(Date.now() / 1000 + 60).toString());
        next();
    };
};
exports.rateLimitMiddleware = rateLimitMiddleware;
