const { getAddress, execCommand ,getActiveKeyPath} = require('../utils/solana');

const {encode, decode} = require('bs58').default;
const fs = require('fs');
function exportPrivateKey(alias){
    const keyPath = getActiveKeyPath(alias);
    const buffer = fs.readFileSync(keyPath);
    const str = encode(buffer);
    console.log(str);
    console.log(decode(str));
}


function test(){
    exportPrivateKey('dev');
}

test();