export function queryBuilder(requestData: import('./requestParser.js').RequestData, excludedFields?: string[]): Query;
/**
 * Represents a filter for date-time values.
 */
export type NestedFilter = {
    /**
     * - Additional properties with values
     */
    propName?: {
        [x: string]: Date | string;
    };
    /**
     * - The value to match exactly.
     */
    equals?: Date | string;
    /**
     * - The values to match any of.
     */
    in?: Prisma.Enumerable<Date> | Prisma.Enumerable<string>;
    /**
     * - The values to exclude.
     */
    notIn?: Prisma.Enumerable<Date> | Prisma.Enumerable<string>;
    /**
     * - The value to match less than.
     */
    lt?: Date | string;
    /**
     * - The value to match less than or equal to.
     */
    lte?: Date | string;
    /**
     * - The value to match greater than.
     */
    gt?: Date | string;
    /**
     * - The value to match greater than or equal to.
     */
    gte?: Date | string;
    /**
     * - The negated filter condition.
     */
    not?: Prisma.DateTimeFilter | Date | string;
};
export type BasicSelect = {
    [x: string]: boolean | NestedSelect;
};
export type NestedSelect = {
    /**
     * - The nested select criteria.
     */
    select?: BasicSelect;
};
export type Select = BasicSelect & NestedSelect;
/**
 * Represents the input for a "where" condition.
 */
export type WhereInput = {
    /**
     * - The logical "AND" condition.
     */
    AND?: string;
    /**
     * - The logical "OR" condition.
     */
    OR?: string;
    /**
     * - The logical "NOT" condition.
     */
    NOT?: string;
    /**
     * - The ID of the entity.
     */
    id?: Prisma.UuidFilter | string;
    /**
     * - Additional properties with unknown values.
     */
    propName?: {
        [x: string]: Date | string;
    };
    /**
     * - The creation date of the entity.
     */
    createdAt?: Date | string;
    /**
     * - The last update date of the entity.
     */
    updatedAt?: Date | string;
};
export type OrderBy = {
    [x: string]: Prisma.SortOrder;
}[];
export type Include = Select;
/**
 * Represent the Request Data for an JSON API URL
 */
export type Query = {
    [x: string]: unknown;
} & {
    select?: Select;
    where?: WhereInput;
    skip?: number;
    take?: number;
    orderBy?: {
        [x: string]: Prisma.SortOrder;
    }[];
    include?: BasicSelect & Include;
    distinct?: {
        [x: string]: unknown;
    };
};
import { Prisma } from ".prisma/client";
