# 分類

## 所有分類（Categories）

<div class="category-tags">
  <a href="#" class="category-tag active" data-category="all">全部文章</a>
  <a href="#" class="category-tag" data-category="daily-notes">每日紀錄</a>
  <a href="#" class="category-tag" data-category="weekly-notes">每週紀錄</a>
  <a href="#" class="category-tag" data-category="universe-school">至青宇宙學校課程分享</a>
  <a href="#" class="category-tag" data-category="life-sharing">生活分享</a>
</div>

<div id="articles-container">
  
  <div class="article-item" data-category="life-sharing">
    <h3><a href="/posts/2024-review.md">2024 年度回顧</a></h3>
    <p class="article-meta">2024-12-31 | 分類：生活分享</p>
    <p class="article-excerpt">時間過得真快，2024 年即將結束。回顧這一年，有收穫也有挑戰，值得記錄和分享。</p>
    <p class="article-tags"><strong>標籤：</strong> `年度回顧` `生活分享` `總結` `成長`</p>
  </div>

  <div class="article-item" data-category="daily-notes">
    <h3><a href="/posts/vue-best-practices.md">Vue.js 最佳實踐</a></h3>
    <p class="article-meta">2024-01-04 | 分類：每日紀錄</p>
    <p class="article-excerpt">分享 Vue.js 開發中的最佳實踐和經驗總結。</p>
    <p class="article-tags"><strong>標籤：</strong> `Vue.js` `前端` `最佳實踐` `框架`</p>
  </div>

  <div class="article-item" data-category="daily-notes">
    <h3><a href="/posts/javascript-advanced.md">JavaScript 進階技巧</a></h3>
    <p class="article-meta">2024-01-03 | 分類：每日紀錄</p>
    <p class="article-excerpt">分享一些實用的 JavaScript 進階技巧和最佳實踐。</p>
    <p class="article-tags"><strong>標籤：</strong> `JavaScript` `前端` `進階` `程式設計`</p>
  </div>

  <div class="article-item" data-category="weekly-notes">
    <h3><a href="/posts/vitepress-experience.md">VitePress 使用心得</a></h3>
    <p class="article-meta">2024-01-02 | 分類：每週紀錄</p>
    <p class="article-excerpt">經過一段時間使用 VitePress 建立部落格的心得分享。</p>
    <p class="article-tags"><strong>標籤：</strong> `VitePress` `Blog` `心得` `靜態網站`</p>
  </div>

  <div class="article-item" data-category="universe-school">
    <h3><a href="/posts/first-post.md">我的第一篇文章</a></h3>
    <p class="article-meta">2024-01-01 | 分類：至青宇宙學校課程分享</p>
    <p class="article-excerpt">歡迎來到我的 VitePress 部落格！</p>
    <p class="article-tags"><strong>標籤：</strong> `開始` `VitePress` `部落格`</p>
  </div>

</div>

<script>
// 全域函數來設置分類篩選功能
function setupCategoryFilter() {
  const categoryTags = document.querySelectorAll('.category-tag');
  const articleItems = document.querySelectorAll('.article-item');

  console.log('Setting up category filter. Tags:', categoryTags.length, 'Articles:', articleItems.length);

  if (categoryTags.length === 0 || articleItems.length === 0) {
    console.log('Elements not found, will retry...');
    return false;
  }

  // 移除現有的事件監聽器（防止重複綁定）
  categoryTags.forEach(tag => {
    const newTag = tag.cloneNode(true);
    tag.parentNode.replaceChild(newTag, tag);
  });

  // 重新獲取元素並添加事件監聽器
  const freshCategoryTags = document.querySelectorAll('.category-tag');
  
  freshCategoryTags.forEach(tag => {
    tag.addEventListener('click', function(e) {
      e.preventDefault();
      const selectedCategory = this.getAttribute('data-category');
      console.log('Category clicked:', selectedCategory);
      
      // 更新 URL hash
      if (selectedCategory === 'all') {
        window.history.replaceState(null, null, window.location.pathname);
      } else {
        window.history.replaceState(null, null, '#' + selectedCategory);
      }
      
      // 執行篩選
      filterArticles(selectedCategory, freshCategoryTags, articleItems);
    });
  });
  
  // 檢查 URL hash 並初始化篩選
  const hash = window.location.hash.substring(1); // 移除 #
  if (hash) {
    filterArticles(hash, freshCategoryTags, articleItems);
  }
  
  return true;
}

