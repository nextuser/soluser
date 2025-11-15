const path = require('path');
const os = require('os');

// 密钥存储目录：~/.config/solana/keys
const KEYS_DIR = path.join(os.homedir(), '.config', 'solana', 'keys');

// 验证别名格式（字母开头，仅含字母、数字、-、_）
function validateAlias(alias) {
  const regex = /^[a-zA-Z][a-zA-Z0-9_-]*$/;
  if (!regex.test(alias)) {
    throw new Error('Alias must start with a letter and contain only letters, digits, hyphens, or underscores');
  }
}

// 获取密钥文件路径
function getKeyFilePath(alias) {
  return path.join(KEYS_DIR, `${alias}.json`);
}

module.exports = {
  KEYS_DIR,
  validateAlias,
  getKeyFilePath,
};

