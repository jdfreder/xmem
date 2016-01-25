"use strict";
const os = require('os');
import * as osx from './osx/system';
import {ISystem} from './i-system';

/**
 * Gets the currently running operating system
 * @return {ISystem} system
 */
export function getSystem(): ISystem {
    switch (os.type().toLowerCase()) {
        case ('darwin'): 
            return new osx.System();
        case ('windows_nt'): 
        case ('linux'): 
        default:
            throw new Error('System not supported');
    }
}
