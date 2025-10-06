import { getOrCreateProp, hasValue, setOrCreateProp } from "@aalencarv/common-utils";



/*****************************************
* Export Sequelize Integration
*****************************************/
export {
    isOperation as isSequelizeOperation,
    getOperation as getSequelizeOperation,
    prepareLogicalQueryParams as prepareSequelizeLogicalQueryParams,
    prepareQueryParams as prepareSequelizeQueryParams,  
} from "./sequelizeIntegration/SequelizeIntegration.js";
import * as SequelizeIntegration from "./sequelizeIntegration/SequelizeIntegration.js";
export { SequelizeIntegration };



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
} as const;
export type SqlAnsiOperator = typeof SqlAnsiOperator[keyof typeof SqlAnsiOperator];

export const SqlAnsiLogicOperator = {
    and: 'and',
    or: 'or',
} as const;
export type SqlAnsiLogicOperator = typeof SqlAnsiLogicOperator[keyof typeof SqlAnsiLogicOperator];





/*****************************************
* Condition
*****************************************/
export class Condition {
    leftOperand?: any;
    operator?: SqlAnsiOperator;
    rightOperand?: any;
    expression?: string;

    constructor(init?: Partial<Condition> | [any, SqlAnsiOperator, any] | string) {
        if (hasValue(init)) {
            if (typeof init === 'string') {
                this.expression = init;
            } else if (Array.isArray(init)) {
                this.leftOperand = init[0];
                this.operator = init[1];
                this.rightOperand = init[2];
            } else {
                Object.assign(this, init);
            }
        }
    }
}




/*****************************************
* Condition
*****************************************/
export class LogicExpression {
  and?: (Condition | LogicExpression | [any, SqlAnsiOperator, any] | string)[];
  or?: (Condition | LogicExpression | [any, SqlAnsiOperator, any] | string)[];

  constructor(init?: Partial<LogicExpression>) {
    Object.assign(this, init);
  }
}





/*****************************************
* UnionQuery
*****************************************/
export interface UnionQuery {
    all: boolean;
    queries: (SelectQuery | UnionQuery | WithQuery)[];
}
export class UnionQuery implements UnionQuery {
    constructor(init?: Partial<UnionQuery>) {
        Object.assign(this, init);
    }
}




/*****************************************
* WithQuery
*****************************************/
export interface WithQuery {
    queries: {query: SelectQuery | UnionQuery | WithQuery, alias: string}[];
    mainQuery: SelectQuery | UnionQuery | WithQuery;
}
export class WithQuery implements WithQuery {
    constructor(init?: Partial<WithQuery>) {
        Object.assign(this, init);
    }
}





/*****************************************
* SelectQuery
*****************************************/
export interface SelectQuery {
    columns?: any;
    from?: any;
    where?: (Condition | LogicExpression | [any, SqlAnsiOperator, any] | string )[];
    groupBy?: any;
    having?: any;
    orderBy?: any;
    limit?: any;
}
export class SelectQuery implements SelectQuery {
    constructor(init?: Partial<SelectQuery>) {        
        Object.assign(this, init);
    }
}
