#!/bin/bash
# FFRecipe 推送脚本
# 在本地执行此脚本

cd /root/.openclaw/workspace/ffrecipe

# 使用 SSH 方式推送（需要配置 SSH Key）
git remote remove origin 2>/dev/null || true
git remote add origin git@github.com:jianglanbo/ffrecipe.git

echo "正在推送到 GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo "✅ 推送成功！"
    echo ""
    echo "下一步："
    echo "1. 打开 https://vercel.com/new"
    echo "2. 导入 jianglanbo/ffrecipe 仓库"
    echo "3. 点击 Deploy 部署"
else
    echo "❌ 推送失败，请检查："
    echo "1. GitHub 仓库是否已创建：https://github.com/new"
    echo "2. SSH Key 是否配置正确"
fi
