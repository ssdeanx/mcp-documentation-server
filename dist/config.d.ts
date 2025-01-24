export interface ServerConfig {
    port?: number;
    braveApiKey: string;
    updateInterval?: number;
    cacheDuration?: number;
    debugMode?: boolean;
}
export declare function loadConfig(): ServerConfig;
