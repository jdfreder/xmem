// const ref = require('ref');
import * as ref from 'ref';

/**
 * Translate flags from one enum to another by flag name.
 * @param  {number} x
 * @param  {any}    fromType
 * @param  {any}    toType
 * @return {number}
 */
export function translateEnum(x: number, fromType: any, toType: any): number {
    function getOptions(enumType: any): string[] {
        return Object.keys(enumType).filter(x => String(parseInt(x)) !== x);
    }
    
    let output: number = 0;
    for (let option of getOptions(fromType)) {
        if (Boolean(x & fromType[option])) {
            output = output | toType[option];
        }
    }
    return output;
}
