# soluser
## 安装
```shell
npm install -g soluser
```
## 新建账号
```shell
$ soluser new charlie
$ soluser new  alice --word-length 12
$ soluser new  bob --word-length 24 --no-bip39-passphrase
```

## 切换账号
```shell
$ soluser switch --address alice
```

## 列出账号
```shell
$ soluser list
```

## 删除账号
```shell
$ soluser remove alice
```

## 本地安装
```shell
npm link
```
