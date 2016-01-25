import {IThread, ThreadState32, ThreadState64, DebugState, ExceptionState, 
    FloatState32, FloatState64, FpControlFlags, FpStatusFlags, Flags} from '../i-thread';
import {BreakpointController} from '../breakpoint-controller';
import * as kernel from './osx-kernel';
import {checkReturn} from './utils';
import ref = require('ref');
import {translateEnum} from '../utils';

export class Thread implements IThread {
    public constructor(threadId: number, breakpoints: BreakpointController) {
        this.id = threadId;
        this._breakpoints = breakpoints;
    }
    
    public id: number;
    private _breakpoints: BreakpointController;
    
    pause(): Promise<{}> {
        checkReturn(kernel.functions.thread_suspend(this.id));
        return Promise.resolve();
    }
    resume(): Promise<{}> {
        checkReturn(kernel.functions.thread_resume(this.id));
        return Promise.resolve();
    }
    kill(): Promise<{}> {
        checkReturn(kernel.functions.thread_terminate(this.id));
        return Promise.resolve();
    }
    getThreadState32(): Promise<ThreadState32> {
        let x: any = this._getState(kernel.X86_THREAD_STATE32, kernel._STRUCT_X86_THREAD_STATE32);
        let y = new ThreadState32();
        y.eax = x.eax;
        y.ebx = x.ebx;
        y.ecx = x.ecx;
        y.edx = x.edx;
        y.edi = x.edi;
        y.esi = x.esi;
        y.ebp = x.ebp;
        y.esp = x.esp;
        y.ss = x.ss;
        y.eip = x.eip;
        y.cs = x.cs;
        y.ds = x.ds;
        y.es = x.es;
        y.fs = x.fs;
        y.gs = x.gs;
        y.eflags = translateEnum(x.eflags, kernel.ThreadStateFlags, Flags);
        return Promise.resolve(y);
    }
    setThreadState32(x: ThreadState32): Promise<{}> {
        let y = new kernel._STRUCT_X86_THREAD_STATE32();
        y.eax = x.eax;
        y.ebx = x.ebx;
        y.ecx = x.ecx;
        y.edx = x.edx;
        y.edi = x.edi;
        y.esi = x.esi;
        y.ebp = x.ebp;
        y.esp = x.esp;
        y.ss = x.ss;
        y.eip = x.eip;
        y.cs = x.cs;
        y.ds = x.ds;
        y.es = x.es;
        y.fs = x.fs;
        y.gs = x.gs;
        y.eflags = translateEnum(x.eflags, Flags, kernel.ThreadStateFlags);
        this._setState(kernel.X86_THREAD_STATE32, kernel._STRUCT_X86_THREAD_STATE32, y);
        return Promise.resolve();
    }
    getThreadState64(): Promise<ThreadState64> {
        let x: any = this._getState(kernel.X86_THREAD_STATE64, kernel._STRUCT_X86_THREAD_STATE64);
        let y = new ThreadState64();
        y.rax = x.rax;
        y.rbx = x.rbx;
        y.rcx = x.rcx;
        y.rdx = x.rdx;
        y.rdi = x.rdi;
        y.rsi = x.rsi;
        y.rbp = x.rbp;
        y.rsp = x.rsp;
        y.r8 = x.r8;
        y.r9 = x.r9;
        y.r10 = x.r10;
        y.r11 = x.r11;
        y.r12 = x.r12;
        y.r13 = x.r13;
        y.r14 = x.r14;
        y.r15 = x.r15;
        y.rip = x.rip;
        y.cs = x.cs;
        y.fs = x.fs;
        y.gs = x.gs;
        y.rflags = translateEnum(x.rflags, kernel.ThreadStateFlags, Flags);
        return Promise.resolve(y);
    }
    setThreadState64(x: ThreadState64): Promise<{}> {
        let y = new kernel._STRUCT_X86_THREAD_STATE64();
        y.rax = x.rax;
        y.rbx = x.rbx;
        y.rcx = x.rcx;
        y.rdx = x.rdx;
        y.rdi = x.rdi;
        y.rsi = x.rsi;
        y.rbp = x.rbp;
        y.rsp = x.rsp;
        y.r8 = x.r8;
        y.r9 = x.r9;
        y.r10 = x.r10;
        y.r11 = x.r11;
        y.r12 = x.r12;
        y.r13 = x.r13;
        y.r14 = x.r14;
        y.r15 = x.r15;
        y.rip = x.rip;
        y.cs = x.cs;
        y.fs = x.fs;
        y.gs = x.gs;
        y.rflags = translateEnum(x.rflags, Flags, kernel.ThreadStateFlags);
        this._setState(kernel.X86_THREAD_STATE64, kernel._STRUCT_X86_THREAD_STATE64, y);
        return Promise.resolve();
    }
    getFloatState32(): Promise<FloatState32> {
        let x: any = this._getState(kernel.X86_FLOAT_STATE32, kernel._STRUCT_X86_FLOAT_STATE32);
        let y = new FloatState32();
        y.fpu_fcw = translateEnum(x.fpu_fcw, kernel.ThreadStateFlags, FpControlFlags);
        y.fpu_fsw = translateEnum(x.fpu_fsw, kernel.ThreadStateFlags, FpStatusFlags);
        y.fpu_reserved = [x.fpu_reserved[0], x.fpu_reserved[1]];
        y.fpu_ftw = x.fpu_ftw;
        y.fpu_rsrv1 = x.fpu_rsrv1;
        y.fpu_fop = x.fpu_fop;
        y.fpu_ip = x.fpu_ip;
        y.fpu_cs = x.fpu_cs;
        y.fpu_rsrv2 = x.fpu_rsrv2;
        y.fpu_dp = x.fpu_dp;
        y.fpu_ds = x.fpu_ds;
        y.fpu_rsrv3 = x.fpu_rsrv3;
        y.fpu_mxcsr = x.fpu_mxcsr;
        y.fpu_mxcsrmask = x.fpu_mxcsrmask;
        y.fpu_stmm0 = x.fpu_stmm0;
        y.fpu_stmm1 = x.fpu_stmm1;
        y.fpu_stmm2 = x.fpu_stmm2;
        y.fpu_stmm3 = x.fpu_stmm3;
        y.fpu_stmm4 = x.fpu_stmm4;
        y.fpu_stmm5 = x.fpu_stmm5;
        y.fpu_stmm6 = x.fpu_stmm6;
        y.fpu_stmm7 = x.fpu_stmm7;
        y.fpu_xmm0 = x.fpu_xmm0;
        y.fpu_xmm1 = x.fpu_xmm1;
        y.fpu_xmm2 = x.fpu_xmm2;
        y.fpu_xmm3 = x.fpu_xmm3;
        y.fpu_xmm4 = x.fpu_xmm4;
        y.fpu_xmm5 = x.fpu_xmm5;
        y.fpu_xmm6 = x.fpu_xmm6;
        y.fpu_xmm7 = x.fpu_xmm7;
        y.fpu_rsrv4 = x.fpu_rsrv4;
        y.fpu_reserved1 = x.fpu_reserved1;
        return Promise.resolve(y);
    }
    setFloatState32(x: FloatState32): Promise<{}> {
        let y = new kernel._STRUCT_X86_FLOAT_STATE32();
        y.fpu_fcw = translateEnum(x.fpu_fcw, FpControlFlags, kernel.ThreadStateFlags);
        y.fpu_fsw = translateEnum(x.fpu_fsw, FpStatusFlags, kernel.ThreadStateFlags);
        y.fpu_reserved = [x.fpu_reserved[0], x.fpu_reserved[1]];
        y.fpu_ftw = x.fpu_ftw;
        y.fpu_rsrv1 = x.fpu_rsrv1;
        y.fpu_fop = x.fpu_fop;
        y.fpu_ip = x.fpu_ip;
        y.fpu_cs = x.fpu_cs;
        y.fpu_rsrv2 = x.fpu_rsrv2;
        y.fpu_dp = x.fpu_dp;
        y.fpu_ds = x.fpu_ds;
        y.fpu_rsrv3 = x.fpu_rsrv3;
        y.fpu_mxcsr = x.fpu_mxcsr;
        y.fpu_mxcsrmask = x.fpu_mxcsrmask;
        y.fpu_stmm0 = x.fpu_stmm0;
        y.fpu_stmm1 = x.fpu_stmm1;
        y.fpu_stmm2 = x.fpu_stmm2;
        y.fpu_stmm3 = x.fpu_stmm3;
        y.fpu_stmm4 = x.fpu_stmm4;
        y.fpu_stmm5 = x.fpu_stmm5;
        y.fpu_stmm6 = x.fpu_stmm6;
        y.fpu_stmm7 = x.fpu_stmm7;
        y.fpu_xmm0 = x.fpu_xmm0;
        y.fpu_xmm1 = x.fpu_xmm1;
        y.fpu_xmm2 = x.fpu_xmm2;
        y.fpu_xmm3 = x.fpu_xmm3;
        y.fpu_xmm4 = x.fpu_xmm4;
        y.fpu_xmm5 = x.fpu_xmm5;
        y.fpu_xmm6 = x.fpu_xmm6;
        y.fpu_xmm7 = x.fpu_xmm7;
        y.fpu_rsrv4 = x.fpu_rsrv4;
        y.fpu_reserved1 = x.fpu_reserved1;
        this._setState(kernel.X86_FLOAT_STATE32, kernel._STRUCT_X86_FLOAT_STATE32, y);
        return Promise.resolve();
    }
    getFloatState64(): Promise<FloatState64> {
        let x: any = this._getState(kernel.X86_FLOAT_STATE64, kernel._STRUCT_X86_FLOAT_STATE64)
        let y = new FloatState64();
        y.fpu_fcw = translateEnum(x.fpu_fcw, kernel.ThreadStateFlags, FpControlFlags);
        y.fpu_fsw = translateEnum(x.fpu_fsw, kernel.ThreadStateFlags, FpStatusFlags);
        y.fpu_reserved = [x.fpu_reserved[0], x.fpu_reserved[1]];
        y.fpu_ftw = x.fpu_ftw;
        y.fpu_rsrv1 = x.fpu_rsrv1;
        y.fpu_fop = x.fpu_fop;
        /* x87 FPU Instruction Pointer */
        y.fpu_ip = x.fpu_ip;
        y.fpu_cs = x.fpu_cs;
        y.fpu_rsrv2 = x.fpu_rsrv2;
        /* x87 FPU Instruction Operand(Data) Pointer */
        y.fpu_dp = x.fpu_dp;
        y.fpu_ds = x.fpu_ds;
        y.fpu_rsrv3 = x.fpu_rsrv3;
        y.fpu_mxcsr = x.fpu_mxcsr;
        y.fpu_mxcsrmask = x.fpu_mxcsrmask;
        y.fpu_stmm0 = x.fpu_stmm0;
        y.fpu_stmm1 = x.fpu_stmm1;
        y.fpu_stmm2 = x.fpu_stmm2;
        y.fpu_stmm3 = x.fpu_stmm3;
        y.fpu_stmm4 = x.fpu_stmm4;
        y.fpu_stmm5 = x.fpu_stmm5;
        y.fpu_stmm6 = x.fpu_stmm6;
        y.fpu_stmm7 = x.fpu_stmm7;
        y.fpu_xmm0 = x.fpu_xmm0;
        y.fpu_xmm1 = x.fpu_xmm1;
        y.fpu_xmm2 = x.fpu_xmm2;
        y.fpu_xmm3 = x.fpu_xmm3;
        y.fpu_xmm4 = x.fpu_xmm4;
        y.fpu_xmm5 = x.fpu_xmm5;
        y.fpu_xmm6 = x.fpu_xmm6;
        y.fpu_xmm7 = x.fpu_xmm7;
        y.fpu_xmm8 = x.fpu_xmm8;
        y.fpu_xmm9 = x.fpu_xmm9;
        y.fpu_xmm10 = x.fpu_xmm10;
        y.fpu_xmm11 = x.fpu_xmm11;
        y.fpu_xmm12 = x.fpu_xmm12;
        y.fpu_xmm13 = x.fpu_xmm13;
        y.fpu_xmm14 = x.fpu_xmm14;
        y.fpu_xmm15 = x.fpu_xmm15;
        y.fpu_rsrv4 = x.fpu_rsrv4;
        y.fpu_reserved1 = x.fpu_reserved1;
        return Promise.resolve(y);
    }
    setFloatState64(x: FloatState64): Promise<{}> {
        let y = new kernel._STRUCT_X86_FLOAT_STATE64();
        y.fpu_fcw = translateEnum(x.fpu_fcw, FpControlFlags, kernel.ThreadStateFlags);
        y.fpu_fsw = translateEnum(x.fpu_fsw, FpStatusFlags, kernel.ThreadStateFlags);
        y.fpu_reserved = [x.fpu_reserved[0], x.fpu_reserved[1]];
        y.fpu_ftw = x.fpu_ftw;
        y.fpu_rsrv1 = x.fpu_rsrv1;
        y.fpu_fop = x.fpu_fop;
        /* x87 FPU Instruction Pointer */
        y.fpu_ip = x.fpu_ip;
        y.fpu_cs = x.fpu_cs;
        y.fpu_rsrv2 = x.fpu_rsrv2;
        /* x87 FPU Instruction Operand(Data) Pointer */
        y.fpu_dp = x.fpu_dp;
        y.fpu_ds = x.fpu_ds;
        y.fpu_rsrv3 = x.fpu_rsrv3;
        y.fpu_mxcsr = x.fpu_mxcsr;
        y.fpu_mxcsrmask = x.fpu_mxcsrmask;
        y.fpu_stmm0 = x.fpu_stmm0;
        y.fpu_stmm1 = x.fpu_stmm1;
        y.fpu_stmm2 = x.fpu_stmm2;
        y.fpu_stmm3 = x.fpu_stmm3;
        y.fpu_stmm4 = x.fpu_stmm4;
        y.fpu_stmm5 = x.fpu_stmm5;
        y.fpu_stmm6 = x.fpu_stmm6;
        y.fpu_stmm7 = x.fpu_stmm7;
        y.fpu_xmm0 = x.fpu_xmm0;
        y.fpu_xmm1 = x.fpu_xmm1;
        y.fpu_xmm2 = x.fpu_xmm2;
        y.fpu_xmm3 = x.fpu_xmm3;
        y.fpu_xmm4 = x.fpu_xmm4;
        y.fpu_xmm5 = x.fpu_xmm5;
        y.fpu_xmm6 = x.fpu_xmm6;
        y.fpu_xmm7 = x.fpu_xmm7;
        y.fpu_xmm8 = x.fpu_xmm8;
        y.fpu_xmm9 = x.fpu_xmm9;
        y.fpu_xmm10 = x.fpu_xmm10;
        y.fpu_xmm11 = x.fpu_xmm11;
        y.fpu_xmm12 = x.fpu_xmm12;
        y.fpu_xmm13 = x.fpu_xmm13;
        y.fpu_xmm14 = x.fpu_xmm14;
        y.fpu_xmm15 = x.fpu_xmm15;
        y.fpu_rsrv4 = x.fpu_rsrv4;
        y.fpu_reserved1 = x.fpu_reserved1;
        this._setState(kernel.X86_FLOAT_STATE64, kernel._STRUCT_X86_FLOAT_STATE64, y);
        return Promise.resolve();
    }
    
