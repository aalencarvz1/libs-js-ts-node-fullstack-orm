import { hasValue, typeOf } from '@aalencarv/common-utils';

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
    leftOperand: any;
    operator: SqlAnsiOperator;
    rightOperand?: any;
    expression?: string;
}
export class Condition implements Condition {
     constructor(init?: Partial<Condition> | [any, SqlAnsiOperator, any?] | string) {
        if (hasValue(init)) {
            if (typeOf(init) === 'array') {
                this.leftOperand = (init as any)[0];
                this.operator = (init as any)[1] || undefined;
                this.rightOperand = (init as any)[2] || undefined;
            } else if (typeof init === 'string') {
                this.expression = init;
            } else {
                Object.assign(this, init);
            }
        }
    }  
}

export interface Conditions {
    [SqlAnsiPredicateFunction.exists] ?: string | SelectQuery | UnionQuery | WithQuery;
    [SqlAnsiPredicateFunction.notExists] ?: string | SelectQuery | UnionQuery | WithQuery;
    [SqlAnsiLogicOperator.and] ?: CondictionsMultiType;
    [SqlAnsiLogicOperator.or] ?: CondictionsMultiType;
}
export class Conditions implements Conditions{
     constructor(init?: Partial<Conditions>) {
        Object.assign(this, init);
     }
}
export type CondictionsMultiType = (string | Condition | Conditions | [any, SqlAnsiOperator, any])[];


export interface Column {
    column: string | SqlAnsiFunction | SelectQuery | UnionQuery | WithQuery;
    alias?: string;
}

export type ColumnsMultiType = (string | number | Column)[];

export type JoinType = 'inner' | 'left' | 'right' | 'cross';

export interface FromTable {
    table: string | SelectQuery | UnionQuery | WithQuery; 
    alias?: string ;
}

export interface FromJoinTable extends FromTable {
    join: JoinType;
    on: CondictionsMultiType;
}

export type FromItem = FromTable | FromJoinTable;
export type FromMultiType = [(string | FromTable)?, ...(string | FromItem)[]];

export type OrderByDirection = 'asc' | 'desc';

export interface OrderByColumn extends Column {
    direction: OrderByDirection;
}

export interface UnionQuery {
    all: boolean;
    queries: (SelectQuery | UnionQuery | WithQuery)[];
}
export class UnionQuery implements UnionQuery {
    constructor(init?: Partial<UnionQuery>) {
        Object.assign(this, init);
    }
}

export interface WithQuery {
    queries: {query: SelectQuery | UnionQuery | WithQuery, alias: string}[];
    mainQuery: SelectQuery | UnionQuery | WithQuery;
}
export class WithQuery implements WithQuery {
    constructor(init?: Partial<WithQuery>) {
        Object.assign(this, init);
    }
}

export type OrderByMultiType = (string | number | Column | OrderByColumn)[];
export type LimitMultiType = [number,number];


export interface SelectQuery {
    columns?: ColumnsMultiType;
    from?: FromMultiType;
    where?: CondictionsMultiType;
    groupBy?: ColumnsMultiType;
    having?: CondictionsMultiType;
    orderBy?: OrderByMultiType;
    limit?: LimitMultiType;
}
export class SelectQuery implements SelectQuery {
    constructor(init?: Partial<SelectQuery>) {        
        Object.assign(this, init);
    }
}

