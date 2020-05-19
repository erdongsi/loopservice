const path = require("path");

const helper = require("./utils/helper");
const cmd = require("./utils/cmd");
const logs = require("./utils/logs");

const loopmgr = require("./src/loopmgr");

const mycmd = require("./mycmd");

logs.getInst().setID("example_loopservice",2);

// 0.make mycmd
cmd.start(mycmd.doCmd);

// register(module_id, cfg)
loopmgr.getInst().register('do1er', {mod:path.resolve(__dirname,"./do1er.js"), next_delay:10*1000});
//loopmgr.getInst().register('do2er', {mod:path.resolve(__dirname,"./do2er.js"), next_delay:30*1000});
//loopmgr.getInst().register('do3er', {mod:path.resolve(__dirname,"./do3er.js"), next_delay:90*1000});