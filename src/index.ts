import { firstValid, hasValue, isArray, typeOf } from "@aalencarv/common-utils";


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
export interface BaseSqlComponent {
    expression?: string;
}
export class BaseSqlComponent implements BaseSqlComponent{
    constructor(init?: any) { //any to support all constructors parameters types
        if (hasValue(init)) {
            if (typeof init === 'string') {
                this.expression = init;
            } else {
                Object.assign(this, init);
            }
        }
    }
}



/*****************************************
* Condition
*****************************************/
export interface Column {
    name?: SelectQuery | UnionQuery | WithQuery | string | number;
    alias?: string;
}
export class Column extends BaseSqlComponent implements Column {
    constructor(init?: Partial<Column> | [SelectQuery | UnionQuery | WithQuery | string | number,string?] | SelectQuery | UnionQuery | WithQuery | string | number) {
        super(init);
        if (hasValue(init)) {
            if(isArray(init)) {
                this.name = init[0];
                this.name = init[1];
            } else if (typeOf(init) === 'object') {
                if (Object.keys(init).indexOf('name') > -1) {
                    this.name = (init as any)?.name;
                    this.alias = (init as any)?.alias;
                } else {
                    this.name = init; //others objects
                }
            } else if (['number'].indexOf(typeOf(init)) > -1) { //string cannot be checked because it is treated as expression on base component
                this.name = init;
            }
        }
    }
}


/*****************************************
* Condition
*****************************************/
export class Condition extends BaseSqlComponent {
    leftOperand?: any;
    operator?: SqlAnsiOperator;
    rightOperand?: any;    

    constructor(init?: Partial<Condition> | [any, SqlAnsiOperator, any] | string) {
        super(init);
        if (hasValue(init) && isArray(init)) {
            this.leftOperand = init[0];
            this.operator = init[1];
            this.rightOperand = init[2];            
        }
    }
}




/*****************************************
* Condition
*****************************************/
export class LogicExpression extends BaseSqlComponent {
  and?: (Condition | LogicExpression | [any, SqlAnsiOperator, any] | string)[];
  or?: (Condition | LogicExpression | [any, SqlAnsiOperator, any] | string)[];
  not?: (Condition | LogicExpression | [any, SqlAnsiOperator, any] | string)[];
  exists?: SelectQuery | UnionQuery | WithQuery | string;
  notExists?: SelectQuery | UnionQuery | WithQuery | string;

  constructor(init?: Partial<LogicExpression> | string) {
    super(init);
  }
}



/*****************************************
* FromTable
*****************************************/
export interface FromTable extends BaseSqlComponent{
    table?: SelectQuery | UnionQuery | WithQuery | string;
    alias?: string;
}
export class FromTable extends BaseSqlComponent implements FromTable{
    constructor(init?: Partial<FromTable> | [SelectQuery | UnionQuery | WithQuery | string, string?] | SelectQuery | UnionQuery | WithQuery | string) {
        super(init);
        if (hasValue(init) && isArray(init)) {
            this.table = init[0];
            this.alias = init[1];
        }
    }
}



/*****************************************
* FromTable
*****************************************/
export interface JoinTable extends FromTable{
    join?: 'inner' | 'left' | 'right' | 'cross' | undefined;
    on?: (Condition | LogicExpression | [any, SqlAnsiOperator, any] | string )[];
}
export class JoinTable extends FromTable implements JoinTable{
    constructor(init?: Partial<JoinTable> | [Partial<FromTable> | [SelectQuery | UnionQuery | WithQuery | string, string?] | SelectQuery | UnionQuery | WithQuery | string, 'inner' | 'left' | 'right' | 'cross', (Condition | LogicExpression | [any, SqlAnsiOperator, any] | string )[]] | Partial<FromTable> | [SelectQuery | UnionQuery | WithQuery | string, string?] | SelectQuery | UnionQuery | WithQuery | string) {
        
        if (hasValue(init)) {
            if (isArray(init)) {
                super(init[0]);
                this.join = init[1] as any;
                this.on = init[2];
            } else {
                super(init);                
            } 
        }
    }
}





/*****************************************
* SelectQuery
*****************************************/
export interface SelectQuery extends BaseSqlComponent{
    columns?: (Column | [SelectQuery | UnionQuery | WithQuery | string | number,string?] | SelectQuery | UnionQuery | WithQuery | string | number)[];
    from?: (FromTable | JoinTable)[];
    where?: (Condition | LogicExpression | [any, SqlAnsiOperator, any] | string )[];
    groupBy?: (Column | [SelectQuery | UnionQuery | WithQuery | string | number,string?] | SelectQuery | UnionQuery | WithQuery | string | number)[];
    having?: (Condition | LogicExpression | [any, SqlAnsiOperator, any] | string )[];
    orderBy?: (Column | [SelectQuery | UnionQuery | WithQuery | string | number,string?] | SelectQuery | UnionQuery | WithQuery | string | number)[];
    limit?: [number,number?];
}
export class SelectQuery extends BaseSqlComponent implements SelectQuery {
    constructor(init?: Partial<SelectQuery> | string) {        
        super(init);
    }
}



/*****************************************
* UnionQuery
*****************************************/
export interface UnionQuery extends BaseSqlComponent{
    all?: boolean;
    queries?: (SelectQuery | UnionQuery | WithQuery)[];
}
export class UnionQuery extends BaseSqlComponent implements UnionQuery {
    constructor(init?: Partial<UnionQuery> | string) {
        super(init);
        init = init || {};
        if (hasValue(init) && typeOf(init) === 'object') {
            (init as Partial<UnionQuery>).all = firstValid([(init as Partial<UnionQuery>).all, true]);
        }
    }
}




/*****************************************
* WithQuery
*****************************************/
export interface WithQuery extends BaseSqlComponent{
    queries: {query: SelectQuery | UnionQuery | WithQuery | string, alias: string}[];
    mainQuery: SelectQuery | UnionQuery | WithQuery | string;
}
export class WithQuery extends BaseSqlComponent implements WithQuery {
    constructor(init?: Partial<WithQuery> | string) {
        super(init);
    }
}




