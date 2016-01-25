import {_getFlag, _setFlag} from './utils';

////////////////////////////////////////////////////////////////////////////////
// Enums
////////////////////////////////////////////////////////////////////////////////

/**
 * Generic thread state flags
 */
export enum ThreadFlags {
    carry = 0x1,
    x0 = 0x2,
    parity = 0x4,
    x1 = 0x8,
    adjust = 0x10,
    x2 = 0x20,
    zero = 0x40,
    sign = 0x80,
    trap = 0x100,
    interrupt = 0x200,
    direction = 0x400,
    overflow = 0x800,
    iopl1 = 0x1000,
    iopl2 = 0x2000,
    nestedtask = 0x4000,
    x3 = 0x8000,
    resume = 0x10000,
    v86mode = 0x20000,
    aligncheck = 0x40000,
    vint = 0x80000,
    vintpending = 0x100000,
    cpuid = 0x200000
}

/**
 * Floating point control flags
 */
export enum FpControlFlags {
    invalid = 1 << 0,
    denorm = 1 << 1,
    zdiv = 1 << 2,
    ovrfl = 1 << 3,
    undfl = 1 << 4,
    precis = 1 << 5,
    res0 = 1 << 6,
    pc = 1 << 7,
    rc = 1 << 8,
    res1 = 1 << 9,
    res2 = 1 << 10
}

/**
 * Floating point status flags
 */
export enum FpStatusFlags {
    invalid = 1 << 0,
    denorm = 1 << 1,
    zdiv = 1 << 2,
    ovrfl = 1 << 3,
    undfl = 1 << 4,
    precis = 1 << 5,
    stkflt = 1 << 6,
    errsumm = 1 << 7,
    c0 = 1 << 8,
    c1 = 1 << 9,
    c2 = 1 << 10,
    c2_alt = 1 << 11,
    tos = 1 << 12,
    busy = 1 << 13
}

////////////////////////////////////////////////////////////////////////////////
// Interfaces
////////////////////////////////////////////////////////////////////////////////

/**
 * Represents a process thread
 *
 * Obtained via `Process.getThreads()`
 */
export interface IThread {
    /**
     * Id of the thread
     * @type {number}
     */
    id: number;
    
    /**
     * Get the generic 32bit thread state (eax, ecx, ebx, etc...)
     * @return {Promise<ThreadState32>} state
     */
    getThreadState32(): Promise<ThreadState32>;
    
    /**
     * Set the generic 32bit thread state (eax, ecx, ebx, etc...)
     * @param  {ThreadState32} value
     * @return {Promise}             success
     */
    setThreadState32(value: ThreadState32): Promise<{}>;
    
    /**
     * Get the generic 64bit thread state
     * @return {Promise<ThreadState64>} state
     */
    getThreadState64(): Promise<ThreadState64>;
    
    /**
     * Set the generic 64bit thread state
     * @param  {ThreadState64} value
     * @return {Promise}             success
     */
    setThreadState64(value: ThreadState64): Promise<{}>;
    
    /**
     * Get the 32bit thread floating point state
     * @return {Promise<FloatState32>} state
     */
    getFloatState32(): Promise<FloatState32>;
    
    /**
     * Set the 32bit thread floating point state
     * @param  {FloatState32} value
     * @return {Promise}            success
     */
    setFloatState32(value: FloatState32): Promise<{}>;
    
    /**
     * Get the 64bit thread floating point state
     * @return {Promise<FloatState64>} state
     */
    getFloatState64(): Promise<FloatState64>;
    
    /**
     * Set the 64bit thread floating point state
     * @param  {FloatState64} value
     * @return {Promise}            success
     */
    setFloatState64(value: FloatState64): Promise<{}>;
    
    /**
     * Get the thread exception state
     * @return {Promise<ExceptionState>} state
     */
    getExceptionState(): Promise<ExceptionState>;
    
    /**
     * Set the thread exception state
     * @param  {ExceptionState} value
     * @return {Promise}              success
     */
    setExceptionState(value: ExceptionState): Promise<{}>;
    
    /**
     * Get the thread debug state
     * @return {Promise<DebugState>} state
     */
    getDebugState(): Promise<DebugState>;
    
    /**
     * Set the thread debug state
     * @param  {DebugState} value
     * @return {Promise}          success
     */
    setDebugState(value: DebugState): Promise<{}>;
    
    /**
     * Pause the thread
     * @return {Promise} success
     */
    pause(): Promise<{}>;
    
