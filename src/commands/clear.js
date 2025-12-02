// src/commands/clear.js
const clear = async () => {
  const fs = require('fs');
  const path = require('path');
  const readline = require('readline');

  // 创建 readline 接口用于用户输入
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  // 显示警告并等待用户确认
  console.log('\x1b[33m%s\x1b[0m', 'WARNING: This will move ALL Solana account files to backup directory!');
  console.log('This operation affects all accounts in your keys directory.');
  
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
    console.log('Operation cancelled.');
    return;
  }
 

  // 获取当前时间戳为 YYMMDDHHMMSS 格式
  const now = new Date();
  const timestamp = `${now.getFullYear().toString().slice(-2)}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}${now.getSeconds().toString().padStart(2, '0')}`;
  
  // 定义密钥目录和备份目录
  const keysDir = path.join(require('os').homedir(), '.config', 'solana', 'keys');
  const backupDir = path.join(require('os').homedir(), '.config', 'solana', '.bak');
  
  // 确保备份目录存在
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }
  
  // 读取密钥目录中的所有文件
  if (fs.existsSync(keysDir)) {
    const files = fs.readdirSync(keysDir);
    
    // 过滤出 .json 文件并移动
    const jsonFiles = files.filter(file => path.extname(file) === '.json');
    
    if (jsonFiles.length > 0) {
      let successCount = 0;
      jsonFiles.forEach(file => {
        const sourceFile = path.join(keysDir, file);
        const fileNameWithoutExt = path.basename(file, '.json');
        const destFile = path.join(backupDir, `${fileNameWithoutExt}_${timestamp}.json`);
        
        try {
          fs.renameSync(sourceFile, destFile);
          console.log(`Moved ${file} to backup directory as ${fileNameWithoutExt}_${timestamp}.json`);
          console.log('All accounts have been removed.')
          successCount++;
        } catch (error) {
          console.error(`Failed to move ${file}: ${error.message}`);
        }
      });
      
      console.log(`\nSuccessfully moved ${successCount}/${jsonFiles.length} account(s) to backup directory`);
    } else {
      
      console.log('All accounts have been removed.')
      console.log('No account files found to move');
    }
  } else {
    console.error('Keys directory does not exist');
    process.exit(1);
  }
};

module.exports = clear;