    getExceptionState(): Promise<ExceptionState> {
        let x: any = this._getState(kernel.X86_EXCEPTION_STATE32, kernel._STRUCT_X86_EXCEPTION_STATE32) ||
                     this._getState(kernel.X86_EXCEPTION_STATE64, kernel._STRUCT_X86_EXCEPTION_STATE64);
        let y = new ExceptionState();
        y.trapno = x.trapno;
        y.err = x.err;
        y.faultvaddr = x.faultvaddr;
        return Promise.resolve(y);
    }
    
    setExceptionState(x: ExceptionState): Promise<{}> {
        let y1 = new kernel._STRUCT_X86_EXCEPTION_STATE32();
        y1.trapno = x.trapno;
        y1.err = x.err;
        y1.faultvaddr = x.faultvaddr;
        if (this._setState(kernel.X86_EXCEPTION_STATE32, kernel._STRUCT_X86_EXCEPTION_STATE32, y1)) {
            let y2 = new kernel._STRUCT_X86_EXCEPTION_STATE64();
            y2.trapno = x.trapno;
            y2.err = x.err;
            y2.faultvaddr = x.faultvaddr;
            this._setState(kernel.X86_EXCEPTION_STATE64, kernel._STRUCT_X86_EXCEPTION_STATE64, y2);
        }
        return Promise.resolve();
    }
    