    /**
     * Resume the thread (for paused threads)
     * @return {Promise} success
     */
    resume(): Promise<{}>;
    
    /**
     * Kill the thread
     * @return {Promise} success
     */
    kill(): Promise<{}>;
}

////////////////////////////////////////////////////////////////////////////////
// Classes
////////////////////////////////////////////////////////////////////////////////
export class ThreadState32 {
    eax: number
    ebx: number
    ecx: number
    edx: number
    edi: number
    esi: number
    ebp: number
    esp: number
    ss: number
    eflags: ThreadFlags
    eip: number
    cs: number
    ds: number
    es: number
    fs: number
    gs: number
    
    get carry(): boolean { return _getFlag(this, 'eflags', ThreadFlags, 'carry'); }
    set carry(value: boolean) { _setFlag(this, 'eflags', ThreadFlags, 'carry', value); }
    get x0(): boolean { return _getFlag(this, 'eflags', ThreadFlags, 'x0'); }
    set x0(value: boolean) { _setFlag(this, 'eflags', ThreadFlags, 'x0', value); }
    get parity(): boolean { return _getFlag(this, 'eflags', ThreadFlags, 'parity'); }
    set parity(value: boolean) { _setFlag(this, 'eflags', ThreadFlags, 'parity', value); }
    get x1(): boolean { return _getFlag(this, 'eflags', ThreadFlags, 'x1'); }
    set x1(value: boolean) { _setFlag(this, 'eflags', ThreadFlags, 'x1', value); }
    get adjust(): boolean { return _getFlag(this, 'eflags', ThreadFlags, 'adjust'); }
    set adjust(value: boolean) { _setFlag(this, 'eflags', ThreadFlags, 'adjust', value); }
    get x2(): boolean { return _getFlag(this, 'eflags', ThreadFlags, 'x2'); }
    set x2(value: boolean) { _setFlag(this, 'eflags', ThreadFlags, 'x2', value); }
    get zero(): boolean { return _getFlag(this, 'eflags', ThreadFlags, 'zero'); }
    set zero(value: boolean) { _setFlag(this, 'eflags', ThreadFlags, 'zero', value); }
    get sign(): boolean { return _getFlag(this, 'eflags', ThreadFlags, 'sign'); }
    set sign(value: boolean) { _setFlag(this, 'eflags', ThreadFlags, 'sign', value); }
    get trap(): boolean { return _getFlag(this, 'eflags', ThreadFlags, 'trap'); }
    set trap(value: boolean) { _setFlag(this, 'eflags', ThreadFlags, 'trap', value); }
    get interrupt(): boolean { return _getFlag(this, 'eflags', ThreadFlags, 'interrupt'); }
    set interrupt(value: boolean) { _setFlag(this, 'eflags', ThreadFlags, 'interrupt', value); }
    get direction(): boolean { return _getFlag(this, 'eflags', ThreadFlags, 'direction'); }
    set direction(value: boolean) { _setFlag(this, 'eflags', ThreadFlags, 'direction', value); }
    get overflow(): boolean { return _getFlag(this, 'eflags', ThreadFlags, 'overflow'); }
    set overflow(value: boolean) { _setFlag(this, 'eflags', ThreadFlags, 'overflow', value); }
    get iopl1(): boolean { return _getFlag(this, 'eflags', ThreadFlags, 'iopl1'); }
    set iopl1(value: boolean) { _setFlag(this, 'eflags', ThreadFlags, 'iopl1', value); }
    get iopl2(): boolean { return _getFlag(this, 'eflags', ThreadFlags, 'iopl2'); }
    set iopl2(value: boolean) { _setFlag(this, 'eflags', ThreadFlags, 'iopl2', value); }
    get nestedtask(): boolean { return _getFlag(this, 'eflags', ThreadFlags, 'nestedtask'); }
    set nestedtask(value: boolean) { _setFlag(this, 'eflags', ThreadFlags, 'nestedtask', value); }
    get x3(): boolean { return _getFlag(this, 'eflags', ThreadFlags, 'x3'); }
    set x3(value: boolean) { _setFlag(this, 'eflags', ThreadFlags, 'x3', value); }
    get resume(): boolean { return _getFlag(this, 'eflags', ThreadFlags, 'resume'); }
    set resume(value: boolean) { _setFlag(this, 'eflags', ThreadFlags, 'resume', value); }
    get v86mode(): boolean { return _getFlag(this, 'eflags', ThreadFlags, 'v86mode'); }
    set v86mode(value: boolean) { _setFlag(this, 'eflags', ThreadFlags, 'v86mode', value); }
    get aligncheck(): boolean { return _getFlag(this, 'eflags', ThreadFlags, 'aligncheck'); }
    set aligncheck(value: boolean) { _setFlag(this, 'eflags', ThreadFlags, 'aligncheck', value); }
    get vint(): boolean { return _getFlag(this, 'eflags', ThreadFlags, 'vint'); }
    set vint(value: boolean) { _setFlag(this, 'eflags', ThreadFlags, 'vint', value); }
    get vintpending(): boolean { return _getFlag(this, 'eflags', ThreadFlags, 'vintpending'); }
    set vintpending(value: boolean) { _setFlag(this, 'eflags', ThreadFlags, 'vintpending', value); }
    get cpuid(): boolean { return _getFlag(this, 'eflags', ThreadFlags, 'cpuid'); }
    set cpuid(value: boolean) { _setFlag(this, 'eflags', ThreadFlags, 'cpuid', value); }
}

