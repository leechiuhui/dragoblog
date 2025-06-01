# 分類

## 所有分類（Categories）

<div class="category-tags">
  <a href="/categories/daily-notes" class="category-tag">每日紀錄</a>
  <a href="/categories/weekly-notes" class="category-tag active">每週紀錄</a>
  <a href="/categories/universe-school" class="category-tag">至青宇宙學校課程分享</a>
  <a href="/categories/life-sharing" class="category-tag">生活分享</a>
</div>

## 「每週紀錄」分類下的文章

- [VitePress 使用心得](/posts/vitepress-experience.md)

<style>
.category-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 20px 0;
}

.category-tag {
  background-color: #f8f9fa;
  color: #6c757d;
  padding: 6px 12px;
  border-radius: 4px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  border: 1px solid #dee2e6;
}

.category-tag:hover {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}

.category-tag.active {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}

/* 深色模式 */
.dark .category-tag {
  background-color: var(--vp-c-bg-mute);
  color: var(--vp-c-text-2);
  border-color: var(--vp-c-divider);
}

.dark .category-tag:hover,
.dark .category-tag.active {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}

/* 響應式設計 */
@media (max-width: 768px) {
  .category-tags {
    gap: 6px;
  }
  
  .category-tag {
    font-size: 13px;
    padding: 5px 10px;
  }
}
</style> 