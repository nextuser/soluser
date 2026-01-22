const { expect } = require('chai');
const { execSync, spawn } = require('child_process');
const {debug} =require('./debug');
const { PassThrough } = require('stream');

function execExpectInput(inputArgs, prompt , input,expectOut,check_callback){

   return new Promise((resolve, reject) => {
    const task = spawn('node',inputArgs , {stdio: ['pipe', 'pipe', 'pipe'], encoding: 'utf8'});
    const command = "node " + inputArgs.join(" ");
    
    const stdoutStream = new PassThrough({encoding: 'utf8'});
    task.stdout.pipe(stdoutStream);
    task.stderr.pipe(stdoutStream);


    debug("execExpectInput command:",command);
    let output = '';
    let errMsg = '';
    
    stdoutStream.on('data', (chunk) => {
      output += chunk.toString();
      if (output.includes(output)) {
        //output = '';//reset output when output match
        task.stdin.write( input + '\n');
        //output = '';
      }
    });

    task.stderr.on('data', (chunk) => {
      console.error("error:",chunk.toString().trim(),"command:",command);
    });

    task.on('error', (err) => {
      console.error("error to execute:,command",command );
      reject(err);
    }); 
    
    task.on('close', (code) => {

      try{
          debug("executeExpectInput close ,command:",command,"expectOut:",expectOut,"output :[[[",output,"]]]" )
          if(expectOut){
            expect(output).to.include(expectOut);
          } 
          
          if(check_callback) check_callback(output);         
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
    const task = spawn('node',inputArgs,{stdio: ['pipe', 'pipe', 'pipe'], encoding: 'utf8'});
    const command = "node " + inputArgs.join(" ");
    const taskStream = new PassThrough({encoding: 'utf8'});
    let output = '';
    let errMsg = '';
    task.stdout.pipe(taskStream);
    //task.stderr.pipe(taskStream);

    taskStream.on('data', (data) => {
      output += data.toString();
    });

    taskStream.on('data', (data) => {
      errMsg += data.toString();
      ///output += data.toString();
    });

    task.on('error', (err) => {
      console.error("error to execute:,command",command );
      console.error("errMsg:",errMsg);
      reject(err);
    }); 

    
    
    task.on('close', (code) => {
      try{
        debug("ExpectOutput close:  command : ", command, "expectOut", expectOut,
          "output :[[[",output,"]]] \n errMsg:",
           errMsg , "callback exist:", !!finish_callback);
        ////let out = output + errMsg;
        if(expectOut) expect(output).to.include(expectOut);
        if(finish_callback) finish_callback(output);
        debug("execute sucessfuly,command:",command )
        
        resolve(output);
      } catch(err){
        console.error("ExpectOutput:error to execute :", command, `output=${output}, expectOut: ${expectOut}  errMsg=${errMsg}` );
        reject(err);
      }
    });
    //debug("execExpectOutput command:",command);
  });

}

module.exports =  {execExpectInput,execExpectOutput};
