export namespace userGetOne {
    namespace get {
        const tags: string[];
        const description: string;
        const operationId: string;
        const parameters: {
            name: string;
            in: string;
            schema: {
                $ref: string;
            };
            required: boolean;
            description: string;
        }[];
        const security: {
            bearerAuth: any[];
        }[];
        const responses: {
            500: {
                description: import("http-status-codes").ReasonPhrases;
            };
            404: {
                description: string;
                content: {
                    'application/json': {
                        schema: {
                            $ref: string;
                            example: {
                                message: string;
                                internal_code: string;
                            };
                        };
                    };
                };
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
            400: {
                description: string;
            };
            403: {
                description: string;
            };
        };
    }
}
