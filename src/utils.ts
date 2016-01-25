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

/**
 * Gets whether or not a binary flag is set
 * @param  {any}     context
 * @param  {string}  attrName - context[attrName] to test
 * @param  {any}     enumType - enum name
 * @param  {string}  flagName - enum flag name
 * @return {boolean}
 */
export function _getFlag(context: any, attrName: string, enumType: any, flagName: string): boolean {
    return Boolean(context[attrName] & enumType[flagName]);
}

/**
 * Sets whether or not a binary flag is set
 * @param  {any}     context
 * @param  {string}  attrName - context[attrName] to test
 * @param  {any}     enumType - enum name
 * @param  {string}  flagName - enum flag name
 * @param  {boolean} value
 */
export function _setFlag(context: any, attrName: string, enumType: any, flagName: string, value: boolean): void {
    if (value) {
        context[attrName] |= enumType[flagName];
    } else {
        context[attrName] &= ~enumType[flagName];
    }
}

