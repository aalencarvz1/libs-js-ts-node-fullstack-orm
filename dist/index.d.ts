export declare const SqlAnsiOperator: {
    readonly equal: "=";
    readonly notEqual: "<>";
    readonly greaterThan: ">";
    readonly greaterEqualThan: ">=";
    readonly lessThan: "<";
    readonly lessEqualThan: "<=";
    readonly like: "like";
    readonly notLike: "not like";
    readonly in: "in";
    readonly notIn: "not in";
    readonly between: "between";
    readonly notBetween: "not between";
    readonly is: "is";
    readonly isNot: "is not";
};
export type SqlAnsiOperator = typeof SqlAnsiOperator[keyof typeof SqlAnsiOperator];
export declare const SqlAnsiPredicateFunction: {
    readonly exists: "exists";
    readonly notExists: "not exists";
    readonly any: "any";
    readonly some: "some";
    readonly all: "all";
};
export type SqlAnsiPredicateFunction = typeof SqlAnsiPredicateFunction[keyof typeof SqlAnsiPredicateFunction];
export declare const SqlAnsiTextFunction: {
    readonly upper: "upper";
    readonly lower: "lower";
    readonly concat: "concat";
};
export type SqlAnsiTextFunction = typeof SqlAnsiTextFunction[keyof typeof SqlAnsiTextFunction];
export declare const SqlAnsiAggregateFunction: {
    readonly count: "count";
    readonly sum: "sum";
    readonly avg: "avg";
    readonly min: "min";
    readonly max: "max";
};
export type SqlAnsiAggregateFunction = typeof SqlAnsiAggregateFunction[keyof typeof SqlAnsiAggregateFunction];
export declare const SqlAnsiDateTimeFunction: {
    readonly now: "now";
    readonly currentTimeStamp: "currentTimeStamp";
    readonly datePart: "date_part";
};
export type SqlAnsiDateTimeFunction = typeof SqlAnsiDateTimeFunction[keyof typeof SqlAnsiDateTimeFunction];
export declare const SqlAnsiCommonFunction: {
    readonly coalesce: "coalesce";
    readonly nullif: "nullif";
};
export type SqlAnsiCommonFunction = typeof SqlAnsiCommonFunction[keyof typeof SqlAnsiCommonFunction];
export type SqlAnsiFunction = SqlAnsiPredicateFunction | SqlAnsiTextFunction | SqlAnsiAggregateFunction | SqlAnsiDateTimeFunction | SqlAnsiCommonFunction;
export declare const SqlAnsiLogicOperator: {
    readonly and: "and";
    readonly or: "or";
};
export type SqlAnsiLogicOperator = typeof SqlAnsiLogicOperator[keyof typeof SqlAnsiLogicOperator];
export interface Condition {
    leftOperand: any;
    operator: SqlAnsiOperator;
    rightOperand: any;
}
export type Conditions = string | string[] | Condition | Condition[] | {
    [k in SqlAnsiLogicOperator]: string | string[] | Condition | Condition[] | Conditions | Conditions[];
};
export interface Column {
    column: string | SqlAnsiFunction | SelectQuery | UnionQuery;
    alias?: string;
}
export type JoinType = 'inner' | 'left' | 'right' | 'cross';
export interface FromTable {
    table: string | SelectQuery | UnionQuery;
    alias?: string;
}
export interface FromJoinTable extends FromTable {
    join: JoinType;
    on: Conditions;
}
export type FromItem = FromTable | FromJoinTable;
export type OrderByDirection = 'asc' | 'desc';
export interface OrderByColumn extends Column {
    direction: OrderByDirection;
}
export interface UnionQuery {
    all: boolean;
    queries: (SelectQuery | WithQuery)[];
}
export interface WithQuery {
    queries: {
        query: SelectQuery | UnionQuery;
        alias: string;
    }[];
    mainQuery: SelectQuery | UnionQuery;
}
export interface SelectQuery {
    columns: [string | Column, ...(string | Column)[]];
    from: [(string | FromTable), ...(string | FromItem)[]];
    where?: Conditions;
    groupBy?: (string | Column)[];
    having?: Conditions;
    orderBy?: (string | number | OrderByColumn)[];
    limit?: number | [number, number];
}
