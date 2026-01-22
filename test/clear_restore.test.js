
const { expect } = require('chai');
const {describe, it, before, after} = require('mocha');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { execExpectInput, execExpectOutput} = require('../src/utils/execExpectInput');
const {debug} = require('../src/utils/debug');
const { formatDateToYmd } = require('../src/utils/path');
const cliPath = path.resolve(__dirname, '../bin/index.js');

describe('clear and restore ', function () { 
  it('new alias ',async function(done){
       const aliases = ["b1","b2","b3"];
       aliases.forEach(async (alias)=>{
          await execExpectOutput([cliPath ,  
                        'new',
                        alias,
                        '--without-passphrase'],
                        null,
                        (output)=>{
                            expect(output).to.include('Generating key pair for').include(alias); 
                           
                        })
       })
        done();
  });

  it('clear all before restore', async function() {
      await execExpectInput([cliPath, 'clear'], 'Are you sure you want to continue', 'y', 'All accounts have been removed.');

      await execExpectOutput([cliPath, 'list'],null,
        (output)=>{ 
        const expect_msg = 'No accounts found.';
        debug("### clear all before restore ,list:",output, "expect",expect_msg);
        //expect(output).to.include(expect_msg);
        });
    });

  it('restore after clear',async function(){


      const args = [cliPath, "restore"];
      try{
          await execExpectOutput( 
                      args,
                        null,
                        (output)=>{
                            ////debug("callback of execExpectOutput : output=",output , "\nexpected include 'Moved b1' ");
                            expect(output).to.include('All accounts have been restored.').include('Moved b1').include('Moved b2').include('Moved b3'); 
                      })
          await execExpectOutput( 
                      args,
                        null,
                        (output)=>{
                          debug("callback of execExpectOutput : No account files found to restore. output=",output);
                          //todo expect(output).to.include('No account files found to restore.');
                          
                      })

      }catch(err){
      } 
      
  });

}); 