declare class RateLimiter {
    private requests;
    private limit;
    private window;
    constructor(limit?: number, windowMs?: number);
    isAllowed(key: string): boolean;
    getRemainingRequests(key: string): number;
    reset(key: string): void;
}
export declare const rateLimiter: RateLimiter;
export {};
