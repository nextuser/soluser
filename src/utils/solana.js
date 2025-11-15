const { execSync } = require('child_process');
const { getKeyFilePath } = require('./path');

// 执行 shell 命令并返回输出
function execCommand(command) {
  try {
    return execSync(command, { encoding: 'utf8' }).trim();
  } catch (error) {
    throw new Error(`Command failed: ${command}\n${error.stderr}`);
  }
}

// 获取指定密钥的公钥（地址）
function getAddress(alias) {
  const keyPath = getKeyFilePath(alias);
  return execCommand(`solana-keygen pubkey ${keyPath}`);
}

// 获取当前活跃的密钥路径
function getActiveKeyPath() {
  const config = execCommand('solana config get keypair');
  // 从输出中提取路径（例如："Keypair Path: /home/user/.config/solana/keys/alice.json"）
  const match = config.match(/Key Path: (.*)/);
  console.log("config:",config,"config match :",match)
  return match ? match[1] : null;
}

module.exports = {
  execCommand,
  getAddress,
  getActiveKeyPath,
};

