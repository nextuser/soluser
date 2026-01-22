const {addBackupSuffix,stripBackupSuffix, getKeyFilePath} = require('../src/utils/path');
const { expect } = require('chai');
const { getAddress, getAddressByFile } = require('../src/utils/solana');
const path = require('path');



describe('path suffix tet ', async function () { 
  await (async function(done){
       const aliases = ["c1","c2","c3"];
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
  })();
  await (async function(){ 
        let c1 = 'c1';
        let c1_file = getKeyFilePath(c1);
        const suffix = getAddressByFile(c1_file);
        let c2 = addBackupSuffix(c1, suffix);
        expect(c1).to.equal(stripBackupSuffix(c2));
        console.log(c2);
        console.log(stripBackupSuffix(c2));


  })()
});


