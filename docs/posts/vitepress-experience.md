---
title: VitePress 使用心得
date: 2024-01-02
author: DragoBlog
tags:
  - VitePress
  - Blog
  - 心得
---

# VitePress 使用心得

經過一段時間使用 VitePress 建立部落格的心得分享。

## 為什麼選擇 VitePress？

在眾多靜態網站生成器中，我最終選擇了 VitePress，主要原因包括：

### 1. 開發體驗優秀
- 基於 Vite 的快速熱重載
- TypeScript 原生支援
- Vue 3 生態系統

### 2. 配置簡單
```javascript
// .vitepress/config.js
export default {
  title: 'My Blog',
  description: 'A VitePress blog'
}
```

### 3. 主題美觀
VitePress 的預設主題非常優雅，並且支援：
- 深色/淺色模式切換
- 響應式設計
- 程式碼高亮顯示

## 使用技巧

### Markdown 擴展
VitePress 支援多種 Markdown 擴展：

::: tip 提示
這是一個提示框
:::

::: warning 警告
這是一個警告框
:::

::: danger 危險
這是一個危險警告框
:::

### 程式碼區塊
```vue
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>
```

## 部署經驗

VitePress 可以輕鬆部署到：
- GitHub Pages
- Vercel
- Netlify
- Cloudflare Pages

## 總結

VitePress 是一個優秀的靜態網站生成器，特別適合：
- 技術文檔
- 個人部落格
- 專案文檔

如果您正在尋找一個現代化的部落格解決方案，我強烈推薦 VitePress！ 