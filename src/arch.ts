"use strict";

import * as ref from 'ref';

export let arch: string = process.arch;
export let is64: boolean = arch === 'x64';
export let is32: boolean = arch === 'x32';

export let addressSize: number = 0;
if (is32) addressSize = 4;
if (is64) addressSize = 8;
export let pointerType: ref.Type;
if (is64) pointerType = ref.types.ulonglong;
if (is32) pointerType = ref.types.uint;

if (addressSize === 0) {
    console.warn('Unknown architecture');
} else {
    if (is32) console.info('32bit architecture');
    if (is64) console.info('64bit architecture');
}
