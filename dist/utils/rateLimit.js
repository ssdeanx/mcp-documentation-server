"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimiter = void 0;
class RateLimiter {
    constructor(limit = 100, windowMs = 60000) {
        this.requests = new Map();
        this.limit = limit;
        this.window = windowMs;
    }
    isAllowed(key) {
        const now = Date.now();
        const windowStart = now - this.window;
        // Get existing requests for this key
        let timestamps = this.requests.get(key) || [];
        // Remove old timestamps
        timestamps = timestamps.filter(time => time > windowStart);
        // Check if under limit
        if (timestamps.length < this.limit) {
            timestamps.push(now);
            this.requests.set(key, timestamps);
            return true;
        }
        return false;
    }
    getRemainingRequests(key) {
        const timestamps = this.requests.get(key) || [];
        const windowStart = Date.now() - this.window;
        const recent = timestamps.filter(time => time > windowStart);
        return Math.max(0, this.limit - recent.length);
    }
    reset(key) {
        this.requests.delete(key);
    }
}
exports.rateLimiter = new RateLimiter();
