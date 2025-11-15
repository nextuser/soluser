const { existsAccount } = require('../utils/path');
const { getAddress, execCommand } = require('../utils/solana');

function checkBalance(alias) {
  // 1. 检查账号是否存在
  if (!existsAccount(alias)) {
    console.error(`Error: Account "${alias}" does not exist.`);
    console.error(`       Use "soluser list" to view all available accounts.`);
    process.exit(1);
  }

  // 2. 获取账号对应的公钥（address）
  let address;
  try {
    address = getAddress(alias);
  } catch (err) {
    console.error(`Error: Failed to get address for "${alias}": ${err.message}`);
    process.exit(1);
  }

  // 3. 调用 solana balance 命令查询余额
  try {
    // solana balance 命令会返回类似 "1.2345 SOL" 的结果
    const balance = execCommand(`solana balance ${address}`);
    console.log(`${alias}: ${balance}`); // 输出格式：别名 + 余额
  } catch (err) {
    console.error(`Error: Failed to check balance for "${alias}": ${err.message}`);
    console.error(`       Ensure Solana CLI is configured with a valid network (e.g., "solana config set --url https://api.devnet.solana.com")`);
    process.exit(1);
  }
}

module.exports = checkBalance;
