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
  
  <div class="article-item" data-category="universe-school">
    <h3><a href="/posts/first-post.md">我的第一篇文章</a></h3>
    <p class="article-meta">2024-01-01 | 分類：至青宇宙學校課程分享</p>
    <p class="article-excerpt">歡迎來到我的 VitePress 部落格！</p>
    <p class="article-tags"><strong>標籤：</strong> `開始` `VitePress` `部落格`</p>
  </div>

</div>

<script>
// 檢查是否在瀏覽器環境中
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  // 獲取 URL 參數的函數
  function getURLParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }

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
        
        // 更新 URL - 使用 query parameter 而不是 hash
        if (selectedCategory === 'all') {
          window.history.pushState(null, null, window.location.pathname);
        } else {
          window.history.pushState(null, null, `${window.location.pathname}?category=${encodeURIComponent(selectedCategory)}`);
        }
        
        // 執行篩選
        filterArticles(selectedCategory, freshCategoryTags, articleItems);
      });
    });
    
    // 檢查 URL parameter 或 hash 並初始化篩選
    let initialCategory = getURLParameter('category'); // 優先使用 query parameter
    if (!initialCategory) {
      initialCategory = window.location.hash.substring(1); // 備用：使用 hash
    }
    
    if (initialCategory) {
      filterArticles(initialCategory, freshCategoryTags, articleItems);
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

  // 監聽瀏覽器前進後退
  function handlePopState() {
    const category = getURLParameter('category') || window.location.hash.substring(1);
    const categoryTags = document.querySelectorAll('.category-tag');
    const articleItems = document.querySelectorAll('.article-item');
    
    if (categoryTags.length > 0 && articleItems.length > 0) {
      filterArticles(category || 'all', categoryTags, articleItems);
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

    // 監聽瀏覽器前進後退
    window.addEventListener('popstate', handlePopState);

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
      // 監聽可能的路由變化
      const originalPushState = history.pushState;
      const originalReplaceState = history.replaceState;
      
      history.pushState = function() {
        originalPushState.apply(history, arguments);
        setTimeout(() => {
          setupCategoryFilter();
          handlePopState();
        }, 100);
      };
      
      history.replaceState = function() {
        originalReplaceState.apply(history, arguments);
        setTimeout(() => {
          setupCategoryFilter();
          handlePopState();
        }, 100);
      };
    }
  })();
}
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
  border-radius: 0;
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
  text-decoration: none;
}

.category-tag.active {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
  text-decoration: none;
}

.article-item {
  margin-bottom: 24px;
  padding: 16px;
  border: 1px solid #e1e5e9;
  border-radius: 0;
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