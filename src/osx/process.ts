const ref = require('ref');
const ArrayType = require('ref-array')
import {IProcessInfo, IProcess} from '../i-process';
import {BreakpointController} from '../breakpoint-controller';
import {Memory} from './memory';
import {Thread} from './thread';
import * as kernel from './osx-kernel';
import {checkReturn} from './utils';

export class ProcessInfo implements IProcessInfo {
    public processId: number
    public processName: string
    
    public open(writeAccess?: boolean): Promise<IProcess> {
        let target: number = kernel.functions.mach_task_self();
        let port = ref.alloc('int', 1);
        checkReturn(kernel.functions.task_for_pid(target, this.processId, port));
        return Promise.resolve(new Process(this, port.deref()));
    }
}

export class Process implements IProcess {
    public info: ProcessInfo;
    private _taskId: number;
    private _memory: Memory;
    private _breakpoints: BreakpointController;
    
    constructor(info: ProcessInfo, taskId: number) {
        this._taskId = taskId;
        this._memory = new Memory(taskId);
        this._breakpoints = new BreakpointController(this._memory);
    }
    
    get breakpoints(): BreakpointController {
        return this._breakpoints;
    }
    
    get memory(): Memory {
        return this._memory;
    }
    
    getThreads(): Promise<Thread[]> {
        return new Promise(resolve => {
            let countPtr = ref.alloc('int', 0);
            let dataPtr = ref.alloc('uint *');
            
            checkReturn(kernel.functions.task_threads(this._taskId, dataPtr, countPtr));
            let count = countPtr.deref();
            let data = ref.reinterpret(dataPtr.deref(), count * 4);
            
            var UIntArray = ArrayType('uint');
            let threadIds = Array.prototype.concat.apply([], new UIntArray(data));
            
            resolve(threadIds.map(threadId => new Thread(threadId, this._breakpoints)));
        });
    }
    
    pause(): Promise<{}> {
        return new Promise(resolve => {
            checkReturn(kernel.functions.task_suspend(this._taskId));
            resolve();
        });
    }
    resume(): Promise<{}> {
        return new Promise(resolve => {
            checkReturn(kernel.functions.task_resume(this._taskId));
            resolve();
        });
    }
}