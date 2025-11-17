#!/usr/bin/env node

const { program } = require('commander');
const newAccount = require('../src/commands/new');
const switchAccount = require('../src/commands/switch');
const listAccounts = require('../src/commands/list');
const removeAccount = require('../src/commands/remove');

// 导入地址查询命令
const showAddress = require('../src/commands/address');
// 导入余额查询命令
const checkBalance = require('../src/commands/balance');
// Import the airdrop command
const requestAirdrop = require('../src/commands/airdrop');

// Get version from package.json
const packageJson = require('../package.json');
// Set program version
program.version(packageJson.version);

// 定义地址查询命令
program
  .command('address')
  .description('Output the base58 address of a Solana account')
  .argument('<alias>', 'Alias of the account to get address') // 接收别名作为位置参数
  .action((alias) => {
    showAddress(alias);
  });


// Define the airdrop command
program
  .command('airdrop')
  .description('Request an airdrop of SOL to a Solana account')
  .argument('<amount>', 'Amount of SOL to request')
  .argument('<alias>', 'Alias of the account to receive the airdrop')
  .action((amount, alias) => {
    requestAirdrop(amount, alias);
  });

// ... existing code ...
// 定义余额查询命令
program
  .command('balance')
  .description('Check the SOL balance of a Solana account')
  .argument('<alias>', 'Alias of the account to check balance') // 接收别名作为位置参数
  .action((alias) => {
    checkBalance(alias);
  });


// 定义新建账号命令
// 定义新建账号命令（修改后）
program
  .command('new')
  .description('Create a new Solana account')
  .argument('<alias>', 'Alias for the new account (must start with a letter, contain letters, digits, hyphens, or underscores)') // 新增位置参数
  .option('--word-length <number>', 'Number of words in seed phrase (12,15,18,21,24)', 12)
  .option('--without-passphrase', 'Do not prompt for BIP39 passphrase',false)
  .action((alias, options) => { // 第一个参数为位置参数 alias，第二个为选项
    // // 打印选项值验证（调试用）
    // console.log('without-passphrase:', options.withoutPassphrase); 
    // console.log("type noPassphrase:", typeof(options.withoutPassphrase), "value:", options.withoutPassphrase)

    newAccount(
      alias, // 直接使用位置参数的 alias
      parseInt(options.wordLength, 10), //10进制解析
      options.withoutPassphrase
    );
  });


// 定义切换账号命令（修改后）
program
  .command('switch')
  .description('Switch active Solana account')
  .argument('<alias>', 'Alias of the account to switch to') // 新增位置参数
  .action((alias) => { // 直接使用位置参数 alias
    switchAccount(alias);
  });


// 定义列出账号命令
program
  .command('list')
  .description('List all Solana accounts')
  .action(listAccounts);

  // 定义删除账号命令
program
  .command('remove <alias>') // <alias> 为必填参数
  .description('Delete a Solana account (permanently removes the key file)')
  .action((alias) => {
    removeAccount(alias);
  });


// 解析命令行参数
program.parse(process.argv);

