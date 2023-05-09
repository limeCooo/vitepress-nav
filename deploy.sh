#!/usr/bin/env sh

# 忽略错误
#set -e

# 构建
npm run build

# 进入待发布的目录
cd docs/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果部署到 https://<USERNAME>.github.io
 git push -f git@github.com:limeCooo/limeCooo.github.io.git master

cd -