// 篩選文章的函數
function filterArticles(selectedCategory, categoryTags, articleItems) {
  // 移除所有 active 狀態
  categoryTags.forEach(t => t.classList.remove('active'));
  
  // 找到對應的標籤並設為 active
  let activeTag = null;
  categoryTags.forEach(tag => {
    if (tag.getAttribute('data-category') === selectedCategory) {
      tag.classList.add('active');
      activeTag = tag;
    }
  });
  
  // 如果沒找到對應標籤，默認選中「全部文章」
  if (!activeTag) {
    categoryTags.forEach(tag => {
      if (tag.getAttribute('data-category') === 'all') {
        tag.classList.add('active');
        selectedCategory = 'all';
      }
    });
  }
  
  // 篩選文章
  articleItems.forEach(item => {
    if (selectedCategory === 'all' || item.getAttribute('data-category') === selectedCategory) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

// 監聽 hash 變化
function handleHashChange() {
  const hash = window.location.hash.substring(1);
  const categoryTags = document.querySelectorAll('.category-tag');
  const articleItems = document.querySelectorAll('.article-item');
  
  if (categoryTags.length > 0 && articleItems.length > 0) {
    filterArticles(hash || 'all', categoryTags, articleItems);
  }
}

// 多種初始化方式確保功能可以正常運行
(function() {
  // 立即嘗試初始化
  if (document.readyState === 'complete') {
    setupCategoryFilter();
  }

  // DOMContentLoaded 事件
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupCategoryFilter);
  }

  // 頁面完全載入後
  window.addEventListener('load', setupCategoryFilter);

  // 監聽 hash 變化
  window.addEventListener('hashchange', handleHashChange);

  // 使用 setTimeout 作為備用方案
  setTimeout(() => {
    if (!setupCategoryFilter()) {
      // 如果第一次失敗，再試一次
      setTimeout(() => {
        if (!setupCategoryFilter()) {
          // 最後一次嘗試
          setTimeout(setupCategoryFilter, 2000);
        }
      }, 1000);
    }
  }, 300);

  // 監聽 VitePress 路由變化（如果存在）
  if (typeof window !== 'undefined' && window.addEventListener) {
    // 監聽 popstate 事件（瀏覽器前進後退）
    window.addEventListener('popstate', () => {
      setTimeout(() => {
        setupCategoryFilter();
        handleHashChange();
      }, 100);
    });
    
    // 監聽可能的路由變化
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;
    
    history.pushState = function() {
      originalPushState.apply(history, arguments);
      setTimeout(() => {
        setupCategoryFilter();
        handleHashChange();
      }, 100);
    };
    
    history.replaceState = function() {
      originalReplaceState.apply(history, arguments);
      setTimeout(() => {
        setupCategoryFilter();
        handleHashChange();
      }, 100);
    };
  }
})();
</script>

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
  cursor: pointer;
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

.article-item {
  margin-bottom: 24px;
  padding: 16px;
  border: 1px solid #e1e5e9;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.article-item:hover {
  border-color: #007bff;
  box-shadow: 0 2px 8px rgba(0, 123, 255, 0.1);
}

.article-item h3 {
  margin: 0 0 8px 0;
  font-size: 18px;
}

.article-item h3 a {
  color: var(--vp-c-brand);
  text-decoration: none;
}

.article-item h3 a:hover {
  text-decoration: underline;
}

.article-meta {
  color: #6c757d;
  font-size: 14px;
  margin: 0 0 8px 0;
}

.article-excerpt {
  color: var(--vp-c-text-1);
  line-height: 1.6;
  margin: 0 0 8px 0;
}

.article-tags {
  color: #6c757d;
  font-size: 14px;
  margin: 0;
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

.dark .article-item {
  border-color: var(--vp-c-divider);
}

.dark .article-item:hover {
  border-color: #007bff;
}

.dark .article-meta,
.dark .article-tags {
  color: var(--vp-c-text-2);
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
  
  .article-item {
    padding: 12px;
  }
  
  .article-item h3 {
    font-size: 16px;
  }
}
</style> 