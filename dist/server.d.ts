export declare class DocumentationServer {
    private app;
    private config;
    private server;
    constructor();
    private setupMiddleware;
    private setupRoutes;
    private setupErrorHandling;
    start(): Promise<void>;
    private startCleanupInterval;
    stop(): Promise<void>;
}
