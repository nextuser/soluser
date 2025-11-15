const fs = require('fs');
const { validateAlias, getKeyFilePath } = require('../utils/path');
const { getActiveKeyPath } = require('../utils/solana');
const path = require('path');

function removeAccount(alias) {
  // 1. 验证别名格式
  validateAlias(alias);

  // 2. 检查密钥文件是否存在
  const keyPath = getKeyFilePath(alias);
  if (!fs.existsSync(keyPath)) {
    throw new Error(`Account "${alias}" not found. Use "soluser list" to check existing accounts.`);
  }

  // 3. 检查是否为当前活跃账号
  const activeKeyPath = getActiveKeyPath();
  const isActive = activeKeyPath === keyPath;
  if (isActive) {
    console.warn(`⚠️  Warning: "${alias}" is currently the active account. Deleting it will break current Solana config.`);
  }

  // 4. 确认删除（简单交互提示）
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

  readline.question(`Are you sure you want to delete "${alias}"? This will permanently remove the key file (y/N): `, (answer) => {
    readline.close();
    if (answer.trim().toLowerCase() === 'y') {
      // 执行删除
      fs.unlinkSync(keyPath);
      console.log(`✅ Successfully deleted account: ${alias}`);
      if (isActive) {
        console.log('ℹ️  Tip: Use "soluser switch --address <alias>" to set a new active account.');
      }
    } else {
      console.log('❌ Deletion cancelled.');
    }
  });
}

module.exports = removeAccount;
