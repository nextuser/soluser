const { existsAccount, getKeyFilePath } = require('../utils/path');
const { Keypair } = require('@solana/web3.js');
const fs = require('fs');
const bs58 = require('bs58').default;


function exportPrivateKey(alias) {
  // Check if account exists
  if (!existsAccount(alias)) {
    console.error(`Error: Account "${alias}" does not exist.`);
    console.error(`       Use "soluser list" to view all available accounts.`);
    process.exit(1);
  }

  try {
    // Read and parse the key file
    const keyPath = getKeyFilePath(alias);
    const keyData = fs.readFileSync(keyPath, 'utf8');
    const secretKeyArray = JSON.parse(keyData);
    
    // Convert to Uint8Array and create Keypair
    const secretKey = Uint8Array.from(secretKeyArray);
    const keypair = Keypair.fromSecretKey(secretKey);
    
    // Encode to base58 and output
    const base58PrivateKey = bs58.encode(secretKey );
    process.stdout.write(`address for  "${alias}" ${keypair.publicKey.toBase58()}:\n`);
    process.stdout.write(`private key for "${alias}": ${base58PrivateKey}\n`);
  } catch (err) {
    console.error(`Error: Failed to export private key for "${alias}": ${err.message}`);
    for( k in bs58) {
      console.log(k,":", bs58[k]);
    }
    process.exit(1);
  }
}

module.exports = exportPrivateKey;