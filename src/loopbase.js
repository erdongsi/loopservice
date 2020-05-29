const events = require("events");

const helper = require("../utils/helper");

const loopmgr = require("./loopmgr");

class loopbase extends events {
    constructor(name) {
        super();

        this._name = name;
        this._fstop = 0;
        this._cfg = {};

        this.on('loopmgr.to.loopbase.start', async (...args)=>{
            helper.log("["+this._name+"] on.args:", args);
            if (this._fstop != 0) {
                return;
            }
            if (args.length >= 2) {
                let name = args[0];
                let cfg = args[1];

                helper.log("["+this._name+"] name:", name, "cfg:", cfg);
                await new Promise((resolve,reject)=>{
                    this.doWork(this._cfg, (e,r)=>{
                        resolve(r);
                    });
                });

                if (this._fstop == 0) {
                    loopmgr.getInst().emit('loopbase.to.loopmgr.finish', name, cfg);
                }
            }
        });
    }
    setCfg(cfg) {
        this._cfg = cfg;
    }
    doWork(cfg, callback) {
        helper.log("["+this._name+"] doWork(",cfg,",callback) >>>>>");
        if (this._fstop != 0) {
            return;
        }
        callback();
    }
    stop() {
        helper.log("["+this._name+"] stop() >>>>>");
        this._fstop = 1;
    }
}

module.exports = loopbase;