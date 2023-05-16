export namespace components {
    const components: {
        schemas: {
            id: {
                type: string;
                format: string;
                description: string;
                example: string;
            };
            User: import("joi-to-swagger").SwaggerSchema;
            UserInput: import("joi-to-swagger").SwaggerSchema;
            UserLogin: import("joi-to-swagger").SwaggerSchema;
            HealthCheck: {
                type: string;
                properties: {
                    status: {
                        type: string;
                    };
                    version: {
                        type: string;
                    };
                    releaseId: {
                        type: string;
                    };
                    serviceId: {
                        type: string;
                        format: string;
                        example: string;
                    };
                    description: {
                        type: string;
                    };
                    checks: {
                        type: string;
                        properties: {
                            uptime: {
                                type: string;
                                items: {
                                    type: string;
                                    properties: {
                                        componentType: {
                                            type: string;
                                        };
                                        observedValue: {
                                            type: string;
                                            format: string;
                                        };
                                        observedUnit: {
                                            type: string;
                                        };
                                        status: {
                                            type: string;
                                        };
                                        time: {
                                            type: string;
                                            format: string;
                                        };
                                    };
                                };
                            };
                            'cpu:utilization': {
                                type: string;
                                items: {
                                    type: string;
                                    properties: {
                                        componentId: {
                                            type: string;
                                        };
                                        node: {
                                            type: string;
                                        };
                                        componentType: {
                                            type: string;
                                        };
                                        observedValue: {
                                            type: string;
                                        };
                                        observedUnit: {
                                            type: string;
                                        };
                                        status: {
                                            type: string;
                                        };
                                        time: {
                                            type: string;
                                            format: string;
                                        };
                                    };
                                };
                            };
                            'memory:utilization': {
                                type: string;
                                items: {
                                    type: string;
                                    properties: {
                                        componentId: {
                                            type: string;
                                        };
                                        node: {
                                            type: string;
                                        };
                                        componentType: {
                                            type: string;
                                        };
                                        observedValue: {
                                            type: string;
                                            format: string;
                                        };
                                        observedUnit: {
                                            type: string;
                                        };
                                        status: {
                                            type: string;
                                        };
                                        time: {
                                            type: string;
                                            format: string;
                                        };
                                    };
                                };
                            };
                            'db:provider:responseTime': {
                                type: string;
                                items: {
                                    type: string;
                                    properties: {
                                        componentId: {
                                            type: string;
                                        };
                                        componentType: {
                                            type: string;
                                        };
                                        observedValue: {
                                            type: string;
                                        };
                                        observedUnit: {
                                            type: string;
                                        };
                                        status: {
                                            type: string;
                                        };
                                        time: {
                                            type: string;
                                            format: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                    lingks: {
                        type: string;
                        properties: {
                            about: {
                                type: string;
                            };
                        };
                    };
                };
            };
            ErrorDetails: {
                type: string;
                properties: {
                    source: {
                        type: string;
                    };
                    errors: {
                        type: string;
                        items: {
                            $ref: string;
                        };
                    };
                };
            };
            ErrorDetailsItem: {
                type: string;
                properties: {
                    key: {
                        type: string;
                    };
                    message: {
                        type: string;
                    };
                };
            };
            Error: {
                type: string;
                properties: {
                    status: {
                        type: string;
                    };
                    title: {
                        type: string;
                    };
                    details: {
                        $ref: string;
                    };
                };
                example: {
                    status: number;
                    title: string;
                    details: {
                        source: string;
                        errors: {
                            key: string;
                            message: string;
                        }[];
                    };
                };
            };
        };
        securitySchemes: {
            bearerAuth: {
                type: string;
                scheme: string;
                bearerFormat: string;
                description: string;
            };
        };
    };
}
