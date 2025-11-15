#!/usr/bin/env node

const { program } = require('commander');
const newAccount = require('../src/commands/new');
const switchAccount = require('../src/commands/switch');
const listAccounts = require('../src/commands/list');
const removeAccount = require('../src/commands/remove');


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

