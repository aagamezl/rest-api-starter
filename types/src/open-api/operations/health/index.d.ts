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
                    [x: number]: any;
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
