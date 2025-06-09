---
title: 🔒 私密文章範例
date: 2025-06-08
author: DragoBlog
category: 測試
description: 這是一篇需要密碼才能查看的文章
password: "123456"
tags:
  - 私密
  - 測試
---

# 🔒 私密文章範例

<PostMeta />

<PasswordProtected>

## 這是受保護的內容

恭喜！您已經成功輸入密碼並解鎖了這篇文章。

### 功能說明

- ✅ 密碼保護：在frontmatter中設定 `password: "您的密碼"`
- ✅ 本地記憶：瀏覽器會記住驗證狀態
- ✅ 重新鎖定：可以隨時重新鎖定內容
- ✅ 響應式設計：支持各種屏幕尺寸
- ✅ 深色模式：自動適配深色主題

### 使用方法

在任何markdown文章的frontmatter中添加：

```yaml
---
title: 您的文章標題
password: "您設定的密碼"
---
```

然後用 `<PasswordProtected>` 組件包裹需要保護的內容：

```markdown
<PasswordProtected>
您的私密內容...
</PasswordProtected>
```

### 安全性說明

⚠️ **注意**：這是純前端實現的密碼保護，密碼會出現在網頁源碼中。不適合存放真正敏感的資料，適合用於：

- 個人日記
- 草稿文章  
- 朋友圈分享的私密內容
- 付費內容的簡單保護

如需更高安全性，建議使用伺服器端驗證方案。

</PasswordProtected>

---

*這是一篇示例文章，展示了密碼保護功能的使用方法。* 