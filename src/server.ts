import { McpServer } from '@modelcontextprotocol/server';
import { loadConfig } from './config';
import { handleError } from './middleware/errorHandler';
import { validateSearchParams, validateCodeAnalysisParams } from './middleware/validation';
import { searchDocumentation } from './handlers/searchHandler';
import { analyzeCode } from './handlers/codeAnalysisHandler';
import { SearchParams, CodeAnalysisParams } from './types';

export class DocumentationServer {
    private server: McpServer;
    private config: ReturnType<typeof loadConfig>;

    constructor() {
        this.config = loadConfig();
        this.server = new McpServer({
            name: 'mcp-documentation-server',
            version: '1.0.0'
        });
        this.setupFunctions();
    }

    private setupFunctions(): void {
        // Search documentation function
        this.server.addFunction({
            name: 'search_documentation',
            description: 'Search for documentation using Brave Search',
            parameters: {
                type: 'object',
                properties: {
                    query: {
                        type: 'string',
                        description: 'The search query'
                    },
                    framework: {
                        type: 'string',
                        description: 'Optional framework name'
                    },
                    version: {
                        type: 'string',
                        description: 'Optional framework version'
                    }
                },
                required: ['query']
            },
            handler: async (params: SearchParams) => {
                try {
                    validateSearchParams(params);
                    const results = await searchDocumentation(params);
                    return { success: true, results };
                } catch (error) {
                    return handleError(error);
                }
            }
        });

        // Code analysis function
        this.server.addFunction({
            name: 'analyze_code',
            description: 'Analyze code and provide suggestions',
            parameters: {
                type: 'object',
                properties: {
                    code: {
                        type: 'string',
                        description: 'The code to analyze'
                    },
                    language: {
                        type: 'string',
                        description: 'Programming language'
                    },
                    framework: {
                        type: 'string',
                        description: 'Optional framework name'
                    }
                },
                required: ['code', 'language']
            },
            handler: async (params: CodeAnalysisParams) => {
                try {
                    validateCodeAnalysisParams(params);
                    const analysis = await analyzeCode(params);
                    return { success: true, analysis };
                } catch (error) {
                    return handleError(error);
                }
            }
        });

        // Status function
        this.server.addFunction({
            name: 'get_status',
            description: 'Get server status and capabilities',
            parameters: {
                type: 'object',
                properties: {}
            },
            handler: async () => {
                return {
                    status: 'operational',
                    version: '1.0.0',
                    capabilities: [
                        'documentation_search',
                        'code_analysis'
                    ],
                    config: {
                        updateInterval: this.config.updateInterval,
                        cacheDuration: this.config.cacheDuration,
                        debugMode: this.config.debugMode
                    }
                };
            }
        });
    }

    public async start(): Promise<void> {
        try {
            await this.server.listen(this.config.port);
            console.log(`MCP Documentation Server is running on port ${this.config.port}`);
        } catch (error) {
            console.error('Failed to start server:', error);
            process.exit(1);
        }
    }

    public async stop(): Promise<void> {
        try {
            await this.server.close();
            console.log('Server stopped');
        } catch (error) {
            console.error('Error stopping server:', error);
            throw error;
        }
    }
}