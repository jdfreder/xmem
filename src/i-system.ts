import {IProcessInfo} from './i-process';

export interface ISystem {
    getProcesses(): Promise<IProcessInfo[]>;
    getProcess(name: string): Promise<IProcessInfo>;
}
