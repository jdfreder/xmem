import * as kernel from './osx-kernel';

/**
 * Throws an error if the return value from the kernel call indicates failure.
 * @param {number} kernelReturn
 */
export function checkReturn(kernelReturn: number): void {
    if (kernelReturn !== 0) { 
        let msg = kernel.functions.mach_error_string(kernelReturn);
        throw new Error('System error ' + String(kernelReturn) + '\nMessage: ' + msg);
    }
}
