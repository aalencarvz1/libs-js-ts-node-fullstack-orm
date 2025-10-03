export const SqlAnsiOperator = {
  equal: '=' as '=',
  notEqual: '<>' as '<>',
  greaterThan: '>' as '>',
  greaterEqualThan: '>=' as '>=',
  lessThan: '<' as '<',
  lessEqualThan: '<=' as '<=',
  like: 'like' as 'like',
  notLike: 'not like' as 'not like',
  in: 'in' as 'in',
  notIn: 'not in' as 'not in',
  between: 'between' as 'between',
  notBetween: 'not between' as 'not between',
  is: 'is' as 'is',
  isNot: 'is not' as 'is not',
} as const;
export type SqlAnsiOperator = typeof SqlAnsiOperator[keyof typeof SqlAnsiOperator];

export const SqlAnsiPredicateFunction = {
  exists: 'exists' as 'exists',
  notExists: 'not exists' as 'not exists',
  any: 'any' as 'any',
  some: 'some' as 'some',
  all: 'all' as 'all',
} as const;
export type SqlAnsiPredicateFunction = typeof SqlAnsiPredicateFunction[keyof typeof SqlAnsiPredicateFunction];

export const SqlAnsiTextFunction = {
  upper: 'upper' as 'upper',
  lower: 'lower' as 'lower',
  concat: 'concat' as 'concat',
} as const;
export type SqlAnsiTextFunction = typeof SqlAnsiTextFunction[keyof typeof SqlAnsiTextFunction];

export const SqlAnsiAggregateFunction = {
  count: 'count' as 'count',
  sum: 'sum' as 'sum',
  avg: 'avg' as 'avg',
  min: 'min' as 'min',
  max: 'max' as 'max',
} as const;
export type SqlAnsiAggregateFunction = typeof SqlAnsiAggregateFunction[keyof typeof SqlAnsiAggregateFunction];

export const SqlAnsiDateTimeFunction = {
  now: 'now' as 'now',
  currentTimeStamp: 'currentTimeStamp' as 'currentTimeStamp',
  datePart: 'date_part' as 'date_part',
} as const;
export type SqlAnsiDateTimeFunction = typeof SqlAnsiDateTimeFunction[keyof typeof SqlAnsiDateTimeFunction];

export const SqlAnsiCommonFunction = {
  coalesce: 'coalesce' as 'coalesce',
  nullif: 'nullif' as 'nullif',
} as const;
export type SqlAnsiCommonFunction = typeof SqlAnsiCommonFunction[keyof typeof SqlAnsiCommonFunction];

export type SqlAnsiFunction = SqlAnsiPredicateFunction | SqlAnsiTextFunction | SqlAnsiAggregateFunction | SqlAnsiDateTimeFunction | SqlAnsiCommonFunction;

export const SqlAnsiLogicOperator = {
  and: 'and' as 'and',
  or: 'or' as 'or'
} as const;
export type SqlAnsiLogicOperator = typeof SqlAnsiLogicOperator[keyof typeof SqlAnsiLogicOperator];

export interface Condition {
    leftOperand: any
    operator: SqlAnsiOperator,
    rightOperand: any 
}

export type Conditions = string | string[] | Condition | Condition[] | {
    [k in SqlAnsiLogicOperator] : string | string[] | Condition | Condition[] | Conditions | Conditions[]
}


export interface Column {
    column: string | SqlAnsiFunction | SelectQuery | UnionQuery, 
    alias?: string
}

export type JoinType = 'inner' | 'left' | 'right' | 'cross';

export interface FromTable {
    table: string | SelectQuery | UnionQuery; 
    alias?: string 
}

export interface FromJoinTable extends FromTable {
    join: JoinType,
    on: Conditions
}

export type FromItem = FromTable | FromJoinTable;

export type OrderByDirection = 'asc' | 'desc';

export interface OrderByColumn extends Column {
    direction: OrderByDirection
}

export interface UnionQuery {
    all: boolean;
    queries: (SelectQuery | WithQuery)[]
}

export interface WithQuery {
    queries: {query: SelectQuery | UnionQuery, alias: string}[]
    mainQuery: SelectQuery | UnionQuery
}

export interface SelectQuery {
    columns: [string | Column,...(string | Column)[]];
    from: [(string | FromTable), ...(string | FromItem)[]];
    where?: Conditions;
    groupBy?: (string | Column)[];
    having?: Conditions;
    orderBy?: (string | number | OrderByColumn)[];
    limit?: number | [number,number];
}