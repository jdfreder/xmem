import {IMemory} from './i-memory';
import {IThread} from './i-thread';
import {BreakpointController} from './breakpoint-controller';

/**
 * An opened process
 *
 * Allow reading and writing of memory in a process.  Also allows for the
 * process to be debugged.  You can obtain a process by calling 
 * `ProcessInfo.open`.
 */
export interface IProcess {
    /**
     * Public description of this process
     * @type {IProcessInfo}
     */
    info: IProcessInfo;
    
    /**
     * Access to the memory of the process
     * @type {IMemory}
     */
    memory: IMemory;
    
    /**
     * Gets the threads of the process
     * @return {Promise<IThread[]>} threads
     */
    getThreads(): Promise<IThread[]>;
    
    /**
     * Pauses the process
     * @return {Promise} success
     */
    pause(): Promise<{}>;
    
    /**
     * Resumes the process (for processes that are paused)
     * @return {Promise} success
     */
    resume(): Promise<{}>;
}

/**
 * Information used to describe process
 *
 * Information that is available without opening the process
 */
export interface IProcessInfo {
    
    /**
     * Id of the process
     * @type {number}
     */
    id: number;
    
    /**
     * Name of the process
     * @type {string}
     */
    name: string;
    
    /**
     * Open the process for reading, writing, and debugging.
     * @return {Promise<IProcess>} process
     */
    open(): Promise<IProcess>;
}
