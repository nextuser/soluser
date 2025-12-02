# soluser
## 安装
```shell
npm install -g soluser@latest
```
### 通过下载代码做本地安装的方法
```
git clone git@github.com:nextuser/soluser.git
cd soluser
npm link
```

## 查看版本
```shell
$ soluser --version
```

## 新建账号
```shell
$ soluser new  alice 
$ soluser new  bob --word-length 12
$ soluser new  charlie --word-length 24 --without-passphrase
```

## 切换账号
```shell
$ soluser switch  bob
```

## 列出账号
```shell
$ soluser list
```

## 删除账号
```shell
$ soluser remove alice
```

## 查看alias对应的地址
```shell
$ soluser address alice
```

## 查看alias对应的余额
```shell
$ soluser balance alice
```

## airdrop 给alias
```shell
$ soluser airdrop 5 alice
Requesting airdrop of 5 SOL

Signature: 4BLUt5uxutbEwVywBTbAoBnG4EKb6QgsHgk3JRfjy6uJCoNjxdyYodbAhsWPXquBBwVzui1WyQxKn9d39JnwS3Pb

500000005 SOL
```

