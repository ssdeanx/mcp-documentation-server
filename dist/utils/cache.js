"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheManager = void 0;
const node_cache_1 = __importDefault(require("node-cache"));
class CacheManager {
    constructor(ttlSeconds = 3600) {
        this.cache = new node_cache_1.default({
            stdTTL: ttlSeconds,
            checkperiod: ttlSeconds * 0.2,
            useClones: false
        });
    }
    getSearchResults(params) {
        const key = this.generateSearchKey(params);
        return this.cache.get(key);
    }
    setSearchResults(params, results) {
        const key = this.generateSearchKey(params);
        this.cache.set(key, results);
    }
    getAnalysisResults(params) {
        const key = this.generateAnalysisKey(params);
        return this.cache.get(key);
    }
    setAnalysisResults(params, results) {
        const key = this.generateAnalysisKey(params);
        this.cache.set(key, results);
    }
    invalidate(pattern) {
        const keys = this.cache.keys().filter(key => key.startsWith(pattern));
        keys.forEach(key => this.cache.del(key));
    }
    generateSearchKey(params) {
        return `search:${params.query}:${params.framework || ''}:${params.version || ''}`;
    }
    generateAnalysisKey(params) {
        return `analysis:${params.language}:${params.framework || ''}:${Buffer.from(params.code).toString('base64')}`;
    }
    getStats() {
        return {
            hits: this.cache.getStats().hits,
            misses: this.cache.getStats().misses,
            keys: this.cache.keys().length
        };
    }
}
exports.cacheManager = new CacheManager();
