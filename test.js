// Use to manually test some of the API against a running Atom editor process.

var xmem = require('./lib/index');
xmem.getSystem().getProcess('Atom').then(pinfo => {
    console.log('ProcessInfo', pinfo);
    return pinfo.open();
}).then(p => {
    console.log('Process', p);
    return p.getThreads().then(threads => {
        console.log('Threads', threads);
    }).then(() => p);
}).then(p => {
    return p.memory.getRegions().then(regions => {
        console.log('Regions', regions);
        
        for (var region of regions) {
            if (region.readable && region.writeable) {
                console.log('Selected region:');
                console.log('Address', region.address);
                console.log('Size', region.size);
                
                return p.memory.read(region.address, 4).then(x => {
                    console.log('Read', x);
                    return p.memory.read(region.address, 4);
                }).then(x => {
                    console.log('Read, again', x);
                    var output = Buffer([0x01, 0x02, 0x03, 0x04]);
                    console.log('Writting', output);
                    return p.memory.write(region.address, output);
                }).then(x => {
                    console.log('Written length', x);
                    return p.memory.read(region.address, 4);
                }).then(x => {
                    console.log('Read', x);
                });
            }
        }
    }).then(() => p);
}).then(p => {
    return p.memory.allocateRegion(100).then(r => {
        console.log('allocate', r);
        return r;
    }).then(r => {
        return p.memory.deallocateRegion(r.address, r.size);
    }).then(() => {
        console.log('deallocated');
    }).then(() => p);
}).then(p => {
    return p.memory.allocateRegion(4100).then(r => {
        console.log('allocate', r);
        return p.memory.changeRegion(r.address, r.size, false, false, false);
    }).then(r => {
        console.log('change none', r);
        return p.memory.changeRegion(r.address, r.size, false, false, true);
    }).then(r => {
        console.log('change exec', r);
        return p.memory.changeRegion(r.address, r.size, true, true, true);
    }).then(r => {
        console.log('change all', r);
        return p.memory.deallocateRegion(r.address, r.size);
    }).then(() => {
        console.log('deallocated');
    }).then(() => p);
}).catch(err => {
    console.error('failed', err);
});