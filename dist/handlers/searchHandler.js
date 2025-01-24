"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchDocumentation = void 0;
const axios_1 = __importDefault(require("axios"));
async function searchDocumentation(params) {
    const { query, framework, version } = params;
    try {
        // Build search query
        let searchQuery = query;
        if (framework) {
            searchQuery += ` ${framework}`;
            if (version) {
                searchQuery += ` version ${version}`;
            }
        }
        // Make API request to Brave Search
        const response = await axios_1.default.get('https://api.search.brave.com/res/v1/web/search', {
            headers: {
                'X-Subscription-Token': process.env.BRAVE_API_KEY || ''
            },
            params: {
                q: searchQuery,
                format: 'json'
            }
        });
        // Process results
        return response.data.results.map((result) => ({
            title: result.title,
            url: result.url,
            description: result.description,
            type: determineResultType(result),
            relevance: calculateRelevance(result, params)
        }));
    }
    catch (error) {
        console.error('Error searching documentation:', error);
        throw error;
    }
}
exports.searchDocumentation = searchDocumentation;
function determineResultType(result) {
    const url = result.url.toLowerCase();
    if (url.includes('github.com'))
        return 'github';
    if (url.includes('docs.'))
        return 'documentation';
    if (url.includes('blog'))
        return 'blog';
    return 'general';
}
function calculateRelevance(result, params) {
    let score = 0;
    // URL relevance
    if (result.url.includes('github.com'))
        score += 10;
    if (result.url.includes('docs.'))
        score += 8;
    if (result.url.includes('official'))
        score += 5;
    // Framework relevance
    if (params.framework &&
        result.url.toLowerCase().includes(params.framework.toLowerCase())) {
        score += 10;
    }
    // Version relevance
    if (params.version &&
        result.description.toLowerCase().includes(params.version.toLowerCase())) {
        score += 5;
    }
    return Math.min(score, 100);
}
