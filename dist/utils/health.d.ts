export interface HealthStatus {
    status: 'healthy' | 'degraded' | 'unhealthy';
    version: string;
    uptime: number;
    metrics: any;
    lastError?: string;
}
export declare class HealthChecker {
    private startTime;
    private lastError?;
    constructor();
    getStatus(): HealthStatus;
    recordError(error: Error): void;
    private calculateErrorRate;
    private determineStatus;
}
export declare const healthChecker: HealthChecker;
