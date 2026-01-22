const path = require('path');
const os = require('os');
const {debug} = require('../utils/debug');
const ThrowErorr = require('../utils/throw_error');

// 密钥存储目录：~/.config/solana/keys
const KEYS_DIR = path.join(os.homedir(), '.config', 'solana', 'keys');
const BACKUP_DIR = path.join(os.homedir(), '.config', 'solana', '.bak');
const padZero = (num) => num.toString().padStart(2, '0');
function generateBackupSuffix(){
  const now = new Date();
  let minutes = padZero(now.getMinutes());
  let secondes = padZero(now.getSeconds());
  return `_${minutes}-${secondes}`;
}
function addBackupSuffix(baseName, suffix = null){
  if(suffix){
    return `${baseName}_${suffix}`;
  }
  const new_suffix = generateBackupSuffix();
  return `${baseName}_${new_suffix}`;
}

function stripBackupSuffix(basename){
  let index = basename.lastIndexOf('_');
  if(index > 0 ){
    return basename.substring(0,index - 1);
  }
}
/**
 * 将日期格式化为 YYYY-mm-dd 字符串
 * @param {Date} [date=new Date()] - 要格式化的日期对象，默认当前日期
 * @returns {string} 格式化后的日期字符串（YYYY-mm-dd）
 */
function formatDateToYmd(date = new Date()) {
  // 补零工具函数（简化重复逻辑）


  const year = date.getFullYear();
  const month = padZero(date.getMonth() + 1); // 月份+1并补零
  const day = padZero(date.getDate());

  return `${year}-${month}-${day}`;
}
// 验证别名格式（字母开头，仅含字母、数字、-、_）
function validateAlias(alias) {
  const regex = /^[a-zA-Z][a-zA-Z0-9_-]*$/;
  if (!regex.test(alias)) {
    ThrowErorr('Alias must start with a letter and contain only letters, digits, hyphens, or underscores');
  }
}

function getBackupDir( create = true) {
  let dir = BACKUP_DIR;
  console.log("backup dir:",dir);
  if (create && !fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return dir;
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
  getBackupDir,
  validateAlias,
  getKeyFilePath,
  
  existsAccount,
  addBackupSuffix,
  stripBackupSuffix,
  formatDateToYmd
};

