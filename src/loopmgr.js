const events = require("events");

const helper = require("../utils/helper");

class loopmgr extends events {
    static getInst() {
        if (helper.isNullOrUndefined(loopmgr.inst)) {
            loopmgr.inst = new loopmgr();
        }
        return loopmgr.inst;
    }
    constructor() {
        super();

        this._name = 'loopmgr';
        this.modules = {};

        this.on('loopbase.to.loopmgr.finish', (...args)=>{
            //helper.log("["+this._name+"] on.args:", args);
            if (args.length >= 2) {
                let mid = args[0];
                let cfg = args[1];
                helper.log("["+this._name+"] loop delay:", cfg.next_delay/1000, "s");
                setTimeout(()=>{
                    this.makeModule(mid);
                }, cfg.next_delay);
            }
        });
    }
    // cfg = {mod: path of module, next_delay: next delay time/ms}
    register(mid, cfg) {
        this.unregister(mid);

        this.modules[mid] = {cfg, obj:null};

        setTimeout(()=>{
            this.makeModule(mid);
        },0);
    }
    unregister(mid) {
        if (helper.isNullOrUndefined(this.modules[mid])) {
            return;
        }
        if (false == helper.isNullOrUndefined(this.modules[mid].obj)) {
            this.modules[mid].obj.stop();
        }
        delete this.modules[mid];
    }
    makeModule(mid) {
        helper.log("["+this._name+":makeModule](",mid,") >>>>>");
        if (false == helper.isNullOrUndefined(this.modules[mid])) {
            let cfg = this.modules[mid].cfg;
            if (helper.isNullOrUndefined(this.modules[mid].obj)) {
                let mod = require(cfg.mod);
                this.modules[mid].obj = new mod();
            }
            this.modules[mid].obj.setCfg(cfg);
            //helper.log("["+this._name+":makeModule]", this.modules[mid]);
            this.modules[mid].obj.emit('loopmgr.to.loopbase.start', mid, cfg);
        }
    }
}

module.exports = loopmgr;