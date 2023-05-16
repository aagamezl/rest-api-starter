export namespace usersOperations {
    const paths: {
        '/users': {
            post: {
                tags: string[];
                description: string;
                operationId: string;
                parameters: any[];
                security: {
                    bearerAuth: any[];
                }[];
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                responses: {
                    201: {
                        description: string;
                    };
                    400: {
                        description: string;
                    };
                    403: {
                        description: string;
                    };
                    500: {
                        description: string;
                    };
                };
            };
            get: {
                tags: string[];
                description: string;
                operationId: string;
                parameters: ({
                    in: string;
                    name: string;
                    schema: {
                        type: string;
                        properties?: undefined;
                    };
                    description: string;
                    explode?: undefined;
                    style?: undefined;
                    allowReserved?: undefined;
                } | {
                    in: string;
                    name: string;
                    description: string;
                    explode: boolean;
                    style: string;
                    allowReserved: boolean;
                    schema: {
                        type: string;
                        properties: {
                            limit: {
                                type: string;
                                description: string;
                                minimum: number;
                                maximum: number;
                                default: number;
                            };
                            offset: {
                                type: string;
                                description: string;
                                minimum: number;
                                default: number;
                            };
                        };
                    };
                })[];
                security: {
                    bearerAuth: any[];
                }[];
                responses: {
                    200: {
                        description: string;
                        content: {
                            'application/json': {
                                schema: {
                                    type: string;
                                    properties: {
                                        items: Record<string, unknown>;
                                        count: {
                                            type: string;
                                            format: string;
                                        };
                                    };
                                    required: string[];
                                    additionalProperties: boolean;
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
                    500: {
                        description: string;
                    };
                };
            };
        };
        '/users/{id}': {
            delete: {
                tags: string[];
                description: string;
                operationId: string;
                parameters: {
                    name: string;
                    in: string;
                    schema: {
                        $ref: string;
                    };
                    required: boolean;
                    description: string;
                }[];
                security: {
                    bearerAuth: any[];
                }[];
                responses: {
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
            };
            patch: {
                tags: string[];
                description: string;
                operationId: string;
                parameters: {
                    name: string;
                    in: string;
                    schema: {
                        $ref: string;
                    };
                    required: boolean;
                    description: string;
                }[];
                security: {
                    bearerAuth: any[];
                }[];
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                responses: {
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
            };
            get: {
                tags: string[];
                description: string;
                operationId: string;
                parameters: {
                    name: string;
                    in: string;
                    schema: {
                        $ref: string;
                    };
                    required: boolean;
                    description: string;
                }[];
                security: {
                    bearerAuth: any[];
                }[];
                responses: {
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
            };
        };
        '/users/login': {
            post: {
                tags: string[];
                description: string;
                operationId: string;
                parameters: any[];
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                responses: {
                    201: {
                        description: string;
                    };
                    400: {
                        description: string;
                    };
                    404: {
                        description: string;
                    };
                    500: {
                        description: string;
                    };
                };
            };
        };
        '/users/logout': {
            post: {
                tags: string[];
                description: string;
                operationId: string;
                parameters: any[];
                requestBody: {};
                responses: {
                    201: {
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
            };
        };
    };
}
