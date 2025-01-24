"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigurationError = exports.AnalysisError = exports.SearchError = exports.ValidationError = exports.McpError = void 0;
class McpError extends Error {
    constructor(message, code, statusCode = 500) {
        super(message);
        this.code = code;
        this.statusCode = statusCode;
        this.name = 'McpError';
    }
}
exports.McpError = McpError;
class ValidationError extends McpError {
    constructor(message) {
        super(message, 'VALIDATION_ERROR', 400);
        this.name = 'ValidationError';
    }
}
exports.ValidationError = ValidationError;
class SearchError extends McpError {
    constructor(message) {
        super(message, 'SEARCH_ERROR', 500);
        this.name = 'SearchError';
    }
}
exports.SearchError = SearchError;
class AnalysisError extends McpError {
    constructor(message) {
        super(message, 'ANALYSIS_ERROR', 500);
        this.name = 'AnalysisError';
    }
}
exports.AnalysisError = AnalysisError;
class ConfigurationError extends McpError {
    constructor(message) {
        super(message, 'CONFIG_ERROR', 500);
        this.name = 'ConfigurationError';
    }
}
exports.ConfigurationError = ConfigurationError;
