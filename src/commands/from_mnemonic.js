const  { Keypair } = require( '@solana/web3.js');
const  bip39 = require( 'bip39');
const  { Buffer } = require( 'buffer');
const  bs58 = require( 'bs58');
const  fs = require( 'fs');
const  path = require( 'path');
const {debug} = require('../utils/debug');
//根据助记词推算密钥(secretkey)和地址(publickey)
///const ed25519 = = require('ed25519-hd-keyed25519-hd-key')
const ed25519 = require( 'ed25519-hd-key');
const { fileURLToPath } = require('url');
// BIP44路径
const BIP44_SOLANA_PATH = "m/44'/501'/0'/0'";


function generate_keypair_path(mnemonic,bip44path) {
        // 生成种子
        const seed =  bip39.mnemonicToSeedSync(mnemonic);
        //console.log('seed ', seed)
        const hex_bytes=  seed.toString('hex');
        //console.log("hex seed byte",Buffer.from(hex_bytes));
        debug("****BIP44_PATH:",bip44path);
        // 派生密钥
        const derivedSeed = ed25519.derivePath(bip44path,hex_bytes).key
        // 创建 ED25519 密钥对
        const keypair = Keypair.fromSeed(derivedSeed.slice(0, 32)); // 只取前32字节
        return keypair;
}

function importMnemonic(mnemonic,alias) {
    // 验证助记词
    if (!bip39.validateMnemonic(mnemonic)) {
        debug("mnemonic is ",mnemonic);
        throw new Error('无效的助记词');
    }
    let keypair = generate_keypair_path(mnemonic,BIP44_SOLANA_PATH);

    // 对公钥进行哈希处理
// 输出公钥和私钥
    console.log('Address:', keypair.publicKey.toBase58());
    //console.log('SOLANA Private Key:', bs58.encode(keypair.secretKey)); // Base64 编码私钥

    write_secretekey(keypair,alias);
}

function test() {
    // 输入助记词
    const mnemonic = process.env.MNEMONIC; // 替换为你的助记词
    if (!mnemonic) {
        console.log('Your need export MNEMONIC=  ')
        process.exit(-1)
    }


    importMnemonic(mnemonic,'abc');
}


function write_secretekey(keypair ,alias){
    let arr = [];
    keypair.secretKey.forEach((item)=>{
        arr.push(item)
    })

    let account= keypair.publicKey.toBase58()
    let msg = JSON.stringify(arr);
    alias = alias || account;
    //console.log('msg ', msg)
    let file = path.resolve(process.env.HOME,".config/solana/keys/" , alias + ".json");
    fs.writeFileSync(file,msg)
    console.log("write file  :",file);
}

if (process.env.TEST == "true"){
    test()
}
module.exports = importMnemonic;