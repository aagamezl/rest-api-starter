export namespace userUpdate {
    namespace patch {
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
        namespace requestBody {
            const content: {
                'application/json': {
                    schema: {
                        $ref: string;
                    };
                };
            };
        }
        const responses: {
            200: {
                description: string;
            };
            400: {
                description: string;
            };
            403: {
                description: string;
            };
            404: {
                description: string;
            };
            500: {
                description: string;
            };
        };
    }
}
