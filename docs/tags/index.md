# 標籤

## 所有標籤（Tags）

<div class="tag-buttons">
  <a href="#" class="tag-button active" data-tag="all">全部文章</a>
  <a href="#" class="tag-button" data-tag="vitepress">VitePress</a>
  <a href="#" class="tag-button" data-tag="frontend">前端</a>
  <a href="#" class="tag-button" data-tag="blog">部落格</a>
  <a href="#" class="tag-button" data-tag="javascript">JavaScript</a>
  <a href="#" class="tag-button" data-tag="vue">Vue.js</a>
  <a href="#" class="tag-button" data-tag="programming">程式設計</a>
  <a href="#" class="tag-button" data-tag="advanced">進階</a>
  <a href="#" class="tag-button" data-tag="best-practices">最佳實踐</a>
  <a href="#" class="tag-button" data-tag="experience">生命心得</a>
  <!-- <a href="#" class="tag-button" data-tag="framework">框架</a> -->
  <a href="#" class="tag-button" data-tag="static-site">靜態網站</a>
  <a href="#" class="tag-button" data-tag="yearly-review">年度回顧</a>
  <a href="#" class="tag-button" data-tag="life-sharing">生活分享</a>
  <a href="#" class="tag-button" data-tag="summary">總結</a>
  <a href="#" class="tag-button" data-tag="growth">成長</a>
</div>

<div id="articles-container">
  
  <div class="article-item" data-tags="vitepress blog 開始 VitePress 部落格">
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

  // 全域函數來設置標籤篩選功能
  function setupTagFilter() {
    const tagButtons = document.querySelectorAll('.tag-button');
    const articleItems = document.querySelectorAll('.article-item');

    console.log('Setting up tag filter. Tags:', tagButtons.length, 'Articles:', articleItems.length);

    if (tagButtons.length === 0 || articleItems.length === 0) {
      console.log('Elements not found, will retry...');
      return false;
    }

    // 移除現有的事件監聽器（防止重複綁定）
    tagButtons.forEach(button => {
      const newButton = button.cloneNode(true);
      button.parentNode.replaceChild(newButton, button);
    });

    // 重新獲取元素並添加事件監聽器
    const freshTagButtons = document.querySelectorAll('.tag-button');
    
    freshTagButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        const selectedTag = this.getAttribute('data-tag');
        console.log('Tag clicked:', selectedTag);
        
        // 更新 URL - 使用 query parameter 而不是 hash
        if (selectedTag === 'all') {
          window.history.pushState(null, null, window.location.pathname);
        } else {
          window.history.pushState(null, null, `${window.location.pathname}?tag=${encodeURIComponent(selectedTag)}`);
        }
        
        // 執行篩選
        filterArticlesByTag(selectedTag, freshTagButtons, articleItems);
      });
    });
    
    // 檢查 URL parameter 或 hash 並初始化篩選
    let initialTag = getURLParameter('tag'); // 優先使用 query parameter
    if (!initialTag) {
      initialTag = window.location.hash.substring(1); // 備用：使用 hash
    }
    
    if (initialTag) {
      filterArticlesByTag(initialTag, freshTagButtons, articleItems);
    }
    
    return true;
  }

  // 根據標籤篩選文章的函數
  function filterArticlesByTag(selectedTag, tagButtons, articleItems) {
    // 移除所有 active 狀態
    tagButtons.forEach(button => button.classList.remove('active'));
    
    // 找到對應的標籤按鈕並設為 active
    let activeButton = null;
    tagButtons.forEach(button => {
      const buttonTag = button.getAttribute('data-tag');
      if (buttonTag === selectedTag || 
          (buttonTag === 'vitepress' && selectedTag === 'VitePress') ||
          (buttonTag === 'blog' && selectedTag === '部落格')) {
        button.classList.add('active');
        activeButton = button;
      }
    });
    
    // 如果沒找到對應標籤，默認選中「全部文章」
    if (!activeButton) {
      tagButtons.forEach(button => {
        if (button.getAttribute('data-tag') === 'all') {
          button.classList.add('active');
          selectedTag = 'all';
        }
      });
    }
    
    // 篩選文章
    articleItems.forEach(item => {
      const articleTags = item.getAttribute('data-tags') || '';
      if (selectedTag === 'all' || 
          articleTags.includes(selectedTag.toLowerCase()) ||
          (selectedTag === 'VitePress' && articleTags.includes('vitepress')) ||
          (selectedTag === '部落格' && articleTags.includes('blog')) ||
          (selectedTag === '開始' && articleTags.includes('start'))) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }

  // 監聽瀏覽器前進後退
  function handlePopState() {
    const tag = getURLParameter('tag') || window.location.hash.substring(1);
    const tagButtons = document.querySelectorAll('.tag-button');
    const articleItems = document.querySelectorAll('.article-item');
    
    if (tagButtons.length > 0 && articleItems.length > 0) {
      filterArticlesByTag(tag || 'all', tagButtons, articleItems);
    }
  }

  // 多種初始化方式確保功能可以正常運行
  (function() {
    // 立即嘗試初始化
    if (document.readyState === 'complete') {
      setupTagFilter();
    }

    // DOMContentLoaded 事件
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setupTagFilter);
    }

    // 頁面完全載入後
    window.addEventListener('load', setupTagFilter);

    // 監聽瀏覽器前進後退
    window.addEventListener('popstate', handlePopState);

    // 使用 setTimeout 作為備用方案
    setTimeout(() => {
      if (!setupTagFilter()) {
        // 如果第一次失敗，再試一次
        setTimeout(() => {
          if (!setupTagFilter()) {
            // 最後一次嘗試
            setTimeout(setupTagFilter, 2000);
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
          setupTagFilter();
          handlePopState();
        }, 100);
      };
      
      history.replaceState = function() {
        originalReplaceState.apply(history, arguments);
        setTimeout(() => {
          setupTagFilter();
          handlePopState();
        }, 100);
      };
    }
  })();
}
</script>

<style>
.tag-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 20px 0;
}

.tag-button {
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

.tag-button:hover {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
  text-decoration: none;
}

.tag-button.active {
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
.dark .tag-button {
  background-color: var(--vp-c-bg-mute);
  color: var(--vp-c-text-2);
  border-color: var(--vp-c-divider);
}

.dark .tag-button:hover,
.dark .tag-button.active {
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
  .tag-buttons {
    gap: 6px;
  }
  
  .tag-button {
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