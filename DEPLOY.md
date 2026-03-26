# 部署指南 - FFRecipe

## 第一步：创建GitHub仓库

### 方法A：使用GitHub网页

1. 打开 https://github.com/new
2. 仓库名：`ffrecipe`
3. 设为 Private 或 Public
4. **不要**勾选 "Add a README file"
5. 点击 "Create repository"

### 方法B：使用GitHub CLI（如已安装）

```bash
gh repo create ffrecipe --private --source=. --push
```

---

## 第二步：推送代码到GitHub

```bash
cd /root/.openclaw/workspace/ffrecipe

# 添加远程仓库（替换 YOUR_USERNAME）
git remote add origin https://github.com/YOUR_USERNAME/ffrecipe.git

# 推送代码
git push -u origin main
```

---

## 第三步：连接Vercel部署

### 方法A：网页操作

1. 打开 https://vercel.com/new
2. 点击 "Import Git Repository"
3. 选择你的 GitHub 仓库 `ffrecipe`
4. 点击 "Import"
5. Framework Preset 会自动检测为 **Next.js**
6. 点击 "Deploy"
7. 等待部署完成

### 方法B：使用Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
cd /root/.openclaw/workspace/ffrecipe
vercel
```

---

## 第四步：绑定自定义域名

### 在Vercel中绑定域名

1. 进入项目 Dashboard
2. 点击 **Settings** → **Domains**
3. 输入 `ffrecipe.com`
4. 点击 "Add"

### 在GoDaddy配置DNS

1. 登录 GoDaddy → 我的域名 → ffrecipe.com
2. 进入 DNS 管理
3. 修改以下记录：

| 类型 | 名称 | 值 | TTL |
|------|------|-----|-----|
| A | @ | 76.76.21.21 | 600 |
| CNAME | www | cname.vercel-dns.com | 600 |

4. 等待DNS生效（通常几分钟到几小时）

---

## 第五步：配置Decap CMS（可选）

### 启用GitHub OAuth

1. 访问 https://github.com/settings/developers
2. 点击 "New OAuth App"
3. 填写：
   - Application name: `FFRecipe CMS`
   - Homepage URL: `https://ffrecipe.com`
   - Authorization callback URL: `https://api.vercel.com/v1/oauth2/authorize`
4. 获取 Client ID 和 Client Secret

### 更新CMS配置

编辑 `public/admin/config.yml`：

```yaml
backend:
  name: github
  repo: YOUR_USERNAME/ffrecipe
  branch: main
```

### 使用Vercel无服务器函数（推荐）

创建 `api/auth.js` 用于CMS认证：

```javascript
import { OAuth2Backend } from 'decap-cms-backend-oauth2';

export default OAuth2Backend({
  clientId: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
});
```

---

## 完成！

- **网站地址**: https://ffrecipe.com
- **CMS后台**: https://ffrecipe.com/admin
- **Vercel控制台**: https://vercel.com/dashboard

---

## 常用命令

```bash
# 本地开发
npm run dev

# 构建测试
npm run build

# 生成新文章（占位内容）
node scripts/generate-content.js --category life-insurance --topic "新文章标题"

# 推送更新
git add . && git commit -m "更新内容" && git push
```
