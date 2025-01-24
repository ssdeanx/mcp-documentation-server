export declare class NextjsAnalyzer {
    constructor();
    analyze(code: string): any;
    private analyzeRouting;
    private analyzeServerComponents;
    private analyzeClientComponents;
    private analyzeDataFetching;
    private analyzeAppDirectory;
    private findPageRoutes;
    private findApiRoutes;
    private findDynamicRoutes;
    private findMiddleware;
    private findServerComponents;
    private findServerActions;
    private findGetServerSideProps;
    private findClientComponents;
    private findUseClientDirectives;
    private findClientHooks;
    private findFetchPatterns;
    private findSuspenseUsage;
    private findLoadingStates;
    private findLayouts;
    private findTemplates;
    private findMetadata;
}
