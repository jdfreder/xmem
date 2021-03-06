# xmem API documentation

If you haven't yet installed xmem, view the [README on GitHub](https://github.com/jdfreder/xmem).  

Once xmem is installed, you can import and use it.  For example:  

```javascript
var xmem = require('xmem');
var system = xmem.getSystem();
```

xmem exports a single function `getSystem` which when called returns an [ISystem](interfaces/isystem.html).  Using the `ISystem` instance you can search through running processes, open an individual process, and  begin manipulating its memory.  
