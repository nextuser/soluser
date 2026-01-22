const {KEYS_DIR, getBackupDir } = require('../utils/path');
const { stripBackupSuffix } = require('../utils/path');
const { debug } = require('../utils/debug');
// src/commands/clear.js
const restore = async () => {
  const fs = require('fs');
  const path = require('path');


   
  // 定义密钥目录和备份目录
  const keysDir = KEYS_DIR;
  const backupDir = getBackupDir( true);
  debug("");
  // 确保备份目录存在
  if (!fs.existsSync(backupDir)) {
    console.log('Backup directory does not exist for', backupDir);
    return ;    
  }


  if(!fs.existsSync(keysDir)){
    fs.mkdirSync(keysDir, { recursive: true });
  }

  // 读取密钥目录中的所有文件
  if (fs.existsSync(backupDir)) {
    const files = fs.readdirSync(backupDir);
    
    // 过滤出 .json 文件并移动
    const jsonFiles = files.filter(file => path.extname(file) === '.json');
    
    if (jsonFiles.length > 0) {
      let successCount = 0;
      jsonFiles.forEach(backFile => {
        const sourceFile = path.join(backupDir, backFile);
        const baseName = path.basename(backFile,".json");
        const originName = stripBackupSuffix(baseName);
        debug("orginal name",originName, "basename",baseName);
        let destFile = path.join(keysDir, `${originName}.json`);
        if( fs.existsSync(destFile)){
          destFile = path.join(keysDir, backFile);
        }
        
        try {
          fs.renameSync(sourceFile, destFile);
          console.log(`Moved ${baseName} ${backFile} => as ${destFile}`);
          successCount++;
        } catch (error) {
          console.log(`Failed to move ${backFile}: ${error.message}`);
        }
      });

      
      console.log(`\nSuccessfully moved ${successCount}/${jsonFiles.length} account(s) to backup directory`);
      console.log('All accounts have been restored.')
    } else {      
      console.log('No account files found to restore.');
    }
  } else {
    console.log('backup directory does not exist');
  }
};

module.exports = restore;