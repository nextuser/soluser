# soluser
# 新建账号
soluser new --alias alice --word-length 12
soluser new --alias bob --word-length 24 --no-bip39-passphrase

# 切换账号
soluser switch --address alice

# 列出账号
soluser list

# 本地安装
```shell
npm link
```
