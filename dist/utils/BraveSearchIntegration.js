"use strict";
if (context.fileTypes) {
    filters.fileType = context.fileTypes;
}
return filters;
async;
searchApiDocumentation(api, string);
Promise < any > {
    return: this.searchDocumentation(`${api} API documentation`, {
        filters: {
            fileType: ['json', 'yaml', 'md']
        }
    })
};
async;
searchErrorSolutions(error, string, context, any);
Promise < any > {
    const: enhancedQuery = `${error} solution ${context.framework || ''} ${context.language || ''}`,
    return: this.searchDocumentation(enhancedQuery, {
        filters: {
            site: ['stackoverflow.com', 'github.com']
        }
    })
};
async;
searchTutorials(topic, string, context, any);
Promise < any > {
    const: enhancedQuery = `${topic} tutorial ${context.framework || ''} ${context.level || 'beginner'}`,
    return: this.searchDocumentation(enhancedQuery, {
        filters: {
            timeRange: 'year' // Only recent tutorials
        }
    })
};
