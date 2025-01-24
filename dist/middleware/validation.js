"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAnalysis = exports.validateSearch = void 0;
const errors_1 = require("../errors");
const validateSearch = (req, res, next) => {
    const params = req.body;
    if (!params.query) {
        throw new errors_1.ValidationError('Search query is required');
    }
    if (params.query.length < 2) {
        throw new errors_1.ValidationError('Search query must be at least 2 characters');
    }
    next();
};
exports.validateSearch = validateSearch;
const validateAnalysis = (req, res, next) => {
    const params = req.body;
    if (!params.code) {
        throw new errors_1.ValidationError('Code is required');
    }
    if (!params.language) {
        throw new errors_1.ValidationError('Programming language is required');
    }
    const supportedLanguages = ['javascript', 'typescript', 'python', 'java'];
    if (!supportedLanguages.includes(params.language.toLowerCase())) {
        throw new errors_1.ValidationError(`Language ${params.language} is not supported. ` +
            `Supported languages: ${supportedLanguages.join(', ')}`);
    }
    next();
};
exports.validateAnalysis = validateAnalysis;
