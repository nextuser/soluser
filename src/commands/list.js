const fs = require('fs');
const path = require('path');
const Table = require('cli-table3');
const { KEYS_DIR } = require('../utils/path');
const { getAddress, getActiveKeyPath } = require('../utils/solana');

function listAccounts() {
  // 1. 读取密钥目录下的所有 json 文件
  if (!fs.existsSync(KEYS_DIR)) {
    console.log('No accounts found. Create one with "soluser new  <alias name>".');
    return;
  }

  const files = fs.readdirSync(KEYS_DIR).filter(file => file.endsWith('.json'));
  if (files.length === 0) {
    console.log('No accounts found. Create one with "soluser new  <alias name>".');
    return;
  }

  // 2. 获取当前活跃账号的别名
  const activeKeyPath = getActiveKeyPath();
  const activeAlias = activeKeyPath 
    ? path.basename(activeKeyPath, '.json') 
    : null;

  // 3. 构建表格
  const table = new Table({
    head: ['alias', 'address', 'active'],
    colWidths: [15, 50, 8],
  });

  // 4. 填充表格数据
  files.forEach(file => {
    const alias = path.basename(file, '.json');
    const address = getAddress(alias);
    const isActive = alias === activeAlias ? '*' : '';
    //console.log("alias: ", alias, "address: ", address, "isActive: ", isActive,'activeAlias',activeAlias )
    table.push([alias, address, isActive]);
  });

  // 5. 打印表格
  console.log(table.toString());
}

module.exports = listAccounts;

