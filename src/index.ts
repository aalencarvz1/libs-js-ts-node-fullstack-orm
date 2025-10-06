export {
  isOperation as isSequelizeOperation,
  getOperation as getSequelizeOperation,
  prepareLogicalQueryParams as prepareSequelizeLogicalQueryParams,
  prepareQueryParams as prepareSequelizeQueryParams,  
} from "./sequelizeIntegration/SequelizeIntegration.js";
import * as SequelizeIntegration from "./sequelizeIntegration/SequelizeIntegration.js";
export { SequelizeIntegration };



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
export interface SelectQuery {
    columns?: any;
    from?: any;
    where?: any;
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
