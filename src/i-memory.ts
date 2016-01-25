export interface IMemory {
    getRegions(): Promise<IMemoryRegion[]>;
    allocateRegion(size: number): Promise<IMemoryRegion>;
    deallocateRegion(address: number, size: number): Promise<{}>;
    changeRegion(address: number, size: number, readable: boolean, writeable: boolean, executable: boolean): Promise<IMemoryRegion>;
    read(address: number, size: number): Promise<Buffer>;
    write(address: number, value: Buffer): Promise<number>;
}

export interface IMemoryRegion {
    address: number;
    size: number;
    writeable: boolean
    readable: boolean;
    executable: boolean;
    shared: boolean;
    reserved: boolean;
}