const examples = `

## 查看版本

$ soluser --version


## 新建账号

$ soluser new  alice 
$ soluser new  bob --word-length 12
$ soluser new  charlie --word-length 24 --without-passphrase


## 切换账号

$ soluser switch  bob


## 列出账号

$ soluser list


## 删除账号

$ soluser remove alice

## 查看alias对应的地址

$ soluser address alice

## 查看alias对应的余额

$ soluser balance alice

## airdrop 给alias

$ soluser airdrop 5 alice
`;

const chalk = require('chalk');
function getExamples() {
    let msg = '';  
    examples.split('\n').forEach(line => {
        if(line.trim().startsWith('#')){
            msg += chalk.gray(line.trim()) + '\n';
        } else if(line.trim().startsWith('$')){
            msg += chalk.cyan(line.trim()) + '\n';
        }
    })
    console.log(msg);
}

function showExamples(){
    console.log(getExamples());
};

//showExamples();
module.exports = { getExamples, showExamples };