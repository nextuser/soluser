async function confirm(alias){
  const readline = require('readline');
 
  // 创建 readline 接口用于用户输入
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  // 显示警告并等待用户确认
  console.log(`\x1b[33mWARNING: You are about to remove account "${alias}"!\x1b[0m`);
  console.log('This will move the account file to backup directory.');

  // const answer = await new Promise((resolve) => {
  //   rl.question('Are you sure you want to continue? (yes/no): ', (input) => {
  //     resolve(input.trim().toLowerCase());
  //   });
  // });
  // rl.close();

  // if (answer !== 'yes' && answer !== 'y') {
  //   console.log('Operation cancelled.');
  //   return false;
  // }
  // return true;

    let answer = await new Promise((resolve) => {
      rl.question('Are you sure you want to continue? Type "yes" to proceed: ', (input) => {
          resolve(input.trim().toLowerCase());
        });
    });
    
    rl.close();
    if(answer) {
      answer = answer.trim().toLowerCase();
    }

    if (answer !== 'yes' && answer !== 'y')  {
      
      return false;
    }
    return true;

}

const removeAccount = async (alias) => {
  const fs = require('fs');
  const path = require('path');
 
  // 获取当前时间戳
  const now = new Date();
  const timestamp = `${now.getFullYear().toString().slice(-2)}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}${now.getSeconds().toString().padStart(2, '0')}`;
  
  
  // 确保备份目录存在
  const backupDir = path.join(require('os').homedir(), '.config', 'solana', 'keys', '.bak');
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }
  
  // 构造源文件和目标文件路径
  const sourceFile = path.join(require('os').homedir(), '.config', 'solana', 'keys', `${alias}.json`);
  const destFile = path.join(backupDir, `${alias}_${timestamp}.json`);
  
  if (fs.existsSync(sourceFile)) {
    const confirmed = await confirm(alias);
    if (!confirmed) {
      console.log('Operation cancelled.');
      return;
    }
    fs.renameSync(sourceFile, destFile);
    console.log(`Removed account "${alias}" from list`);
  } else {
    console.error(`Account "${alias}" not found`);
    process.exit(1);
  }
};

module.exports = removeAccount;