export class ThreadState64 {
    rax: number
    rbx: number
    rcx: number
    rdx: number
    rdi: number
    rsi: number
    rbp: number
    rsp: number
    r8: number
    r9: number
    r10: number
    r11: number
    r12: number
    r13: number
    r14: number
    r15: number
    rip: number
    rflags: ThreadFlags
    cs: number
    fs: number
    gs: number
    
    get carry(): boolean { return _getFlag(this, 'rflags', ThreadFlags, 'carry'); }
    set carry(value: boolean) { _setFlag(this, 'rflags', ThreadFlags, 'carry', value); }
    get x0(): boolean { return _getFlag(this, 'rflags', ThreadFlags, 'x0'); }
    set x0(value: boolean) { _setFlag(this, 'rflags', ThreadFlags, 'x0', value); }
    get parity(): boolean { return _getFlag(this, 'rflags', ThreadFlags, 'parity'); }
    set parity(value: boolean) { _setFlag(this, 'rflags', ThreadFlags, 'parity', value); }
    get x1(): boolean { return _getFlag(this, 'rflags', ThreadFlags, 'x1'); }
    set x1(value: boolean) { _setFlag(this, 'rflags', ThreadFlags, 'x1', value); }
    get adjust(): boolean { return _getFlag(this, 'rflags', ThreadFlags, 'adjust'); }
    set adjust(value: boolean) { _setFlag(this, 'rflags', ThreadFlags, 'adjust', value); }
    get x2(): boolean { return _getFlag(this, 'rflags', ThreadFlags, 'x2'); }
    set x2(value: boolean) { _setFlag(this, 'rflags', ThreadFlags, 'x2', value); }
    get zero(): boolean { return _getFlag(this, 'rflags', ThreadFlags, 'zero'); }
    set zero(value: boolean) { _setFlag(this, 'rflags', ThreadFlags, 'zero', value); }
    get sign(): boolean { return _getFlag(this, 'rflags', ThreadFlags, 'sign'); }
    set sign(value: boolean) { _setFlag(this, 'rflags', ThreadFlags, 'sign', value); }
    get trap(): boolean { return _getFlag(this, 'rflags', ThreadFlags, 'trap'); }
    set trap(value: boolean) { _setFlag(this, 'rflags', ThreadFlags, 'trap', value); }
    get interrupt(): boolean { return _getFlag(this, 'rflags', ThreadFlags, 'interrupt'); }
    set interrupt(value: boolean) { _setFlag(this, 'rflags', ThreadFlags, 'interrupt', value); }
    get direction(): boolean { return _getFlag(this, 'rflags', ThreadFlags, 'direction'); }
    set direction(value: boolean) { _setFlag(this, 'rflags', ThreadFlags, 'direction', value); }
    get overflow(): boolean { return _getFlag(this, 'rflags', ThreadFlags, 'overflow'); }
    set overflow(value: boolean) { _setFlag(this, 'rflags', ThreadFlags, 'overflow', value); }
    get iopl1(): boolean { return _getFlag(this, 'rflags', ThreadFlags, 'iopl1'); }
    set iopl1(value: boolean) { _setFlag(this, 'rflags', ThreadFlags, 'iopl1', value); }
    get iopl2(): boolean { return _getFlag(this, 'rflags', ThreadFlags, 'iopl2'); }
    set iopl2(value: boolean) { _setFlag(this, 'rflags', ThreadFlags, 'iopl2', value); }
    get nestedtask(): boolean { return _getFlag(this, 'rflags', ThreadFlags, 'nestedtask'); }
    set nestedtask(value: boolean) { _setFlag(this, 'rflags', ThreadFlags, 'nestedtask', value); }
    get x3(): boolean { return _getFlag(this, 'rflags', ThreadFlags, 'x3'); }
    set x3(value: boolean) { _setFlag(this, 'rflags', ThreadFlags, 'x3', value); }
    get resume(): boolean { return _getFlag(this, 'rflags', ThreadFlags, 'resume'); }
    set resume(value: boolean) { _setFlag(this, 'rflags', ThreadFlags, 'resume', value); }
    get v86mode(): boolean { return _getFlag(this, 'rflags', ThreadFlags, 'v86mode'); }
    set v86mode(value: boolean) { _setFlag(this, 'rflags', ThreadFlags, 'v86mode', value); }
    get aligncheck(): boolean { return _getFlag(this, 'rflags', ThreadFlags, 'aligncheck'); }
    set aligncheck(value: boolean) { _setFlag(this, 'rflags', ThreadFlags, 'aligncheck', value); }
    get vint(): boolean { return _getFlag(this, 'rflags', ThreadFlags, 'vint'); }
    set vint(value: boolean) { _setFlag(this, 'rflags', ThreadFlags, 'vint', value); }
    get vintpending(): boolean { return _getFlag(this, 'rflags', ThreadFlags, 'vintpending'); }
    set vintpending(value: boolean) { _setFlag(this, 'rflags', ThreadFlags, 'vintpending', value); }
    get cpuid(): boolean { return _getFlag(this, 'rflags', ThreadFlags, 'cpuid'); }
    set cpuid(value: boolean) { _setFlag(this, 'rflags', ThreadFlags, 'cpuid', value); }
}

