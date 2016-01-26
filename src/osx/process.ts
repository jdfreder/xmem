const ref = require('ref');
const ArrayType = require('ref-array')
import {IProcessInfo, IProcess} from '../i-process';
import {Memory} from './memory';
import {Thread} from './thread';
import * as kernel from './osx-kernel';
import {checkReturn} from './utils';

export class ProcessInfo implements IProcessInfo {
    public id: number
    public name: string
    
    public open(): Promise<IProcess> {
        let target: number = kernel.functions.mach_task_self();
        let port = ref.alloc('int', 1);
        checkReturn(kernel.functions.task_for_pid(target, this.id, port));
        return Promise.resolve(new Process(this, port.deref()));
    }
}

export class Process implements IProcess {
    public info: ProcessInfo;
    private _taskId: number;
    private _memory: Memory;
    
    constructor(info: ProcessInfo, taskId: number) {
        this._taskId = taskId;
        this._memory = new Memory(taskId);
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
            
            resolve(threadIds.map(threadId => new Thread(threadId)));
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