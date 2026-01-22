// test/soluser.test.js

const { expect } = require('chai');
const {describe, it, before, after} = require('mocha');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { execExpectInput, execExpectOutput} = require('../src/utils/execExpectInput');
const {debug} = require('../src/utils/debug');
const { formatDateToYmd } = require('../src/utils/path');
const cliPath = path.resolve(__dirname, '../bin/index.js');

 describe('Soluser CLI Tool Tests', function() {
 
  before(function() {
    // 创建临时目录用于测试
    if (!fs.existsSync(path.join(__dirname, 'tmp'))) {
      fs.mkdirSync(path.join(__dirname, 'tmp'));
    }
  });

  after(function() {
    // 清理测试产生的文件
    if (fs.existsSync(path.join(__dirname, 'tmp'))) {
      fs.rmSync(path.join(__dirname, 'tmp'), { recursive: true });
    }
  });

  it('should display version with --version flag', function() {
    const output = execSync(`node ${cliPath} --version`, { encoding: 'utf-8' });
    expect(output).to.match(/\d+\.\d+\.\d+/); // 匹配版本号格式 x.x.x
  });
});


describe('Account Management Commands',  function(done) { 
    it('soluser sequence process', async function() {
      await execExpectInput([cliPath, 'clear'], 'Are you sure you want to continue', 'y', 'All accounts have been removed.');

      // const output = execSync(`node ${cliPath} list`, { encoding: 'utf-8' });
      // expect(output).to.include('No accounts found.');
      await execExpectOutput([cliPath, 'list'],`No accounts found`);
    });
    it('new account bob',async function(){
      await execExpectOutput([cliPath ,  
                  'new',
                    'alice',
                    '--without-passphrase'],
                    null,
                    (output)=>{
                        debug("execExpectOutput callback: output=",output , "expect include","alice");
                        expect(output).to.include('Generating key pair for').include('alice'); 
                    })
    });
    it('new account bob',async function(){
      const command = `${cliPath} new bob --word-length 12 --without-passphrase`;
      await execExpectOutput( 
                  command.split(' '),
                    null,
                    (output)=>{
                        expect(output).to.include('Generating key pair for').include('bob'); 
                  })

      await execExpectOutput([cliPath ,  
                  'new',
                    'charlie',
                    '--word-length',' 24',
                    '--without-passphrase'],
                    null,
                    (output)=>{
                        expect(output).to.include('Successfully').include('charlie').include('json'); 
                       /// done();
                  })
    });
  });

describe('switch',function(){ 
  
    it('switch ',async function(){
      command = `${cliPath} switch alice`;
      await execExpectOutput(command.split(' '),`Switched`,(output)=>{
          expect(output).to.include('alice');
          
      })
    });

    it('keyfile ',async function(){
      command = `${cliPath} keyfile`;
      await execExpectOutput(command.split(' '),'',(output)=>{
          expect(output).to.include('.config/solana/keys/alice.json');
          
      })
    });




    it('list ',async function(){
      await execExpectOutput([cliPath,"list"],"address",(output)=>{
            expect(output).to.include('alice');
            expect(output).to.include('bob');
            expect(output).to.include('charlie');
            //done();
      } )

    });

    it('address bob', async function () { 
    
      await execExpectOutput([cliPath,"address","bob"],"",(output)=>{
      expect(output).to.match(/[1-9A-HJ-NP-Za-km-z]{32,44}/)
      } )
    });




     it('import  address', async function () { 
      const mnemonic = 'awkward '.repeat(11) + 'undo';
      const command = `${cliPath} import "${mnemonic}" --alias someone`;
      debug("command is ",command )
      await execExpectOutput([cliPath,"import", mnemonic, "--alias","someone"],"someone",(output)=>{
      console.log("output is ",output)
        expect(output).to.include('3hgx2gsBVaBiEQAUmUsnrze25vjPydsBVx3R4zqL49W3');
      } )
    });


    it('balance bob', async function () { 
      this.timeout(20000);
      await execExpectOutput([cliPath,"balance","bob"],"bob",(output)=>{
      expect(output).to.include('SOL');
      } )
    });

    
  });

  describe('remove alice ', function () { 
    it('remove alice', function (done) { 
        //this.timeout(10000);
         execExpectInput([cliPath, 'remove', 'alice'], 'Are you sure you want to continue', 'yes', 'Removed account').then(result =>
          {
            console.log("remove alice result:",result)
            done()
          } ).catch(err=>{ done(err) });
    });
  });


  

describe('remove alice not found', function () { 
 it('remove alice not found', function (done) { 
      //this.timeout(5000);
      execExpectInput([cliPath, 'remove', 'alice'], 'yes', 'yes', 'not found').then(result=>{
        console.log("remove alice not found result:",result)
        expect(result).to.include('not found');
        done();
      }).catch(err=>{ done(err) });

  });
});

describe('prune charlie', function () { 

  it('prune charlie' ,   function (done) { 
       execExpectInput([cliPath, 'prune', 'charlie'], 'Confirm', 'yes', 'Successfully Deleted account').then(result =>
        {
          expect(result).to.include('charlie');
          done()

        } ).catch(err=>{ done(err) })
  });
});



