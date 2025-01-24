import { SearchParams, CodeAnalysisParams } from '../types';
declare class CacheManager {
    private cache;
    constructor(ttlSeconds?: number);
    getSearchResults(params: SearchParams): any;
    setSearchResults(params: SearchParams, results: any): void;
    getAnalysisResults(params: CodeAnalysisParams): any;
    setAnalysisResults(params: CodeAnalysisParams, results: any): void;
    invalidate(pattern: string): void;
    private generateSearchKey;
    private generateAnalysisKey;
    getStats(): any;
}
export declare const cacheManager: CacheManager;
export {};
