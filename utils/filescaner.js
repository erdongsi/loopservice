// 扫描 某个 可访问 文件夹，对 每个文件 进行处理。

const fs = require("fs");
const path = require("path");

const helper = require("./helper");

let cancel = false;

// 递归扫描目录, 对文件进行 filetodo处理, 结束会以callback返回
// filetodo: function(file_info); file_info ={path:..., mtimeMs:..., mtime:...}
async function make(folder, filetodo, callback, excludefolders) {
    //helper.log("[filescaner:make] (",folder+",", "filetodo, callback) >>>>>");

    if (helper.isNullOrUndefined(excludefolders)) {
        excludefolders = [];
    }

    cancel = false;

    if (fs.existsSync(folder)) {
        if (excludefolders.indexOf(path.parse(folder).base) < 0) {
            let objs = fs.readdirSync(folder);
            if (false == helper.isNullOrUndefined(objs)) {
                for (let i = 0; i < objs.length; i++) {
                    //helper.log(i,"cancel:",cancel);
                    if (cancel) { 
                        break; 
                    }
                    
                    let obj = objs[i];
                    let obj_path = path.join(folder, obj);
                    let state = null;
                    await new Promise((resolve,reject)=>{
                        fs.stat(obj_path, (e_stat,r_stat)=>{
                            if (e_stat) {
                                helper.logRed("[filescaner:make]",obj_path,"e_stat:", e_stat.message);
                            } else {
                                state = r_stat;
                            }
                            resolve();
                        });
                    });
                    //let state = fs.statSync(obj_path);
                    if (false == helper.isNullOrUndefined(state)) {
                        if (state.isFile()) {
                            await new Promise((resolve,reject)=>{
                                filetodo({path:obj_path, state, index:i}, (c)=>{
                                    if (c) {
                                        cancel=true;
                                    }
                                    resolve();
                                });
                            });
                        } else if (state.isDirectory()) {
                            //helper.log(obj_path, state.mtimeMs, state.mtime);
                            await new Promise((resolve,reject)=>{
                                make(obj_path, filetodo, ()=>{ resolve(); }, excludefolders);
                            });
                        }
                    }
                }
            }
        } else {
            helper.logYellow("[filescaner:make] skip", folder, "from", excludefolders);
        }
    }

    callback();
}

exports.make = make;