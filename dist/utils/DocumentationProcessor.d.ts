export declare class DocumentationProcessor {
    private braveSearch;
    constructor(apiKey: string);
    processFrameworkDocumentation(framework: string, options?: any): Promise<any>;
    processPythonDocumentation(topic: string, options?: any): Promise<any>;
    processNextjsDocumentation(topic: string, options?: any): Promise<any>;
    private organizeDocs;
    private organizePythonDocs;
    private organizeNextjsDocs;
    private getOfficialDomain;
}
