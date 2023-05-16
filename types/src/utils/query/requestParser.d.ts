export function requestParser(url: string): RequestData;
/**
 * The complete OpenAPI Operation.
 */
export type Filter = {
    /**
     * - Indicates a greater than filter.
     */
    gt: {
        [x: string]: string;
    };
    /**
     * - Indicates a greater than or equal filter.
     */
    gte: {
        [x: string]: string;
    };
    /**
     * - Indicates a like filter.
     */
    like: {
        [x: string]: string;
    };
    /**
     * - Indicates a less than filter.
     */
    lt: {
        [x: string]: string;
    };
    /**
     * - Indicates a less than or equal filter.
     */
    lte: {
        [x: string]: string;
    };
    /**
     * - Indicates a not filter.
     */
    not: {
        [x: string]: string;
    };
};
/**
 * An object representing page information.
 */
export type Page = {
    /**
     * - The total number of record to retrieve.
     */
    limit: number;
    /**
     * - The current page number.
     */
    offset: number;
};
/**
 * The complete OpenAPI Operation.
 */
export type QueryData = {
    /**
     * - Indicates the fields to include in the query.
     */
    fields: {
        [x: string]: string[];
    };
    /**
     * - Indicates the query filters.
     */
    filter: Filter | {
        [x: string]: string;
    };
    /**
     * - Indicates the related resources to include in the response.
     */
    include: string[];
    /**
     * - Indicates the result pagination.
     */
    page: Page;
    /**
     * - Indicates the query sorting.
     */
    sort: string[];
};
/**
 * Represent the Request Data for an JSON API URL
 */
export type RequestData = {
    /**
     * - Indicates the record id.
     */
    identifier: string;
    /**
     * - Indicates the query data.
     */
    queryData: QueryData;
    /**
     * - Indicates if the request data include relationships.
     */
    relationships: boolean;
    /**
     * - Indicates the relationsehip type.
     */
    relationshipType: string;
    /**
     * - Indicates the resource type.
     */
    resourceType: string;
};
