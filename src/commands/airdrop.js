// src/commands/airdrop.js
const { execCommand } = require('../utils/solana');
const { getAddress } = require('../utils/solana');
function requestAirdrop(amount, alias) {
  
  
  try {
    const address = getAddress(alias);
    // Execute the solana airdrop command with the amount and resolved address
    const cmd = `solana airdrop ${amount} ${address}`;
    const result = execCommand(cmd);
    console.log(result);
  } catch (error) {
    console.log("eroror in call requestAirdrop ${amount} ${alias}");
    console.error(`Failed to request airdrop: ${error.message} \n `);
    process.exit(1);
  }
}

module.exports = requestAirdrop;