export class DebugState {
    dr0: number
    dr1: number
    dr2: number
    dr3: number
    dr4: number
    dr5: number
    dr6: number
    dr7: number
}

export class ExceptionState {
    trapno: number
    err: number
    faultvaddr: number
}

export class FloatState {
    fpu_fcw: number /* x87 FPU control word */
    get control_invalid(): boolean { return _getFlag(this, 'fpu_fcw', FpControlFlags, 'invalid'); }
    set control_invalid(value: boolean) { _setFlag(this, 'fpu_fcw', FpControlFlags, 'invalid', value); }
    get control_denorm(): boolean { return _getFlag(this, 'fpu_fcw', FpControlFlags, 'denorm'); }
    set control_denorm(value: boolean) { _setFlag(this, 'fpu_fcw', FpControlFlags, 'denorm', value); }
    get control_zdiv(): boolean { return _getFlag(this, 'fpu_fcw', FpControlFlags, 'zdiv'); }
    set control_zdiv(value: boolean) { _setFlag(this, 'fpu_fcw', FpControlFlags, 'zdiv', value); }
    get control_ovrfl(): boolean { return _getFlag(this, 'fpu_fcw', FpControlFlags, 'ovrfl'); }
    set control_ovrfl(value: boolean) { _setFlag(this, 'fpu_fcw', FpControlFlags, 'ovrfl', value); }
    get control_undfl(): boolean { return _getFlag(this, 'fpu_fcw', FpControlFlags, 'undfl'); }
    set control_undfl(value: boolean) { _setFlag(this, 'fpu_fcw', FpControlFlags, 'undfl', value); }
    get control_precis(): boolean { return _getFlag(this, 'fpu_fcw', FpControlFlags, 'precis'); }
    set control_precis(value: boolean) { _setFlag(this, 'fpu_fcw', FpControlFlags, 'precis', value); }
    get control_res0(): boolean { return _getFlag(this, 'fpu_fcw', FpControlFlags, 'res0'); }
    set control_res0(value: boolean) { _setFlag(this, 'fpu_fcw', FpControlFlags, 'res0', value); }
    get control_pc(): boolean { return _getFlag(this, 'fpu_fcw', FpControlFlags, 'pc'); }
    set control_pc(value: boolean) { _setFlag(this, 'fpu_fcw', FpControlFlags, 'pc', value); }
    get control_rc(): boolean { return _getFlag(this, 'fpu_fcw', FpControlFlags, 'rc'); }
    set control_rc(value: boolean) { _setFlag(this, 'fpu_fcw', FpControlFlags, 'rc', value); }
    get control_res1(): boolean { return _getFlag(this, 'fpu_fcw', FpControlFlags, 'res1'); }
    set control_res1(value: boolean) { _setFlag(this, 'fpu_fcw', FpControlFlags, 'res1', value); }
    get control_res2(): boolean { return _getFlag(this, 'fpu_fcw', FpControlFlags, 'res2'); }
    set control_res2(value: boolean) { _setFlag(this, 'fpu_fcw', FpControlFlags, 'res2', value); }
    
