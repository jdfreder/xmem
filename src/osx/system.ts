"use strict";

const child_process = require('child_process');

import {ISystem} from '../i-system';
import {ProcessInfo} from './process';

/**
 * Run a shell command
 * @param  {string} cmd
 * @return {Promise<stdout>} Promise with standard output and error results
 */
function run(cmd: string): Promise<string> {
    return new Promise((res, rej) => {
        child_process.exec(cmd, function(error, stdout, stderr) {
            if (error !== null) {
                rej(error);
            } else {
                res(String(stdout));
            }
        });
    });
}

export class System implements ISystem {
    public getProcesses(): Promise<ProcessInfo[]> {
        return run('ps -A -o pid -o comm').then(stdout => {
            return stdout.split('\n').slice(1).map(row => {
                if (row.trim() === '') {
                    return null;
                }
                
                let pieces = row.trim().split(' ');
                let pid = parseInt(pieces.splice(0, 1)[0]);
                let path = pieces.join(' ');
                let name = path.split('/').slice(-1)[0];
                
                let processInfo = new ProcessInfo();
                processInfo.id = pid;
                processInfo.name = name;
                return processInfo;
            }).filter(x => x !== null);
        });
    }
    
    public getProcess(name: string): Promise<ProcessInfo> {
        return this.getProcesses().then(processes => {
            for (let processInfo of processes) {
                if (processInfo.name === name) {
                    return processInfo;
                }
            }
            throw new Error('Process named "' + name + '" not found');
        });
    }
}