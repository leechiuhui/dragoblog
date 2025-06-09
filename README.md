# DragoBlog

這是使用 VitePress 建立的個人部落格。

## 開發

```bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm run docs:dev

# 建構
npm run docs:build

# 預覽建構結果
npm run docs:preview
```

## 部署

可以部署到以下平台：
- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages

## 技術

- VitePress
- Vue.js
- Markdown 

＃ 新功能
- 20250609 使用私有倉庫 + GitHub Actions 自動同步達成 讓 posts下的markdown文章，用 ignore的功能，不要上傳到 github上。但是使用者透過瀏覽器可以訪問，也就是將文章放在私有倉庫。
- 20250609 新增密鑰文章功能。