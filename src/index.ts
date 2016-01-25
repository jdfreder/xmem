"use strict";
const os = require('os');
import * as osx from './osx/system';
import {ISystem} from './i-system';

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

// 
// const child_process = require('child_process');
// const ffi = require('ffi');
// const ref = require('ref');
// const Struct = require('ref-struct');
// 
// /**
//  * Run a shell command
//  * @param  {string} cmd
//  * @return {Promise<stdout, stderr>} Promise with standard output and error results
//  */
// function run(cmd) {
//     return new Promise((res, rej) => {
//         child_process.exec(cmd, function(error, stdout, stderr) {
//             if (error !== null) {
//                 rej(error);
//             } else {
//                 res(stdout, stderr);
//             }
//         });
//     });
// }
// 
// var arch = process.arch;
// if (arch==='x64') {
//     console.info('64bit architecture');
// } else if (arch==='x32') {
//     console.info('32bit architecture');
// } else {
//     console.warn('Unknown architecture');
// }
// 
// const VM_REGION_BASIC_INFO_64 = 9;
// const VM_PROT_NONE = 0x00;
// const VM_PROT_READ = 0x01; /* read permission */
// const VM_PROT_WRITE = 0x02; /* write permission */
// const VM_PROT_EXECUTE = 0x04; /* execute permission */
// 
// /*
//  *	The default protection for newly-created virtual memory
//  */
// const VM_PROT_DEFAULT = (VM_PROT_READ|VM_PROT_WRITE);
// 
// /*
//  *	The maximum privileges possible, for parameter checking.
//  */
// 
// const VM_PROT_ALL = (VM_PROT_READ|VM_PROT_WRITE|VM_PROT_EXECUTE);
// 
// var kern_return_t = ref.types.int;
// var memory_object_offset_t = ref.types.ulonglong;
// var vm_inherit_t = ref.types.uint;
// var natural_t = ref.types.uint;
// var mach_msg_type_number_t = natural_t;
// var mach_port_name_t = natural_t;
// var mach_port_t = mach_port_name_t;
// var vm_map_t = mach_port_t;
// var task_t = mach_port_t;
// var thread_act_t = mach_port_t;
// var vm_region_flavor_t = ref.types.int;
// // var vm_region_info_t = ref.types.int;
// var vm_prot_t = ref.types.int;
// var vm_behavior_t = ref.types.int;
// var policy_t = ref.types.int;
// var boolean_t = ref.types.bool;
// var thread_state_flavor_t = ref.types.int;
// 
// 
// if (arch==='x64') {
//     var vm_size_t = ref.types.ulong; // ===uintptr_t?
//     var vm_offset_t = ref.types.ulong;
// } else if (arch==='x32') {
//     var vm_size_t = natural_t;
//     var vm_offset_t = natural_t;
// }
// 
// var vm_address_t = vm_offset_t;
// var pid_t = ref.types.uint;
// 
// var RegionBasicInfoType = Struct({
//     'protection': vm_prot_t,
//     'max_protection': vm_prot_t,
//     'inheritance': vm_inherit_t,
//     'shared': boolean_t,
//     'reserved': boolean_t,
//     'offset': memory_object_offset_t,
//     'behavior': vm_behavior_t,
//     'user_wired_count': ref.types.ushort
// });
// 
// var RegionBasicInfoTypePtr = ref.refType(RegionBasicInfoType);
// 
// var libm = ffi.Library('libc', {
//     // output, input
//     getpid: [pid_t, []], 
//     ptrace: ['int', ['int', pid_t, 'ulong', 'int']], 
//     wait: [pid_t, ['pointer']], 
//     waitpid: [pid_t, [pid_t, 'pointer', 'int']], 
//     mach_task_self: [mach_port_t, []], 
//     task_for_pid: [kern_return_t, [mach_port_name_t, 'int', 'pointer']], 
//     task_threads: [kern_return_t, [task_t, 'pointer', 'pointer']], 
//     kill: ['int', [pid_t, 'int']], 
//     vm_read_overwrite: [kern_return_t, [vm_map_t, vm_address_t, vm_size_t, 'pointer', 'pointer']], 
//     vm_write: [kern_return_t, [vm_map_t, vm_address_t, 'pointer', mach_msg_type_number_t]], 
//     vm_protect: [kern_return_t, [vm_map_t, vm_address_t, vm_size_t, boolean_t, vm_prot_t]], 
//     vm_allocate: [kern_return_t, [vm_map_t, 'pointer', vm_size_t, 'int']], 
//     vm_deallocate: [kern_return_t, [vm_map_t, vm_address_t, vm_size_t]], 
//     thread_resume: [kern_return_t, [thread_act_t]], 
//     thread_suspend: [kern_return_t, [thread_act_t]], 
//     task_suspend: [kern_return_t, ['int']], 
//     task_resume: [kern_return_t, ['int']], 
//     sysctl: ['int', ['pointer', 'int', 'pointer', 'pointer', 'pointer', 'int']], 
//     execv: ['int', ['string', 'pointer']], 
//     mach_error_string: ['string', ['int']],
//     // task, address*, size*, flavor, info, infocount, object_name
//     mach_vm_region: [kern_return_t, [vm_map_t, 'pointer', 'pointer', vm_region_flavor_t, RegionBasicInfoTypePtr, 'pointer', 'pointer']],
//     mach_vm_read: [kern_return_t, [vm_map_t, vm_address_t, vm_size_t, 'pointer', 'pointer']]
// });
// 
// function processMachReturn(returnCode, successReturn) {
//     if (returnCode !== 0) { 
//         let msg = libm.mach_error_string(returnCode);
//         return Promise.reject(new Error('System error ' + String(returnCode) + '\nMessage: ' + msg));
//     } else {
//         return Promise.resolve(successReturn);
//     }
// }
// 
// function createBuffer(type, initialValue) {
//     // so we can all agree that a buffer with the int value written
//     // to it could be represented as an "int *"
//     let buffer = new Buffer(type.size);
//     buffer.writeInt32LE(initialValue || 0, 0);
//     // console.info('Buffer constructed at 0x' + buffer.address().toString(16));
//     buffer.type = type;
//     return buffer;
// }
// 
// function createIntBuffer(initialValue) {
//     // so we can all agree that a buffer with the int value written
//     // to it could be represented as an "int *"
//     let buffer = new Buffer(4);
//     buffer.writeInt32LE(initialValue || 0, 0);
//     // console.info('Buffer constructed at 0x' + buffer.address().toString(16));
//     buffer.type = ref.types.int;
//     return buffer;
// }
// 
// 
// function getPIDs(processName) {
//     if (processName) {
//         return getProcesses().then(processes => {
//             return processes.map(process => {
//                 if (process.name === processName) {
//                     return process.id;
//                 } else {
//                     return null;
//                 }
//             }).filter(pid => pid !== null);
//         });
//     } else {        
//         return Promise.resolve([libm.getpid()]);
//     }
// }
// 
// function getTask(PID) {
//     let target = libm.mach_task_self();
//     // port = FFI::MemoryPointer.new :uint, 1
//     let port = createIntBuffer(1);
//     let r = libm.task_for_pid(target, PID, port);
//     return processMachReturn(r, port.deref());
// }
// 
// function getRegions(task) {
//     let r = libm.task_suspend(task);
//     if (r !== 0) {    
//         return processMachReturn(r, null);
//     }
//     
//     
//     let address = createIntBuffer(0);
//     let size = createIntBuffer(0);
//     let info = new RegionBasicInfoType();
//     let infoCnt = createIntBuffer(RegionBasicInfoType.size);
//     let objectName = createBuffer(mach_port_t, 0);
//     r = libm.mach_vm_region(task, address, size, VM_REGION_BASIC_INFO_64, info.ref(), infoCnt, objectName.ref());
//     if (r !== 0) {
//         return processMachReturn(r, null);
//     } else {
//         let regions = [];
//         while (r === 0) {
//             regions.push({
//                 address: address.deref(), 
//                 size: size.deref(),
//                 readable: Boolean(info.protection & VM_PROT_READ), 
//                 writable: Boolean(info.protection & VM_PROT_WRITE),
//                 executable: Boolean(info.protection & VM_PROT_EXECUTE),
//                 shared: info.shared,
//                 reserved: info.reserved
//             });
//             
//             address = createIntBuffer(address.deref() + size.deref());
//             size = createIntBuffer(0);
//             info = new RegionBasicInfoType();
//             infoCnt = createIntBuffer(RegionBasicInfoType.size);
//             objectName = createBuffer(mach_port_t, 0);
//             r = libm.mach_vm_region(task, address, size, VM_REGION_BASIC_INFO_64, info.ref(), infoCnt, objectName.ref());
//         }
//         
//         r = libm.task_resume(task);
//         if (r !== 0) {    
//             return processMachReturn(r, null);
//         }
//         
//         return Promise.resolve(regions);
//     }
// }
// 
// function readBytes(task, address, size) {
//     let buffer = new Buffer(size);
//     let len = createIntBuffer(size);
//     let r = libm.mach_vm_read(task, address, size, buffer, len);
//     return processMachReturn(r, buffer);
// }
// 
//     // # Reads sz bytes from task's address space starting at addr.
//     // #
//     // # kern_return_t   vm_read_overwrite
//     // #                (vm_task_t                           target_task,
//     // #                 vm_address_t                        address,
//     // #                 vm_size_t                           size,
//     // #                 vm_address_t                        *data_out,
//     // #                 mach_msg_type_number_t              *data_size);
//     // #
//     // # There is no man page for this function.
//     // def vm_read(task, addr, sz=256)
//     //   buf = FFI::MemoryPointer.new(sz)
//     //   len = FFI::MemoryPointer.new(:uint).write_uint(sz)
//     //   r = Libc.vm_read_overwrite(task, addr, sz, buf, len)
//     //   raise KernelCallError.new(:vm_read, r) if r != 0
//     //   buf.read_string(len.read_uint)
//     // end
// 
// function logP(p, msg) {
//     return logErr(p.then(x => {
//         if (msg) console.log(msg);
//         console.log(x);
//         return x;
//     }), msg);
// }
// function logErr(p, msg) {
//     return p.catch(ex=>{
//         if (msg) console.log(msg);
//         console.error(ex);
//     });
// }
// 
// // logP(getProcesses());
// 
// let PIDs = getPIDs();
// logP(PIDs, 'getPIDs');
// 
// PIDs = getPIDs('Cura');
// logP(PIDs, 'getPIDs("Cura")');
// 
// let task = PIDs.then(PIDs=>getTask(PIDs[0]));
// logP(task, 'getTask');
// 
// // task = PIDs.then(PIDs=>getTask(PIDs[0]));
// // logP(task);
// 
// task.then(task=> {
//     // libm.task_suspend(task);
//     
//     let val = getRegions(task);
//     logP(val, 'getRegions');
//     // 
//     // val = val.then(prev=>getRegion(task, prev.address + prev.size));
//     // val = logP(val, 'next getRegion');
//     // 
//     // val = val.then(prev=>getRegion(task, prev.address + prev.size));
//     // val = logP(val, 'next getRegion');
//     // 
//     // val = val.then(prev=>getRegion(task, prev.address + prev.size));
//     // val = logP(val, 'next getRegion');
//     // 
//     // val = val.then(prev=>getRegion(task, prev.address + prev.size));
//     // val = logP(val, 'next getRegion');
//     
//     // libm.task_resume(task);
// });
// 
// 
// // To avoid "(ipc/send) invalid destination port" we need to re-get the task id
// // logP(task.then(task=>readBytes(task,24576,4)), 'read');
// // logP(task.then(task=>readBytes(task,24576,4)), 'read');
// // logP(task.then(task=>readBytes(task,24577,4)), 'read, offset 1');
