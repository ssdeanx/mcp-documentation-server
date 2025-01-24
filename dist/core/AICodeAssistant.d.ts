import { AIDocumentationGuide } from './AIDocumentationGuide';
export declare class AICodeAssistant {
    private documentationGuide;
    constructor(documentationGuide: AIDocumentationGuide);
    analyzeCode(code: string, context: any): Promise<any>;
    private identifyPatterns;
    private generateSuggestions;
    private suggestImprovements;
}
