"use strict";

const ffi = require('ffi');
const ref = require('ref');
const Struct = require('ref-struct');
const arch = require('../arch');
const ArrayType = require('ref-array')

// CONSTANTS ///////////////////////////////////////////////////////////////////
export const VM_PROT_NONE = 0x00;
export const VM_PROT_READ = 0x01; /* read permission */
export const VM_PROT_WRITE = 0x02; /* write permission */
export const VM_PROT_EXECUTE = 0x04; /* execute permission */
// The default protection for newly-created virtual memory
export const VM_PROT_DEFAULT = (VM_PROT_READ|VM_PROT_WRITE);
// The maximum privileges possible, for parameter checking.
export const VM_PROT_ALL = (VM_PROT_READ|VM_PROT_WRITE|VM_PROT_EXECUTE);
export const VM_REGION_BASIC_INFO_64 = 9;
// Behavior identifiers
export const VM_BEHAVIOR_DEFAULT = 0;	/* default */
export const VM_BEHAVIOR_RANDOM = 1;	/* random */
export const VM_BEHAVIOR_SEQUENTIAL = 2;	/* forward sequential */
export const VM_BEHAVIOR_RSEQNTL = 3;	/* reverse sequential */
// The following "behaviors" affect the memory region only at the time of the
// call and are not stored in the VM map entry.
export const VM_BEHAVIOR_WILLNEED = 4;	/* will need in near future */
export const VM_BEHAVIOR_DONTNEED = 5;	/* dont need in near future */
export const VM_BEHAVIOR_FREE = 6;	/* free memory without write-back */
export const VM_BEHAVIOR_ZERO_WIRED_PAGES = 7;	/* zero out the wired pages of an entry if it is being deleted without unwiring them first */
export const VM_BEHAVIOR_REUSABLE = 8;
export const VM_BEHAVIOR_REUSE = 9;
export const VM_BEHAVIOR_CAN_REUSE = 10;
export const VM_BEHAVIOR_PAGEOUT = 11;
// Virtual memory map inheritance; values for vm_inherit_t
export const VM_INHERIT_SHARE = 0;       /* share with child */
export const VM_INHERIT_COPY = 1;        /* copy into child */
export const VM_INHERIT_NONE = 2;        /* absent from child */
export const VM_INHERIT_DONATE_COPY = 3; /* copy and delete */
export const VM_INHERIT_DEFAULT = VM_INHERIT_COPY;     
export const VM_INHERIT_LAST_VALID = VM_INHERIT_NONE;  
// Flags used for memory allocation
export const VM_FLAGS_FIXED = 0x0000;
export const VM_FLAGS_ANYWHERE = 0x0001;
export const VM_FLAGS_PURGABLE = 0x0002;
export const VM_FLAGS_NO_CACHE = 0x0010;
export const VM_FLAGS_BELOW_MIN = 0x0080;	/* map below the map's min offset */
export const VM_FLAGS_PERMANENT = 0x0100;	/* mapping can NEVER be unmapped */
export const VM_FLAGS_GUARD_AFTER = 0x0200;	/* guard page after the mapping */
export const VM_FLAGS_GUARD_BEFORE = 0x0400;	/* guard page before the mapping */
export const VM_FLAGS_SUBMAP = 0x0800;	/* mapping a VM submap */
export const VM_FLAGS_ALREADY = 0x1000;	/* OK if same mapping already exists */
export const VM_FLAGS_BEYOND_MAX = 0x2000;	/* map beyond the map's max offset */
export const VM_FLAGS_OVERWRITE = 0x4000;	/* delete any existing mappings first */
export const VM_FLAGS_NO_PMAP_CHECK = 0x8000;	/* do not check that pmap is empty */
// Generic definition for machine-dependent thread status.
export const THREAD_STATE_FLAVOR_LIST = 0;	/* List of valid flavors */
export const THREAD_STATE_FLAVOR_LIST_NEW = 128;
export const THREAD_STATE_FLAVOR_LIST_10_9 = 129;
// Register states
export const X86_THREAD_STATE32 = 1;
export const X86_FLOAT_STATE32 = 2;
export const X86_EXCEPTION_STATE32 = 3;
export const X86_DEBUG_STATE32 = 10;
export const X86_THREAD_STATE64 = 4;
export const X86_FLOAT_STATE64 = 5;
export const X86_EXCEPTION_STATE64 = 6;
export const X86_DEBUG_STATE64 = 11;
// Factory requests (return 32 or 64 bit structure)
export const X86_THREAD_STATE = 7;
export const X86_FLOAT_STATE = 8;
export const X86_EXCEPTION_STATE = 9;
export const X86_DEBUG_STATE = 12;
export const THREAD_STATE_NONE = 13;
// Depricated
export const I386_THREAD_STATE = X86_THREAD_STATE32;
export const I386_FLOAT_STATE = X86_FLOAT_STATE32;
export const I386_EXCEPTION_STATE = X86_EXCEPTION_STATE32;
export enum ThreadStateFlags {
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
// TYPES ///////////////////////////////////////////////////////////////////////
export const vm_size_t = arch.pointerType;
export const vm_offset_t = arch.pointerType;
export const vm_prot_t = ref.types.int;
export const vm_inherit_t = ref.types.uint;
export const memory_object_offset_t = ref.types.ulonglong;
export const memory_object_size_t = ref.types.ulonglong;
export const vm_behavior_t = ref.types.uint;
export const natural_t = ref.types.uint;
export const mach_port_name_t = natural_t;
export const mach_port_t = mach_port_name_t;
export const vm_map_t = mach_port_t;
export const mach_vm_offset_t = vm_offset_t; // True?
export const mach_vm_size_t = vm_size_t; // True?
export const vm_region_flavor_t = ref.types.int;
export const mach_msg_type_number_t = natural_t;
export const kern_return_t = ref.types.int;
export const mach_error_t = kern_return_t;
export const thread_act_t = mach_port_t;
export const thread_act_array_t = ArrayType(thread_act_t) // ref.refType(thread_act_t);
export const thread_act_port_array_t = thread_act_array_t;
export const mach_vm_address_t = mach_vm_offset_t;
export const boolean_t = ref.types.bool;
// thread_state_flavor_t, thread_state_t
export const thread_state_t = ref.refType(natural_t); /* Variable-length array */
export const thread_state_flavor_t = ref.types.int;
// STRUCTURES //////////////////////////////////////////////////////////////////
export const vm_region_basic_info_64 = Struct({
    'protection': vm_prot_t,
    'max_protection': vm_prot_t,
    'inheritance': vm_inherit_t,
    'shared': ref.types.bool,
    'reserved': ref.types.bool,
    'offset': memory_object_offset_t,
    'behavior': vm_behavior_t,
    'user_wired_count': ref.types.ushort
});
export const vm_region_info_t = ref.refType(vm_region_basic_info_64);

export const x86_state_hdr = Struct({
    flavor: 'int',
    count: 'int'
});
export const x86_state_hdr_t = ref.refType(x86_state_hdr);

export const _STRUCT_X86_THREAD_STATE32 = Struct({
    eax: 'uint',
    ebx: 'uint',
    ecx: 'uint',
    edx: 'uint',
    edi: 'uint',
    esi: 'uint',
    ebp: 'uint',
    esp: 'uint',
    ss: 'uint',
    eflags: 'uint',
    eip: 'uint',
    cs: 'uint',
    ds: 'uint',
    es: 'uint',
    fs: 'uint',
    gs: 'uint'
});
export const _STRUCT_X86_THREAD_STATE32_t = ref.refType(_STRUCT_X86_THREAD_STATE32);

export const _STRUCT_X86_THREAD_STATE64 = Struct({
    rax: 'uint64_t',
    rbx: 'uint64_t',
    rcx: 'uint64_t',
    rdx: 'uint64_t',
    rdi: 'uint64_t',
    rsi: 'uint64_t',
    rbp: 'uint64_t',
    rsp: 'uint64_t',
    r8: 'uint64_t',
    r9: 'uint64_t',
    r10: 'uint64_t',
    r11: 'uint64_t',
    r12: 'uint64_t',
    r13: 'uint64_t',
    r14: 'uint64_t',
    r15: 'uint64_t',
    rip: 'uint64_t',
    rflags: 'uint64_t',
    cs: 'uint64_t',
    fs: 'uint64_t',
    gs: 'uint64_t'
});
export const _STRUCT_X86_THREAD_STATE64_t = ref.refType(_STRUCT_X86_THREAD_STATE64);

export const _STRUCT_X86_DEBUG_STATE32 = Struct({
    dr0: 'uint',
    dr1: 'uint',
    dr2: 'uint',
    dr3: 'uint',
    dr4: 'uint',
    dr5: 'uint',
    dr6: 'uint',
    dr7: 'uint'
});
export const _STRUCT_X86_DEBUG_STATE32_t = ref.refType(_STRUCT_X86_DEBUG_STATE32);

export const _STRUCT_X86_DEBUG_STATE64 = Struct({
    dr0: 'uint64_t',
    dr1: 'uint64_t',
    dr2: 'uint64_t',
    dr3: 'uint64_t',
    dr4: 'uint64_t',
    dr5: 'uint64_t',
    dr6: 'uint64_t',
    dr7: 'uint64_t'
});
export const _STRUCT_X86_DEBUG_STATE64_t = ref.refType(_STRUCT_X86_DEBUG_STATE64);

export const _STRUCT_X86_EXCEPTION_STATE32 = Struct({
    trapno: 'uint',
    err: 'uint',
    faultvaddr: 'uint'
});
export const _STRUCT_X86_EXCEPTION_STATE32_t = ref.refType(_STRUCT_X86_EXCEPTION_STATE32);

export const _STRUCT_X86_EXCEPTION_STATE64 = Struct({
    trapno: 'uint',
    err: 'uint',
    faultvaddr: 'uint64_t'
});
export const _STRUCT_X86_EXCEPTION_STATE64_t = ref.refType(_STRUCT_X86_EXCEPTION_STATE64);

export const _STRUCT_MMST_REG = Struct({
    mmst_reg: 'char[10]',
    mmst_rsrv: 'char[6]',
});
export const _STRUCT_MMST_REG_t = ref.refType(_STRUCT_MMST_REG);

export const _STRUCT_XMM_REG = Struct({
    xmm_reg: 'char[16]',
});
export const _STRUCT_XMM_REG_t = ref.refType(_STRUCT_XMM_REG);

export const _STRUCT_X86_FLOAT_STATE32 = Struct({
    fpu_reserved: 'int[2]',
    fpu_fcw: 'uint16_t',
    fpu_fsw: 'uint16_t',
    fpu_ftw: 'uint8_t', /* x87 FPU tag word */
    fpu_rsrv1: 'uint8_t', /* reserved */ 
    fpu_fop: 'uint16_t', /* x87 FPU Opcode */
    fpu_ip: 'uint32_t', /* x87 FPU Instruction Pointer offset */
    fpu_cs: 'uint16_t', /* x87 FPU Instruction Pointer Selector */
    fpu_rsrv2: 'uint16_t', /* reserved */
    fpu_dp: 'uint32_t', /* x87 FPU Instruction Operand(Data) Pointer offset */
    fpu_ds: 'uint16_t', /* x87 FPU Instruction Operand(Data) Pointer Selector */
    fpu_rsrv3: 'uint16_t', /* reserved */
    fpu_mxcsr: 'uint32_t', /* MXCSR Register state */
    fpu_mxcsrmask: 'uint32_t', /* MXCSR mask */
    fpu_stmm0: _STRUCT_MMST_REG, /* ST0/MM0   */
    fpu_stmm1: _STRUCT_MMST_REG, /* ST1/MM1  */
    fpu_stmm2: _STRUCT_MMST_REG, /* ST2/MM2  */
    fpu_stmm3: _STRUCT_MMST_REG, /* ST3/MM3  */
    fpu_stmm4: _STRUCT_MMST_REG, /* ST4/MM4  */
    fpu_stmm5: _STRUCT_MMST_REG, /* ST5/MM5  */
    fpu_stmm6: _STRUCT_MMST_REG, /* ST6/MM6  */
    fpu_stmm7: _STRUCT_MMST_REG, /* ST7/MM7  */
    fpu_xmm0: _STRUCT_XMM_REG, /* XMM 0  */
    fpu_xmm1: _STRUCT_XMM_REG, /* XMM 1  */
    fpu_xmm2: _STRUCT_XMM_REG, /* XMM 2  */
    fpu_xmm3: _STRUCT_XMM_REG, /* XMM 3  */
    fpu_xmm4: _STRUCT_XMM_REG, /* XMM 4  */
    fpu_xmm5: _STRUCT_XMM_REG, /* XMM 5  */
    fpu_xmm6: _STRUCT_XMM_REG, /* XMM 6  */
    fpu_xmm7: _STRUCT_XMM_REG, /* XMM 7  */
    fpu_rsrv4: 'char[' + String(14*16) + ']', /* reserved */
    fpu_reserved1: 'int'
});
export const _STRUCT_X86_FLOAT_STATE32_t = ref.refType(_STRUCT_X86_FLOAT_STATE32);

export enum fpu_fcw_enum {
    
}

export enum fpu_fsw_enum {
    
}

export const _STRUCT_X86_FLOAT_STATE64 = Struct({
    fpu_reserved: 'int[2]',
    fpu_fcw: 'int16_t', /* x87 FPU control word */
    fpu_fsw: 'int16_t', /* x87 FPU status word */
    fpu_ftw: 'int8_t', /* x87 FPU tag word */
    fpu_rsrv1: 'int8_t', /* reserved */ 
    fpu_fop: 'int16_t', /* x87 FPU Opcode */
    /* x87 FPU Instruction Pointer */
    fpu_ip: 'int32_t', /* offset */
    fpu_cs: 'int16_t', /* Selector */
    fpu_rsrv2: 'int16_t', /* reserved */
    /* x87 FPU Instruction Operand(Data) Pointer */
    fpu_dp: 'int32_t', /* offset */
    fpu_ds: 'int16_t', /* Selector */
    fpu_rsrv3: 'int16_t', /* reserved */
    fpu_mxcsr: 'int32_t', /* MXCSR Register state */
    fpu_mxcsrmask: 'int32_t', /* MXCSR mask */
    fpu_stmm0: _STRUCT_MMST_REG, /* ST0/MM0   */
    fpu_stmm1: _STRUCT_MMST_REG, /* ST1/MM1  */
    fpu_stmm2: _STRUCT_MMST_REG, /* ST2/MM2  */
    fpu_stmm3: _STRUCT_MMST_REG, /* ST3/MM3  */
    fpu_stmm4: _STRUCT_MMST_REG, /* ST4/MM4  */
    fpu_stmm5: _STRUCT_MMST_REG, /* ST5/MM5  */
    fpu_stmm6: _STRUCT_MMST_REG, /* ST6/MM6  */
    fpu_stmm7: _STRUCT_MMST_REG, /* ST7/MM7  */
    fpu_xmm0: _STRUCT_XMM_REG, /* XMM 0  */
    fpu_xmm1: _STRUCT_XMM_REG, /* XMM 1  */
    fpu_xmm2: _STRUCT_XMM_REG, /* XMM 2  */
    fpu_xmm3: _STRUCT_XMM_REG, /* XMM 3  */
    fpu_xmm4: _STRUCT_XMM_REG, /* XMM 4  */
    fpu_xmm5: _STRUCT_XMM_REG, /* XMM 5  */
    fpu_xmm6: _STRUCT_XMM_REG, /* XMM 6  */
    fpu_xmm7: _STRUCT_XMM_REG, /* XMM 7  */
    fpu_xmm8: _STRUCT_XMM_REG, /* XMM 8  */
    fpu_xmm9: _STRUCT_XMM_REG, /* XMM 9  */
    fpu_xmm10: _STRUCT_XMM_REG, /* XMM 10  */
    fpu_xmm11: _STRUCT_XMM_REG, /* XMM 11 */
    fpu_xmm12: _STRUCT_XMM_REG, /* XMM 12  */
    fpu_xmm13: _STRUCT_XMM_REG, /* XMM 13  */
    fpu_xmm14: _STRUCT_XMM_REG, /* XMM 14  */
    fpu_xmm15: _STRUCT_XMM_REG, /* XMM 15  */
    fpu_rsrv4: 'char[' + String(6*16) + ']', /* reserved */
    fpu_reserved1: 'int'
});
export const _STRUCT_X86_FLOAT_STATE64_t = ref.refType(_STRUCT_X86_FLOAT_STATE64);
   
// FUNCTIONS ///////////////////////////////////////////////////////////////////
let libDefinitions = {
    // vm_map_t		 map,
    // mach_vm_offset_t	*address,		/* IN/OUT */
    // mach_vm_size_t	*size,			/* OUT */
    // vm_region_flavor_t	 flavor,		/* IN */
    // vm_region_info_t	 info,			/* OUT */
    // mach_msg_type_number_t	*count,			/* IN/OUT */
    // mach_port_t		*object_name)		/* OUT */
    mach_vm_region: [kern_return_t, [vm_map_t, ref.refType(mach_vm_offset_t), ref.refType(mach_vm_size_t), vm_region_flavor_t, vm_region_info_t, ref.refType(mach_msg_type_number_t), ref.refType(mach_port_t)]],
    // 
    mach_error_string: ['string', [mach_error_t]],
    //
    mach_task_self: [mach_port_t, []], 
    // mach_port_name_t target_tport,
    // int pid,
    // mach_port_name_t *t);
    task_for_pid: [kern_return_t, [mach_port_name_t, 'int', ref.refType(mach_port_name_t)]], 
    //
    task_suspend: [kern_return_t, [mach_port_name_t]],
    //
    task_resume: [kern_return_t, [mach_port_name_t]], 
    // task_t task,
    // thread_act_port_array_t thread_list,
    // mach_msg_type_number_t* thread_count);
    // task_threads: [kern_return_t, [mach_port_name_t, thread_act_port_array_t, ref.refType(mach_msg_type_number_t)]]
    task_threads: [kern_return_t, [mach_port_name_t, 'uint **', ref.refType(mach_msg_type_number_t)]],
	// vm_map_t		map,
	// mach_vm_address_t	addr,
	// mach_vm_size_t	size,
	// pointer_t		*data,
	// mach_msg_type_number_t	*data_size)
    mach_vm_read: [kern_return_t, [vm_map_t, mach_vm_address_t, mach_vm_size_t, 'pointer', ref.refType(mach_msg_type_number_t)]],
    // vm_map_t			map,
	// mach_vm_address_t		address,
	// pointer_t			data,
	// __unused mach_msg_type_number_t	size)
    mach_vm_write: [kern_return_t, [vm_map_t, mach_vm_address_t, 'pointer', mach_msg_type_number_t]],
    // vm_map_t		map,
    // mach_vm_offset_t	*addr,
    // mach_vm_size_t	size,
    // int			flags)
    mach_vm_allocate: [kern_return_t, [vm_map_t, ref.refType(mach_vm_offset_t), mach_vm_size_t, 'int']],
    // vm_map_t		map,
	// mach_vm_offset_t	start,
	// mach_vm_size_t	size)
    mach_vm_deallocate: [kern_return_t, [vm_map_t, mach_vm_offset_t, mach_vm_size_t]],
    // mach_port_name_t task,
	// mach_vm_address_t address,
	// mach_vm_size_t size,
	// boolean_t set_maximum,
	// vm_prot_t new_protection)
	mach_vm_protect: [kern_return_t, [mach_port_name_t, mach_vm_address_t, mach_vm_size_t, boolean_t, vm_prot_t]],
    //
    thread_resume: [kern_return_t, [thread_act_t]], 
    //
    thread_suspend: [kern_return_t, [thread_act_t]], 
    //
    thread_terminate: [kern_return_t, [thread_act_t]], 
    // Returns  a thread's registers for given a thread id
    // 
    // kern_return_t   thread_get_state
    //                (thread_act_t                     target_thread,
    //                 thread_state_flavor_t                   flavor,
    //                 thread_state_t                       old_state,
    //                 mach_msg_type_number_t         *old_state_count);
    thread_get_state: [kern_return_t, [thread_act_t, thread_state_flavor_t, thread_state_t, ref.refType(mach_msg_type_number_t)]],
    // Sets the register state of thread.
    //
    // kern_return_t   thread_set_state
    //                (thread_act_t                     target_thread,
    //                 thread_state_flavor_t                   flavor,
    //                 thread_state_t                       new_state,
    //                 mach_msg_type_number_t         new_state_count);
    thread_set_state: [kern_return_t, [thread_act_t, thread_state_flavor_t, thread_state_t, mach_msg_type_number_t]],
};
export let functions: any = ffi.Library('libc', libDefinitions);

// For standard JS, export all of the FFI functions.
for (let functionName of Object.keys(libDefinitions)) {
    exports[functionName] = functions[functionName];
}
