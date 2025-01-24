export declare class LearningSystem {
    private patterns;
    private feedback;
    constructor();
    learn(code: string, feedback: any): Promise<void>;
    private extractPatterns;
    private processFeedback;
    private optimizePatterns;
}
