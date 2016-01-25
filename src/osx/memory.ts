import {IMemory, IMemoryRegion} from '../i-memory';
import * as kernel from './osx-kernel';
import {checkReturn} from './utils';
const ref = require('ref');

export class Memory implements IMemory {
    private _taskId: number;
    
    constructor(taskId: number) {
        this._taskId = taskId;
    }
    
    getRegions(): Promise<IMemoryRegion[]> {
        let address:number = 0;
        let regions: IMemoryRegion[] = [];
        do {
            try {
                let region = this._getRegion(address);
                address = region.address + region.size;
                regions.push(region);
            } catch (err) {
                break;
            }
        } while (true)
        
        return Promise.resolve(regions);
    }
    
    allocateRegion(size: number): Promise<MemoryRegion> {
        let address = ref.alloc(kernel.mach_vm_offset_t, 0);
        checkReturn(kernel.functions.mach_vm_allocate(this._taskId, address, size, kernel.VM_FLAGS_ANYWHERE));
        return Promise.resolve(this._getRegion(address.deref()));
    }
    
    deallocateRegion(address: number, size: number): Promise<{}> {
        checkReturn(kernel.functions.mach_vm_deallocate(this._taskId, address, size));
        return Promise.resolve();
    }
    
    changeRegion(address: number, size: number, readable: boolean, writeable: boolean, executable: boolean): Promise<MemoryRegion> {
        let flags = kernel.VM_PROT_NONE;
        if (readable) flags = flags | kernel.VM_PROT_READ;
        if (writeable) flags = flags | kernel.VM_PROT_WRITE;
        if (executable) flags = flags | kernel.VM_PROT_EXECUTE;
        checkReturn(kernel.functions.mach_vm_protect(this._taskId, address, size, false, flags));
        return Promise.resolve(this._getRegion(address));
    }
    
    read(address: number, size: number): Promise<Buffer> {
        let buffer = ref.alloc('pointer');
        let bufferLength = ref.alloc(kernel.mach_msg_type_number_t, size);
        checkReturn(kernel.functions.mach_vm_read(this._taskId, address, size, buffer, bufferLength));
        
        let count = bufferLength.deref();
        let data = ref.reinterpret(buffer.deref(), count);
        return Promise.resolve(data);
    }
    
    write(address: number, value: Buffer): Promise<number> {
        checkReturn(kernel.functions.mach_vm_write(this._taskId, address, value, value.length));
        return Promise.resolve(value.length);
    }
    
    private _getRegion(startAddress: number): MemoryRegion {
        let address = ref.alloc(kernel.mach_vm_offset_t, startAddress || 0);
        let size = ref.alloc(kernel.mach_vm_size_t, 0);
        let info = new kernel.vm_region_basic_info_64()
        let count = ref.alloc(kernel.mach_msg_type_number_t, kernel.vm_region_basic_info_64.size);
        let object_name = ref.alloc(kernel.mach_port_t, 0);
        
        checkReturn(kernel.functions.mach_vm_region(this._taskId, address, size, kernel.VM_REGION_BASIC_INFO_64, info.ref(), count, object_name));
        
        let region = new MemoryRegion();
        region.address = address.deref();
        region.size = size.deref();
        region.readable = Boolean(info.protection & kernel.VM_PROT_READ);
        region.writeable = Boolean(info.protection & kernel.VM_PROT_WRITE);
        region.executable = Boolean(info.protection & kernel.VM_PROT_EXECUTE);
        region.shared = info.shared;
        region.reserved = info.reserved;
        return region;
    }
}

export class MemoryRegion implements IMemoryRegion {
    public address: number;
    public size: number;
    public writeable: boolean
    public readable: boolean;
    public executable: boolean;
    public shared: boolean;
    public reserved: boolean;
}