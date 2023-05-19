export namespace model {
    export { check };
}
declare function check(config: any): Promise<{
    checks: {
        'postgres:database': {
            componentId: string;
            componentType: string;
            observedValue: number;
            observedUnit: string;
            status: string;
            time: Date;
        }[];
        'memory:utilization': {
            componentId: string;
            componentType: string;
            node: number;
            observedValue: number;
            observedUnit: string;
            status: string;
            time: Date;
        }[];
        'cpu:utilization': {
            componentId: string;
            componentType: string;
            node: number;
            observedValue: any;
            observedUnit: string;
            status: string;
            time: Date;
        }[];
        uptime: {
            componentId: string;
            componentType: string;
            observedValue: number;
            observedUnit: string;
            status: string;
            time: Date;
        }[];
    };
    links: {
        about: string;
    };
    status: string;
    version: any;
    releaseId: any;
    notes: string[];
    output: string;
    serviceId: string;
    description: string;
}>;
export {};
