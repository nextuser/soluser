const fs = require('fs');
const { validateAlias, getKeyFilePath } = require('../utils/path');
const { getActiveKeyPath } = require('../utils/solana');
const path = require('path');
const ThrowErorr = require('../utils/throw_error');
const chalk = require('chalk');
const { getAddress } = require('../utils/solana');

async function pruneAccount(alias) {
  // 1. 验证别名格式
  validateAlias(alias);

  // 2. 检查密钥文件是否存在
  const keyPath = getKeyFilePath(alias);
  if (!fs.existsSync(keyPath)) {
    ThrowErorr(`Account "${alias}" not found. Use "soluser list" to check existing accounts.`);
  }

  // 3. 检查是否为当前活跃账号
  const activeKeyPath = getActiveKeyPath();
  const isActive = activeKeyPath === keyPath;
  if (isActive) {
    console.warn(`⚠️  Warning: "${alias}" is currently the active account. Deleting it will break current Solana config.`);
  }

 

  const address = getAddress(alias);

  const prune_confirm = `
  WARNING: This action will irreversibly erase your local Solana key file of user ${alias}, address(${address}). 
  Without a valid backup, you will lose permanent access to all funds, assets, and permissions linked to the corresponding account. 
  Confirm continuation? (yes/no)
  `

   // 4. 确认删除（简单交互提示）
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

  let answer = await new Promise((resolve) => {
    readline.question(chalk.red(prune_confirm), (input) => {
        resolve(input.trim().toLowerCase());
      });
  });
  readline.close();


  if (answer === 'y' || answer === 'yes') {
    // 执行删除
    fs.unlinkSync(keyPath);
    console.log(`✅ Successfully Deleted account: ${alias}`);
    if (isActive) {
      console.log('ℹ️  Tip: Use "soluser switch --address <alias>" to set a new active account.');
    }
  } else {
    console.log('❌ Deletion cancelled.');
  }
 
}

module.exports = pruneAccount;
