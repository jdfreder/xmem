import {IMemory} from './i-memory';
import {IThread} from './i-thread';
import {BreakpointController} from './breakpoint-controller';

export interface IProcess {
    info: IProcessInfo;
    memory: IMemory;
    breakpoints: BreakpointController;
    
    getThreads(): Promise<IThread[]>;
    pause(): Promise<{}>;
    resume(): Promise<{}>;
}

export interface IProcessInfo {
   processId: number;
   processName: string;
   open(writeAccess?: boolean): Promise<IProcess>;
}
