export namespace schema {
    const type: string;
    namespace properties {
        namespace status {
            const type_1: string;
            export { type_1 as type };
        }
        namespace version {
            const type_2: string;
            export { type_2 as type };
        }
        namespace releaseId {
            const type_3: string;
            export { type_3 as type };
        }
        namespace serviceId {
            const type_4: string;
            export { type_4 as type };
            export const format: string;
            export const example: string;
        }
        namespace description {
            const type_5: string;
            export { type_5 as type };
        }
        namespace checks {
            const type_6: string;
            export { type_6 as type };
            const properties_1: {
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
            export { properties_1 as properties };
        }
        namespace lingks {
            const type_7: string;
            export { type_7 as type };
            export namespace properties_2 {
                namespace about {
                    const type_8: string;
                    export { type_8 as type };
                }
            }
            export { properties_2 as properties };
        }
    }
}
