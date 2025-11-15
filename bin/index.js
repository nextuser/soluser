#!/usr/bin/env node

const { program } = require('commander');
const newAccount = require('../src/commands/new');
const switchAccount = require('../src/commands/switch');
const listAccounts = require('../src/commands/list');
const removeAccount = require('../src/commands/remove');


// 定义新建账号命令
program
  .command('new')
  .description('Create a new Solana account')
  .option('--alias <name>', 'Alias for the new account')
  .option('--word-length <number>', 'Number of words in seed phrase (12,15,18,21,24)', 12)
  .option('--no-bip39-passphrase', 'Do not prompt for BIP39 passphrase')
  .action((options) => {
    if (!options.alias) {
      throw new Error('Alias is required (use --alias <name>)');
    }
    newAccount(
      options.alias,
      parseInt(options.wordLength, 10),
      options.noBip39Passphrase
    );
  });

// 定义切换账号命令
program
  .command('switch')
  .description('Switch active Solana account')
  .option('--address <alias>', 'Alias of the account to switch to', '')
  .action((options) => {
    if (!options.address) {
      throw new Error('Alias is required (use --address <alias>)');
    }
    switchAccount(options.address);
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

