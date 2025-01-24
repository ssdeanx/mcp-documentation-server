/// <reference types="node" />
import { EventEmitter } from 'events';
export declare class AIDocumentationGuide extends EventEmitter {
    private knowledgeBase;
    private updateInterval;
    constructor();
    addToKnowledgeBase(documentation: any, context: any): Promise<boolean>;
    queryForFix(error: string, context: any): Promise<any>;
    private isRelevant;
    private analyzeDocs;
    startAutomatedUpdates(interval?: number): void;
    private updateKnowledgeBase;
    stopAutomatedUpdates(): void;
}
