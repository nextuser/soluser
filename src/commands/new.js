const fs = require('fs');
const { KEYS_DIR, validateAlias, getKeyFilePath ,existsAccount} = require('../utils/path');
const { execCommand } = require('../utils/solana');
const ThrowErorr = require('../utils/throw_error');

function newAccount(alias, wordLength = 12, noPassphrase = false) {
  // 1. 确保密钥目录存在
  if (!fs.existsSync(KEYS_DIR)) {
    fs.mkdirSync(KEYS_DIR, { recursive: true });
  }

  // 2. 验证参数
  validateAlias(alias);

  // 3. 新增：检查账号是否已存在
  if (existsAccount(alias)) {
    console.error(`Error: Account "${alias}" already exists.`);
    console.error(`       Use "soluser list" to view existing accounts, or choose a different alias.`);
    process.exit(1);
  }


  // 4. 验证助记词长度（已有逻辑）
  const validWordLengths = [12, 15, 18, 21, 24];
  if (!validWordLengths.includes(wordLength)) {
    ThrowErorr(`Word length must be one of: ${validWordLengths.join(', ')}`);
  }

  


  // 5. 生成密钥对（已有逻辑）
  try {
    let command = `solana-keygen new --word-count ${wordLength} --outfile ${getKeyFilePath(alias)}`;
    
    if (noPassphrase) {
      command += ' --no-bip39-passphrase';
    }
    console.log(`Generating key pair for ${alias}...`);
    execCommand(command);
    console.log(`Successfully created account: ${alias} (saved to ${getKeyFilePath(alias)})`);
  } catch (err) {
    console.error(`Error: Failed to generate key pair: ${err.message}`);
    process.exit(1);
  }
}

module.exports = newAccount;

