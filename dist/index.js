export const SqlAnsiOperator = {
    equal: '=',
    notEqual: '<>',
    greaterThan: '>',
    greaterEqualThan: '>=',
    lessThan: '<',
    lessEqualThan: '<=',
    like: 'like',
    notLike: 'not like',
    in: 'in',
    notIn: 'not in',
    between: 'between',
    notBetween: 'not between',
    is: 'is',
    isNot: 'is not',
};
export const SqlAnsiPredicateFunction = {
    exists: 'exists',
    notExists: 'not exists',
    any: 'any',
    some: 'some',
    all: 'all',
};
export const SqlAnsiTextFunction = {
    upper: 'upper',
    lower: 'lower',
    concat: 'concat',
};
export const SqlAnsiAggregateFunction = {
    count: 'count',
    sum: 'sum',
    avg: 'avg',
    min: 'min',
    max: 'max',
};
export const SqlAnsiDateTimeFunction = {
    now: 'now',
    currentTimeStamp: 'currentTimeStamp',
    datePart: 'date_part',
};
export const SqlAnsiCommonFunction = {
    coalesce: 'coalesce',
    nullif: 'nullif',
};
export const SqlAnsiLogicOperator = {
    and: 'and',
    or: 'or'
};
export class Condition {
    constructor(init) {
        Object.assign(this, init);
    }
}
export class UnionQuery {
    constructor(init) {
        Object.assign(this, init);
    }
}
export class WithQuery {
    constructor(init) {
        Object.assign(this, init);
    }
}
export class SelectQuery {
    constructor(init) {
        Object.assign(this, init);
    }
}
