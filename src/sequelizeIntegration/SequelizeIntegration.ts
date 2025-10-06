import { Op } from "sequelize";
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