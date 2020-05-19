# loopservice
 A simple loop service frame work.

# How to code?
Key codes of example_loopservice.js:

    const loopmgr = require("./src/loopmgr");

    // register(module_id, cfg)
    loopmgr.getInst().register('do1er', {mod:path.resolve(__dirname,"./do1er.js"), next_delay:10*1000});
    //loopmgr.getInst().register('do2er', {mod:path.resolve(__dirname,"./do2er.js"), next_delay:30*1000});
    //loopmgr.getInst().register('do3er', {mod:path.resolve(__dirname,"./do3er.js"), next_delay:90*1000});

Key codes of do1erjs:

    doWork(callback) {
        helper.logYellow("["+this._name+"] doWork() >>>>>");
        helper.logYellow("["+this._name+"]", "hello world!");
        callback();
    }


# How to run it?
Install node.js first.

windows>node example_loopservice.js

linux>nohup node example_loopservice.js </dev/null >/dev/null 2>err.error &

