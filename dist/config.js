"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadConfig = void 0;
const errors_1 = require("./errors");
function loadConfig() {
    const config = {
        port: parseInt(process.env.PORT || '3000', 10),
        braveApiKey: process.env.BRAVE_API_KEY || '',
        updateInterval: parseInt(process.env.UPDATE_INTERVAL || '3600000', 10),
        cacheDuration: parseInt(process.env.CACHE_DURATION || '86400000', 10),
        debugMode: process.env.DEBUG === 'true'
    };
    validateConfig(config);
    return config;
}
exports.loadConfig = loadConfig;
function validateConfig(config) {
    if (!config.braveApiKey) {
        throw new errors_1.ConfigurationError('BRAVE_API_KEY is required');
    }
    if (isNaN(config.port) || config.port < 0 || config.port > 65535) {
        throw new errors_1.ConfigurationError('Invalid port number');
    }
    if (config.updateInterval < 0) {
        throw new errors_1.ConfigurationError('UPDATE_INTERVAL must be positive');
    }
    if (config.cacheDuration < 0) {
        throw new errors_1.ConfigurationError('CACHE_DURATION must be positive');
    }
}