    fpu_fsw: number /* x87 FPU status word */
    get status_invalid(): boolean { return _getFlag(this, 'fpu_fsw', FpStatusFlags, 'invalid'); }
    set status_invalid(value: boolean) { _setFlag(this, 'fpu_fsw', FpStatusFlags, 'invalid', value); }
    get status_denorm(): boolean { return _getFlag(this, 'fpu_fsw', FpStatusFlags, 'denorm'); }
    set status_denorm(value: boolean) { _setFlag(this, 'fpu_fsw', FpStatusFlags, 'denorm', value); }
    get status_zdiv(): boolean { return _getFlag(this, 'fpu_fsw', FpStatusFlags, 'zdiv'); }
    set status_zdiv(value: boolean) { _setFlag(this, 'fpu_fsw', FpStatusFlags, 'zdiv', value); }
    get status_ovrfl(): boolean { return _getFlag(this, 'fpu_fsw', FpStatusFlags, 'ovrfl'); }
    set status_ovrfl(value: boolean) { _setFlag(this, 'fpu_fsw', FpStatusFlags, 'ovrfl', value); }
    get status_undfl(): boolean { return _getFlag(this, 'fpu_fsw', FpStatusFlags, 'undfl'); }
    set status_undfl(value: boolean) { _setFlag(this, 'fpu_fsw', FpStatusFlags, 'undfl', value); }
    get status_precis(): boolean { return _getFlag(this, 'fpu_fsw', FpStatusFlags, 'precis'); }
    set status_precis(value: boolean) { _setFlag(this, 'fpu_fsw', FpStatusFlags, 'precis', value); }
    get status_stkflt(): boolean { return _getFlag(this, 'fpu_fsw', FpStatusFlags, 'stkflt'); }
    set status_stkflt(value: boolean) { _setFlag(this, 'fpu_fsw', FpStatusFlags, 'stkflt', value); }
    get status_errsumm(): boolean { return _getFlag(this, 'fpu_fsw', FpStatusFlags, 'errsumm'); }
    set status_errsumm(value: boolean) { _setFlag(this, 'fpu_fsw', FpStatusFlags, 'errsumm', value); }
    get status_c0(): boolean { return _getFlag(this, 'fpu_fsw', FpStatusFlags, 'c0'); }
    set status_c0(value: boolean) { _setFlag(this, 'fpu_fsw', FpStatusFlags, 'c0', value); }
    get status_c1(): boolean { return _getFlag(this, 'fpu_fsw', FpStatusFlags, 'c1'); }
    set status_c1(value: boolean) { _setFlag(this, 'fpu_fsw', FpStatusFlags, 'c1', value); }
    get status_c2(): boolean { return _getFlag(this, 'fpu_fsw', FpStatusFlags, 'c2'); }
    set status_c2(value: boolean) { _setFlag(this, 'fpu_fsw', FpStatusFlags, 'c2', value); }
    get status_tos(): boolean { return _getFlag(this, 'fpu_fsw', FpStatusFlags, 'tos'); }
    set status_tos(value: boolean) { _setFlag(this, 'fpu_fsw', FpStatusFlags, 'tos', value); }
    get status_busy(): boolean { return _getFlag(this, 'fpu_fsw', FpStatusFlags, 'busy'); }
    set status_busy(value: boolean) { _setFlag(this, 'fpu_fsw', FpStatusFlags, 'busy', value); }
}

