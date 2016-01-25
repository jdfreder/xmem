"use strict";
import * as ref from 'ref';

/**
 * Architecture string, i.e. "x64"
 * @type {string}
 */
export let arch: string = process.arch;

/**
 * Is a 64 bit architecture
 * @type {boolean}
 */
export let is64: boolean = arch === 'x64';

/**
 * Is a 32 bit architecture
 * @type {boolean}
 */
export let is32: boolean = arch === 'x32';

/**
 * Byte length of memory addresses in the current architecture
 * @type {number}
 */
export let addressSize: number = 0;
if (is32) addressSize = 4;
if (is64) addressSize = 8;

/**
 * Ref.type to use for pointers in the current architecture
 * @type {ref.Type}
 */
export let pointerType: ref.Type;
if (is64) pointerType = ref.types.ulonglong;
if (is32) pointerType = ref.types.uint;

if (addressSize === 0) {
    console.warn('Unknown architecture');
}
