const { existsAccount, getKeyFilePath } = require('../utils/path');
const { getAddress } = require('../utils/solana');

function showAddress(alias) {
  // 1. 检查账号是否存在
  if (!existsAccount(alias)) {
    console.error(`Error: Account "${alias}" does not exist.`);
    console.error(`       Use "soluser list" to view all available accounts.`);
    process.exit(1);
  }

  // 2. 解析并输出 base58 地址
  try {
    const address = getAddress(alias); // 复用之前的 getAddress 函数（基于 solana-keygen）
    process.stdout.write(address); // 直接输出地址（方便脚本调用）
  } catch (err) {
    console.error(`Error: Failed to parse address for "${alias}": ${err.message}`);
    process.exit(1);
  }
}

module.exports = showAddress;
