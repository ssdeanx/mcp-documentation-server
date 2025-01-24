export declare function handleError(error: Error): {
    success: boolean;
    error: {
        code: string;
        message: string;
    };
    statusCode: number;
};