    getDebugState(): Promise<DebugState> {
        let x: any = this._getState(kernel.X86_DEBUG_STATE32, kernel._STRUCT_X86_DEBUG_STATE32) ||
                     this._getState(kernel.X86_DEBUG_STATE64, kernel._STRUCT_X86_DEBUG_STATE64);
        let y = new DebugState();
        y.dr0 = x.dr0;
        y.dr1 = x.dr1;
        y.dr2 = x.dr2;
        y.dr3 = x.dr3;
        y.dr4 = x.dr4;
        y.dr5 = x.dr5;
        y.dr6 = x.dr6;
        y.dr7 = x.dr7;
        return Promise.resolve(y);
    }
    setDebugState(x: DebugState): Promise<{}> {
        let y1 = new kernel._STRUCT_X86_DEBUG_STATE32();
        y1.dr0 = x.dr0;
        y1.dr1 = x.dr1;
        y1.dr2 = x.dr2;
        y1.dr3 = x.dr3;
        y1.dr4 = x.dr4;
        y1.dr5 = x.dr5;
        y1.dr6 = x.dr6;
        y1.dr7 = x.dr7;
        if (this._setState(kernel.X86_DEBUG_STATE32, kernel._STRUCT_X86_DEBUG_STATE32, y1)) {
            let y2 = new kernel._STRUCT_X86_DEBUG_STATE64();
            y2.dr0 = x.dr0;
            y2.dr1 = x.dr1;
            y2.dr2 = x.dr2;
            y2.dr3 = x.dr3;
            y2.dr4 = x.dr4;
            y2.dr5 = x.dr5;
            y2.dr6 = x.dr6;
            y2.dr7 = x.dr7;
            this._setState(kernel.X86_DEBUG_STATE64, kernel._STRUCT_X86_DEBUG_STATE64, y2);
        }
        return Promise.resolve();
    }
    
    private _getState(stateId: number, stateType: ref.Type): any {
        let value = ref.alloc(stateType);
        let size = ref.alloc('int', stateType.size);
        checkReturn(kernel.functions.thread_get_state(this.id, stateId, value.ref(), size));
        return value;
    }
    
    // Return success
    private _setState(stateId: number, stateType: ref.Type, value: any): boolean {
        try {
            // thread_get_state: [kern_return_t, [thread_act_t, thread_state_flavor_t, thread_state_t, ref.refType(mach_msg_type_number_t)]],
            checkReturn(kernel.functions.thread_set_state(this.id, stateId, value, stateType.size));
            return true;
        } catch (ex) {
            return false;
        }
    }
}
