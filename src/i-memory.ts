/**
 * Manages the memory of a process
 */
export interface IMemory {
    
    /**
     * Get the memory regions of the process
     * @return {Promise<IMemoryRegion[]>} regions
     */
    getRegions(): Promise<IMemoryRegion[]>;
    
    /**
     * Allocate memory in the region.
     *
     * The memory that is allocate is not guaranteed to be the exact size that
     * you request.  The system may allocate more memory.  Additionally, the
     * readable, writeable, and executable flags are not guaranteed to be any
     * particular values.  Use `changeRegion` to adjust the flags to your needs.
     * @param  {number}                 size minimum byte length of the region
     *                                       to be allocated.
     * @return {Promise<IMemoryRegion>}      the allocated memory region
     */
    allocateRegion(size: number): Promise<IMemoryRegion>;
    
    /**
     * Deallocates the specified memory
     * @param  {number}  address start address of the memory to deallocate
     * @param  {number}  size    byte length of the memory to deallocate
     * @return {Promise}         success
     */
    deallocateRegion(address: number, size: number): Promise<{}>;
    
    /**
     * Changes the memory access permissions of the specified memory
     * @param  {number}                 address    start address of the memory
     *                                             to change
     * @param  {number}                 size       byte length of the memory to
     *                                             change
     * @param  {boolean}                readable
     * @param  {boolean}                writeable
     * @param  {boolean}                executable
     * @return {Promise<IMemoryRegion>} changed region
     */
    changeRegion(address: number, size: number, readable: boolean, writeable: boolean, executable: boolean): Promise<IMemoryRegion>;
    
    /**
     * Read bytes from the process memory
     *
     * This call will fail if the region is not readable.  You may need to
     * change the region's access flags to readable using the `changeRegion`
     * method.
     * @param  {number}          address address to read from
     * @param  {number}          size    number of bytes to read
     * @return {Promise<Buffer>}         read bytes
     */
    read(address: number, size: number): Promise<Buffer>;
    
    /**
     * Write bytes to the process memory
     *
     * This call will fail if the region is not writeable.  You may need to 
     * change the region's access flags to writeable using the `changeRegion`
     * method.
     * @param  {number}          address address to write to
     * @param  {Buffer}          value   bytes to be written
     * @return {Promise<number>}         number of bytes written
     */
    write(address: number, value: Buffer): Promise<number>;
}

/**
 * Defines a region of memory
 */
export interface IMemoryRegion {
    /**
     * Begining of the region
     * @type {number}
     */
    address: number;
    /**
     * Byte length of the region
     * @type {number}
     */
    size: number;
    /**
     * Whether the region can be written to
     * @type {boolean}
     */
    writeable: boolean
    /**
     * Whether the region can be read from
     * @type {boolean}
     */
    readable: boolean;
    /**
     * Whether the bytes in the region can be executed as byte code
     * @type {boolean}
     */
    executable: boolean;
    /**
     * Whether the region is shared with other processes
     * @type {boolean}
     */
    shared: boolean;
    /**
     * Whether the region is reserved
     * @type {boolean}
     */
    reserved: boolean;
}