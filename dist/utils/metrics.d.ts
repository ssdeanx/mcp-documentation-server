declare class MetricsCollector {
    private metrics;
    private intervals;
    constructor();
    increment(metric: string, value?: number): void;
    recordTiming(metric: string, duration: number): void;
    getMetrics(): any;
    private average;
    private percentile;
    reset(): void;
}
export declare const metrics: MetricsCollector;
export {};
