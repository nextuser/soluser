const fs = require('fs');
const { getKeyFilePath } = require('../utils/path');
const { execCommand } = require('../utils/solana');

function switchAccount(alias) {
  const keyPath = getKeyFilePath(alias);

  // 验证密钥文件是否存在
  if (!fs.existsSync(keyPath)) {
    throw new Error(`Account ${alias} not found. Check alias or create it with "soluser new".`);
  }

  // 执行切换（调用 solana config set）
  execCommand(`solana config set --keypair ${keyPath}`);
  console.log(`Switched active account to: ${alias}`);
}

module.exports = switchAccount;

