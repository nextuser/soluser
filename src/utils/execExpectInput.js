const { expect } = require('chai');
const { execSync, spawn } = require('child_process');
const {debug} =require('./debug');
const { stdout } = require('process');
function execExpectInput(inputArgs, prompt , input,expectOut,done){

   return new Promise((resolve, reject) => {
    const child = spawn('node',inputArgs);
    const command = "node " + inputArgs.join(" ");
    debug("execExpectInput command:",command);
    let output = '';
    let errMsg = '';
    
    child.stdout.on('data', (data) => {
      //debug("stdout:",data.toString());
      output += data.toString();
      if (output.includes(prompt)) {
        //debug("incluse prompt:",prompt);
        child.stdin.write( input + '\n');
      }
    });

    child.stderr.on('data', (data) => {
      errMsg += data.toString();
      output += data.toString();
    });
    
    child.on('close', (code) => {

      try{
          expect(output).to.include(expectOut);
          if(done) done(output);
          debug("execute sucessfuly,command:",command )
          resolve(output);
      } catch(err){
        console.error("error to execute : node ", inputArgs, `output=${output},prompt=${prompt} expectOut: ${expectOut} errMsg=${errMsg}` );
        reject(err);
      }
    });
  });

}


function execExpectOutput(inputArgs, expectOut,finish_callback){

  return new Promise((resolve, reject) => {
    const child = spawn('node',inputArgs);

    let output = '';
    let errMsg = '';
    child.stdout.resume();
    child.stdout.on('data', (data) => {
      output += data.toString();
    });

    child.stderr.on('data', (data) => {
      errMsg += data.toString();
      output += data.toString();
    });

    
    
    child.on('close', (code) => {
      try{
        //debug("output :",output);
        //debug("code",code);
        if(expectOut) expect(output).to.include(expectOut);
        if(finish_callback) finish_callback(output);
        debug("execute sucessfuly,command:",command )
        
        resolve(output);
      } catch(err){
        console.error("error to execute : node ", inputArgs, `output=${output}, expectOut: ${expectOut}  errMsg=${errMsg}` );
        reject(err);
      }
    });
    const command = "node " + inputArgs.join(" ");
    debug("execExpectOutput command:",command);
  });

}


function execExpectOutputOld(inputArgs, expectOut,finish_callback){
    let command = "node " + inputArgs.join(" ");
    debug("command:",command);
    let out = execSync(command)
    try{
        if(expectOut) expect(output).to.include(expectOut);
        if(finish_callback) finish_callback(output);
    } catch(err){
      console.error("error to execute : node ",  `command:${command}, expectOut: ${expectOut}` );
      throw err;
    }

}


module.exports =  {execExpectInput,execExpectOutput};
