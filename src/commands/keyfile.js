
const { execCommand } = require('../utils/solana');
function getKeyFilePath() {
  const keyfile = execCommand('solana config get keypair');
  if(keyfile && keyfile.includes('Key Path') && keyfile.includes(":")){
    return keyfile.split(":")[1].trim();
  }
  throw new Error('Error: Keypair path not found in config , failed to parse' + keyfile) ;
}

function showKeyfilePath() {
  console.log(getKeyFilePath());
}

module.exports = showKeyfilePath;