export namespace healthOperations {
    const paths: {
        '/health': {
            get: {
                tags: string[];
                description: string;
                operationId: string;
                security: {
                    bearerAuth: any[];
                }[];
                responses: {
                    500: {
                        description: import("http-status-codes").ReasonPhrases;
                    };
                    200: {
                        description: string;
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: string;
                                };
                            };
                        };
                    };
                };
            };
        };
    };
}
