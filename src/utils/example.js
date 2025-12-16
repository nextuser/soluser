const examples = `

## Check version

$ soluser --version


## create account

$ soluser new  alice 
$ soluser new  bob --word-length 12
$ soluser new  charlie --word-length 24 --without-passphrase


## Switch account

$ soluser switch  bob

## List all accounts

$ soluser list

## Delete account

$ soluser remove alice

## View address of alias

$ soluser address alice

## View balance of alias

$ soluser balance alice

## airdrop to alias

$ soluser airdrop 5 alice

## import Mnemonic 

$ soluser import "mnemonic ... (12words or 24words)" --alias someone

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