export class FloatState32 extends FloatState {
    fpu_reserved: number[]
    /**
     * x87 FPU tag word
     */
    fpu_ftw: number
    /**
     * reserved
     */
    fpu_rsrv1: number
    /**
     * x87 FPU Opcode
     */
    fpu_fop: number
    /**
     * x87 FPU Instruction Pointer offset
     */
    fpu_ip: number
    /**
     * x87 FPU Instruction Pointer Selector
     */
    fpu_cs: number
    /**
     * reserved
     */
    fpu_rsrv2: number
    /**
     * x87 FPU Instruction Operand(Data) Pointer offset
     */
    fpu_dp: number
    /**
     * x87 FPU Instruction Operand(Data) Pointer Selector
     */
    fpu_ds: number
    /**
     * reserved
     */
    fpu_rsrv3: number
    /**
     * MXCSR Register state
     */
    fpu_mxcsr: number
    /**
     * MXCSR mask
     */
    fpu_mxcsrmask: number
    /**
     * ST0/MM0
     */
    fpu_stmm0: string
    /**
     * ST1/MM1
     */
    fpu_stmm1: string
    /**
     * ST2/MM2
     */
    fpu_stmm2: string
    /**
     * ST3/MM3
     */
    fpu_stmm3: string
    /**
     * ST4/MM4
     */
    fpu_stmm4: string
    /**
     * ST5/MM5
     */
    fpu_stmm5: string
    /**
     * ST6/MM6
     */
    fpu_stmm6: string
    /**
     * ST7/MM7
     */
    fpu_stmm7: string
    /**
     * XMM 0
     */
    fpu_xmm0: string
    /**
     * XMM 1
     */
    fpu_xmm1: string
    /**
     * XMM 2
     */
    fpu_xmm2: string
    /**
     * XMM 3
     */
    fpu_xmm3: string
    /**
     * XMM 4
     */
    fpu_xmm4: string
    /**
     * XMM 5
     */
    fpu_xmm5: string
    /**
     * XMM 6
     */
    fpu_xmm6: string
    /**
     * XMM 7
     */
    fpu_xmm7: string
    /**
     * reserved
     */
    fpu_rsrv4: string
    fpu_reserved1: number;    
}

export class FloatState64 extends FloatState {
    fpu_reserved: number[]
    /**
     * x87 FPU tag word
     */
    fpu_ftw: number
    /**
     * reserved 
     */
    fpu_rsrv1: number
    /**
     * x87 FPU Opcode
     */
    fpu_fop: number
    // x87 FPU Instruction Pointer
    /**
     * offset
     */
    fpu_ip: number
    /**
     * Selector
     */
    fpu_cs: number
    /**
     * reserved
     */
    fpu_rsrv2: number
    // x87 FPU Instruction Operand(Data) Pointer
    /**
     * offset
     */
    fpu_dp: number
    /**
     * Selector
     */
    fpu_ds: number
    /**
     * reserved
     */
    fpu_rsrv3: number
    /**
     * MXCSR Register state
     */
    fpu_mxcsr: number
    /**
     * MXCSR mask
     */
    fpu_mxcsrmask: number
    /**
     * ST0/MM0  
     */
    fpu_stmm0: string
    /**
     * ST1/MM1 
     */
    fpu_stmm1: string
    /**
     * ST2/MM2 
     */
    fpu_stmm2: string
    /**
     * ST3/MM3 
     */
    fpu_stmm3: string
    /**
     * ST4/MM4 
     */
    fpu_stmm4: string
    /**
     * ST5/MM5 
     */
    fpu_stmm5: string
    /**
     * ST6/MM6 
     */
    fpu_stmm6: string
    /**
     * ST7/MM7 
     */
    fpu_stmm7: string
    /**
     * XMM 0 
     */
    fpu_xmm0: string
    /**
     * XMM 1 
     */
    fpu_xmm1: string
    /**
     * XMM 2 
     */
    fpu_xmm2: string
    /**
     * XMM 3 
     */
    fpu_xmm3: string
    /**
     * XMM 4 
     */
    fpu_xmm4: string
    /**
     * XMM 5 
     */
    fpu_xmm5: string
    /**
     * XMM 6 
     */
    fpu_xmm6: string
    /**
     * XMM 7 
     */
    fpu_xmm7: string
    /**
     * XMM 8 
     */
    fpu_xmm8: string
    /**
     * XMM 9 
     */
    fpu_xmm9: string
    /**
     * XMM 10 
     */
    fpu_xmm10: string
    /**
     * XMM 11
     */
    fpu_xmm11: string
    /**
     * XMM 12 
     */
    fpu_xmm12: string
    /**
     * XMM 13 
     */
    fpu_xmm13: string
    /**
     * XMM 14 
     */
    fpu_xmm14: string
    /**
     * XMM 15 
     */
    fpu_xmm15: string
    /**
     * reserved
     */
    fpu_rsrv4: string
    fpu_reserved1: number
}

