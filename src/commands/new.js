const fs = require('fs');
const { KEYS_DIR, validateAlias, getKeyFilePath } = require('../utils/path');
const { execCommand } = require('../utils/solana');

function newAccount(alias, wordLength = 12, noPassphrase = false) {
  // 1. 确保密钥目录存在
  if (!fs.existsSync(KEYS_DIR)) {
    fs.mkdirSync(KEYS_DIR, { recursive: true });
  }

  // 2. 验证参数
  validateAlias(alias);
  const validWordLengths = [12, 15, 18, 21, 24];
  if (!validWordLengths.includes(wordLength)) {
    throw new Error(`Word length must be one of: ${validWordLengths.join(', ')}`);
  }

  // 3. 生成密钥对（调用 solana-keygen）
  const keyPath = getKeyFilePath(alias);
  let command = `solana-keygen new --word-count ${wordLength} --outfile ${keyPath}`;
  if (noPassphrase) {
    command += ' --no-bip39-passphrase';
  }

  console.log(`Generating key pair for ${alias}...`);
  execCommand(command);
  console.log(`Successfully created account: ${alias} (saved to ${keyPath})`);
}

module.exports = newAccount;

