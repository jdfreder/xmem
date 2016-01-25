import {IProcessInfo} from './i-process';

/**
 * Represents a running operating system
 */
export interface ISystem {
    
    /**
     * Get a list of the currently running processes
     * @return {Promise<IProcessInfo[]>} processes
     */
    getProcesses(): Promise<IProcessInfo[]>;
    
    /**
     * Try to get a process by name
     * @param  {string}                name name of the process to look for
     * @return {Promise<IProcessInfo>}      process
     */
    getProcess(name: string): Promise<IProcessInfo>;
}
