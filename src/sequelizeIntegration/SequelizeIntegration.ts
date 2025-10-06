import { hasValue, typeOf } from "@aalencarv/common-utils";
import { Op, Sequelize } from "sequelize";
const opKeys = Object.keys(Op); 
const opKeysLower = opKeys.map(el=>el.toLowerCase().trim());     

export function isSequelizeOperation(name: any) : boolean {
    let result = false;
    if (name in Op) {
        result = true;
    } else {
        if (typeof name === 'string') {
            name = name || '';
            let realInd = opKeysLower.indexOf(name.replace(/[\s_]/g,'').toLowerCase().trim());
            if (realInd > -1)  {
                result = true;
            } else {            
                name = name.trim().toLowerCase();
                if (name === 'not in' || name === 'notin' || name === 'not like' || name === 'notlike' || name === '>' || name === '=' || name === '<' || name === '>=' || name === '<=' || name === '<>' || name === '!=') {
                    result = true;
                }
            }
        }
    }
    return result;
}

export function getSequelizeOperation(name: any) : any {
    let result = name;
    if (typeof result === 'string') {
        result = result || '';
        let realInd = opKeysLower.indexOf(result.replace(/[\s_]/g,'').toLowerCase().trim());
        if (realInd > -1)  {
            result = (Op as any)[opKeys[realInd]];
        } else {            
            result = result.trim().toLowerCase();
            if (result === 'not in' || result === 'notin') {
                result = 'notIn';
            } else if (result === 'not like' || result === 'notlike') {
                result = 'notLike';
            } else if (result === '>') {
                result = 'gt';
            } else if (result === '=') {
                result = 'eq';
            } else if (result === '<') {
                result = 'lt';            
            } else if (result === '>=') {
                result = 'gte';
            } else if (result === '<=') {
                result = 'lte';
            } else if (result === '<>' || result === '!=') {
                result = 'ne';
            }
            result = (Op as any)[result] || result;
        }
    }
    return result;
}

export function prepareLogicalQueryParams( queryParamsProp: any) : any {
    let result = queryParamsProp;        
    let realInd = -1;
    if (hasValue(queryParamsProp)) {
        if (typeOf(queryParamsProp) === 'object') {
            //result = {}; //symbol keys not iteratable by for key in 
            for(const key in queryParamsProp) {    
                if (isSequelizeOperation(key)) {
                    let realOp = getSequelizeOperation(key);
                    result[realOp] = prepareLogicalQueryParams(queryParamsProp[key]);
                    delete result[key]; //replaced by simbol key
                } else {
                    result[key] = prepareLogicalQueryParams(queryParamsProp[key]);  
                }
            }
        } else if (typeOf(queryParamsProp) === 'array') {
            for(const key in queryParamsProp) {                                
                result[key] = prepareLogicalQueryParams(queryParamsProp[key]);  
            }
        } else if (typeof queryParamsProp === 'string') {
            if ((queryParamsProp.indexOf(' ') > -1  || queryParamsProp.indexOf('(') > -1)) {
                if (queryParamsProp.indexOf('%') === 0) queryParamsProp = `'${queryParamsProp}'`; //like %%
                result = Sequelize.literal(queryParamsProp);
            } else if (hasValue(queryParamsProp.match(/\d{4}-\d{2}-\d{2}/))) { //avoid automatic timeszone offset of sequelize
                result = Sequelize.literal(`'${queryParamsProp}'`)
            }
        }
    }
    return result;
}

function prepareQueryParams(queryParams?: any) : any{
    queryParams = queryParams || {};      
    if (queryParams.where) {
        queryParams.where = prepareLogicalQueryParams(queryParams.where || {});
    }
    for(const key in queryParams?.attributes || []) {
        if (typeof queryParams.attributes[key] === 'string') {
            if (queryParams.attributes[key].trim().indexOf(' ') > -1
                || queryParams.attributes[key].trim().indexOf('(') > -1
            ) {
                queryParams.attributes[key] = Sequelize.literal(queryParams.attributes[key]);
            }
        }
    }        
    for(const key in queryParams?.order || []) {            
        if (queryParams.order[key][0]?.toString().trim().indexOf(' ') > -1
            || queryParams.order[key][0]?.toString().trim().indexOf('(') > -1
            || (!isNaN(queryParams.order[key][0]) && Number.isInteger(queryParams.order[key][0]-0))
        ) {
            queryParams.order[key][0] = Sequelize.literal(queryParams.order[key][0]);
        }
    }      
    return queryParams;
}