"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentationProcessor = void 0;
const BraveSearchIntegration_1 = require("./BraveSearchIntegration");
class DocumentationProcessor {
    constructor(apiKey) {
        this.braveSearch = new BraveSearchIntegration_1.BraveSearchIntegration(apiKey);
    }
    async processFrameworkDocumentation(framework, options = {}) {
        try {
            const docs = await this.braveSearch.searchFrameworkDocs(framework, options.version);
            return this.organizeDocs(docs, framework);
        }
        catch (error) {
            console.error(`Error processing ${framework} documentation:`, error);
            throw error;
        }
    }
    async processPythonDocumentation(topic, options = {}) {
        try {
            const docs = await this.braveSearch.searchWithContext(topic, {
                framework: 'python',
                version: options.version || '3.x',
                language: 'python'
            });
            return this.organizePythonDocs(docs, topic);
        }
        catch (error) {
            console.error('Error processing Python documentation:', error);
            throw error;
        }
    }
    async processNextjsDocumentation(topic, options = {}) {
        try {
            const docs = await this.braveSearch.searchWithContext(topic, {
                framework: 'nextjs',
                version: options.version || 'latest',
                language: 'javascript'
            });
            return this.organizeNextjsDocs(docs, topic);
        }
        catch (error) {
            console.error('Error processing Next.js documentation:', error);
            throw error;
        }
    }
    organizeDocs(docs, framework) {
        const organized = {
            official: [],
            community: [],
            tutorials: [],
            examples: [],
            github: []
        };
        docs.results.forEach((doc) => {
            if (doc.url.includes(this.getOfficialDomain(framework))) {
                organized.official.push(doc);
            }
            else if (doc.type === 'tutorial') {
                organized.tutorials.push(doc);
            }
            else if (doc.url.includes('github.com')) {
                organized.github.push(doc);
            }
            else if (doc.type === 'example') {
                organized.examples.push(doc);
            }
            else {
                organized.community.push(doc);
            }
        });
        return organized;
    }
    organizePythonDocs(docs, topic) {
        return {
            standardLibrary: docs.results.filter((doc) => doc.url.includes('docs.python.org')),
            pypi: docs.results.filter((doc) => doc.url.includes('pypi.org')),
            tutorials: docs.results.filter((doc) => doc.type === 'tutorial'),
            community: docs.results.filter((doc) => !doc.url.includes('docs.python.org') &&
                !doc.url.includes('pypi.org'))
        };
    }
    organizeNextjsDocs(docs, topic) {
        return {
            official: docs.results.filter((doc) => doc.url.includes('nextjs.org')),
            vercel: docs.results.filter((doc) => doc.url.includes('vercel.com')),
            examples: docs.results.filter((doc) => doc.url.includes('github.com/vercel/next.js/tree/canary/examples')),
            community: docs.results.filter((doc) => !doc.url.includes('nextjs.org') &&
                !doc.url.includes('vercel.com'))
        };
    }
    getOfficialDomain(framework) {
        const domains = {
            react: 'reactjs.org',
            vue: 'vuejs.org',
            angular: 'angular.io',
            nextjs: 'nextjs.org',
            python: 'python.org'
        };
        return domains[framework.toLowerCase()] || '';
    }
}
exports.DocumentationProcessor = DocumentationProcessor;
