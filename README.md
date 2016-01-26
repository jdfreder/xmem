# xmem

Xmem is a cross platform process memory manipulation and debugging API.  It provides the following functionality:

- Enumeration of all active processes on the machine  
- Memory read/write access of other processes  
- Memory mapping and permission changing of other processes  
- Process thread enumeration
- Thread management
- Read/write access to processor registers

## Installation

You'll need a copy of Python 2.7 installed on your machine for xmem's dependencies to build correctly.  This is because xmem uses [node-ffi](https://github.com/node-ffi/node-ffi) which uses [node-gyp](https://github.com/nodejs/node-gyp).  
  
To install xmem to your local node_modules folder, run:

```
npm install xmem --save
```

## Usage

See the [API documentation](http://jdfreder.github.io/xmem/docs) for instructions.
