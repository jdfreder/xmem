
export interface IThread {
    id: number;
    getThreadState32(): Promise<ThreadState32>;
    setThreadState32(ThreadState32): Promise<{}>;
    getThreadState64(): Promise<ThreadState64>;
    setThreadState64(ThreadState64): Promise<{}>;
    getFloatState32(): Promise<FloatState32>;
    setFloatState32(FloatState32): Promise<{}>;
    getFloatState64(): Promise<FloatState64>;
    setFloatState64(FloatState64): Promise<{}>;
    getExceptionState(): Promise<ExceptionState>;
    setExceptionState(ExceptionState): Promise<{}>;
    getDebugState(): Promise<DebugState>;
    setDebugState(DebugState): Promise<{}>;
    pause(): Promise<{}>;
    resume(): Promise<{}>;
    kill(): Promise<{}>;
}

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
    eflags: Flags
    eip: number
    cs: number
    ds: number
    es: number
    fs: number
    gs: number
}

export enum Flags {
    CARRY = 0x1,
    X0 = 0x2,
    PARITY = 0x4,
    X1 = 0x8,
    ADJUST = 0x10,
    X2 = 0x20,
    ZERO = 0x40,
    SIGN = 0x80,
    TRAP = 0x100,
    INTERRUPT = 0x200,
    DIRECTION = 0x400,
    OVERFLOW = 0x800,
    IOPL1 = 0x1000,
    IOPL2 = 0x2000,
    NESTEDTASK = 0x4000,
    X3 = 0x8000,
    RESUME = 0x10000,
    V86MODE = 0x20000,
    ALIGNCHECK = 0x40000,
    VINT = 0x80000,
    VINTPENDING = 0x100000,
    CPUID = 0x200000
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
    rflags: Flags
    cs: number
    fs: number
    gs: number
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

export enum FpControlFlags {
    invalid: boolean
    denorm: boolean
    zdiv: boolean
    ovrfl: boolean
    undfl: boolean
    precis: boolean
    res0: boolean
    pc: boolean
    rc: boolean
    res1: boolean
    res2: boolean
}

export enum FpStatusFlags {
    invalid: boolean
    denorm: boolean
    zdiv: boolean
    ovrfl: boolean
    undfl: boolean
    precis: boolean
    stkflt: boolean
    errsumm: boolean
    c0: boolean
    c1: boolean
    c2: boolean
    tos: boolean
    busy: boolean
}

export class FloatState {
    
    export class FpControl {
        invalid: boolean
        denorm: boolean
        zdiv: boolean
        ovrfl: boolean
        undfl: boolean
        precis: boolean
        res0: boolean
        pc: boolean
        rc: boolean
        res1: boolean
        res2: boolean
    }

    export class FpStatus {
        invalid: boolean
        denorm: boolean
        zdiv: boolean
        ovrfl: boolean
        undfl: boolean
        precis: boolean
        stkflt: boolean
        errsumm: boolean
        c0: boolean
        c1: boolean
        c2: boolean
        tos: boolean
        busy: boolean
    }
}

export class FloatState32 extends FloatState {
    fpu_reserved: number[]
    fpu_fcw: number
    fpu_fsw: number
    fpu_ftw: number /* x87 FPU tag word */
    fpu_rsrv1: number /* reserved */ 
    fpu_fop: number /* x87 FPU Opcode */
    fpu_ip: number /* x87 FPU Instruction Pointer offset */
    fpu_cs: number /* x87 FPU Instruction Pointer Selector */
    fpu_rsrv2: number /* reserved */
    fpu_dp: number /* x87 FPU Instruction Operand(Data) Pointer offset */
    fpu_ds: number /* x87 FPU Instruction Operand(Data) Pointer Selector */
    fpu_rsrv3: number /* reserved */
    fpu_mxcsr: number /* MXCSR Register state */
    fpu_mxcsrmask: number /* MXCSR mask */
    fpu_stmm0: string /* ST0/MM0   */
    fpu_stmm1: string /* ST1/MM1  */
    fpu_stmm2: string /* ST2/MM2  */
    fpu_stmm3: string /* ST3/MM3  */
    fpu_stmm4: string /* ST4/MM4  */
    fpu_stmm5: string /* ST5/MM5  */
    fpu_stmm6: string /* ST6/MM6  */
    fpu_stmm7: string /* ST7/MM7  */
    fpu_xmm0: string /* XMM 0  */
    fpu_xmm1: string /* XMM 1  */
    fpu_xmm2: string /* XMM 2  */
    fpu_xmm3: string /* XMM 3  */
    fpu_xmm4: string /* XMM 4  */
    fpu_xmm5: string /* XMM 5  */
    fpu_xmm6: string /* XMM 6  */
    fpu_xmm7: string /* XMM 7  */
    fpu_rsrv4: string /* reserved */
    fpu_reserved1: number;    
}

export class FloatState64 extends FloatState {
    fpu_reserved: number[]
    fpu_fcw: number /* x87 FPU control word */
    fpu_fsw: number /* x87 FPU status word */
    fpu_ftw: number /* x87 FPU tag word */
    fpu_rsrv1: number /* reserved */ 
    fpu_fop: number /* x87 FPU Opcode */
    /* x87 FPU Instruction Pointer */
    fpu_ip: number /* offset */
    fpu_cs: number /* Selector */
    fpu_rsrv2: number /* reserved */
    /* x87 FPU Instruction Operand(Data) Pointer */
    fpu_dp: number /* offset */
    fpu_ds: number /* Selector */
    fpu_rsrv3: number /* reserved */
    fpu_mxcsr: number /* MXCSR Register state */
    fpu_mxcsrmask: number /* MXCSR mask */
    fpu_stmm0: string /* ST0/MM0   */
    fpu_stmm1: string /* ST1/MM1  */
    fpu_stmm2: string /* ST2/MM2  */
    fpu_stmm3: string /* ST3/MM3  */
    fpu_stmm4: string /* ST4/MM4  */
    fpu_stmm5: string /* ST5/MM5  */
    fpu_stmm6: string /* ST6/MM6  */
    fpu_stmm7: string /* ST7/MM7  */
    fpu_xmm0: string /* XMM 0  */
    fpu_xmm1: string /* XMM 1  */
    fpu_xmm2: string /* XMM 2  */
    fpu_xmm3: string /* XMM 3  */
    fpu_xmm4: string /* XMM 4  */
    fpu_xmm5: string /* XMM 5  */
    fpu_xmm6: string /* XMM 6  */
    fpu_xmm7: string /* XMM 7  */
    fpu_xmm8: string /* XMM 8  */
    fpu_xmm9: string /* XMM 9  */
    fpu_xmm10: string /* XMM 10  */
    fpu_xmm11: string /* XMM 11 */
    fpu_xmm12: string /* XMM 12  */
    fpu_xmm13: string /* XMM 13  */
    fpu_xmm14: string /* XMM 14  */
    fpu_xmm15: string /* XMM 15  */
    fpu_rsrv4: string /* reserved */
    fpu_reserved1: number
}

