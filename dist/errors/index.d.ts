export declare class McpError extends Error {
    code: string;
    statusCode: number;
    constructor(message: string, code: string, statusCode?: number);
}
export declare class ValidationError extends McpError {
    constructor(message: string);
}
export declare class SearchError extends McpError {
    constructor(message: string);
}
export declare class AnalysisError extends McpError {
    constructor(message: string);
}
export declare class ConfigurationError extends McpError {
    constructor(message: string);
}
