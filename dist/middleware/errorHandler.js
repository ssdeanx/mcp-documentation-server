"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
const errors_1 = require("../errors");
function handleError(error) {
    if (error instanceof errors_1.McpError) {
        return {
            success: false,
            error: {
                code: error.code,
                message: error.message
            },
            statusCode: error.statusCode
        };
    }
    // Handle unknown errors
    console.error('Unexpected error:', error);
    return {
        success: false,
        error: {
            code: 'INTERNAL_ERROR',
            message: 'An unexpected error occurred'
        },
        statusCode: 500
    };
}
exports.handleError = handleError;
