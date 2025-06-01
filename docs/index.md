---
outline: false
prev: false
next: false
---

# DragoBlog

## 最新文章

### [我的第一篇文章](/posts/first-post.md)

<div class="article-tags">
  <a href="/tags?tag=開始" class="tag tag-primary">開始</a>
  <a href="/tags?tag=VitePress" class="tag tag-secondary">VitePress</a>
  <a href="/tags?tag=部落格" class="tag tag-secondary">部落格</a>
</div>

2024-01-01

歡迎來到我的 VitePress 部落格！

<style>
.article-tags {
  margin: 12px 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  border: none;
  transition: opacity 0.2s ease;
}

.tag:hover {
  opacity: 0.8;
  text-decoration: none;
}

.tag-primary {
  background-color: #5470c6;
  color: white;
}

.tag-secondary {
  background-color: #e5e7eb;
  color: #374151;
}

/* 深色模式支援 */
.dark .tag-secondary {
  background-color: #374151;
  color: #d1d5db;
}

/* 文章標題樣式調整 */
h3 {
  margin-bottom: 8px;
}

h3 + .article-tags + p {
  margin-top: 8px;
  color: #6b7280;
  font-size: 14px;
}

h3 + .article-tags + p + p {
  margin-top: 12px;
  line-height: 1.6;
}

/* 隱藏底部的 Next/Prev 導航 */
.pager-link {
  display: none !important;
}

.VPDocFooter {
  display: none !important;
}
</style>

---