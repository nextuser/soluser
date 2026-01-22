//const {config}= require('dotenv');
//config({debug:false});
const path = require('path');

let debugEnable = false;
if(process.env.DEBUG){
    //console.log("enable debug logging");
    debugEnable = true;
}

function prevLine(index = 1) {
  const obj = {};
  Error.captureStackTrace(obj, prevLine); // 排除本函数的栈信息
  const stackLine = obj.stack.split('\n')[index];
  const [file_str, lineNumber] = stackLine.split(':');

  //console.log("file:",file_str,"lineNumber:",lineNumber, "type ", typeof(file_str));
  return [ path.basename(file_str),lineNumber];  
}

function debug(...args ){
    if(!debugEnable) return;
    const [file,lineNumber] = prevLine(2);
    console.error("\n-------------------")
    console.error(`Debugging: ${file}:${lineNumber}`)
    console.error( ...args);
    console.error("-------------------")
}

function handleError(err){
    const chalk = require('chalk');
    
    console.error(chalk.red(err.message));
    if(debugEnable) throw err;
    process.exit(1);
}

module.exports = {
    debug,
    prevLine,
    handleError
}