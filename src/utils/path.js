const path = require('path');
const os = require('os');
const ThrowErorr = require('../utils/throw_error');
// 密钥存储目录：~/.config/solana/keys
const KEYS_DIR = path.join(os.homedir(), '.config', 'solana', 'keys');

// 验证别名格式（字母开头，仅含字母、数字、-、_）
function validateAlias(alias) {
  const regex = /^[a-zA-Z][a-zA-Z0-9_-]*$/;
  if (!regex.test(alias)) {
    ThrowErorr('Alias must start with a letter and contain only letters, digits, hyphens, or underscores');
  }
}

// 获取密钥文件路径
function getKeyFilePath(alias) {
  return path.join(KEYS_DIR, `${alias}.json`);
}

// 检查账号是否存在（即密钥文件是否存在）
function existsAccount(alias) {
  const keyPath = getKeyFilePath(alias);
  return fs.existsSync(keyPath); // 返回布尔值：true=存在，false=不存在
}

// 记得在顶部导入 fs
const fs = require('fs');

module.exports = {
  KEYS_DIR,
  validateAlias,
  getKeyFilePath,
  existsAccount,
};

