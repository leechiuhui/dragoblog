<template>
  <div class="post-list">
    <h2>最新文章</h2>
    
    <div v-if="posts.length === 0" class="no-posts">
      目前還沒有文章。
    </div>
    
    <article v-for="post in posts" :key="post.url" class="post-item">
      <h3>
        <a :href="post.url">
          <span v-if="post.isProtected">🔒 </span>{{ post.title }}
        </a>
      </h3>
      
      <div class="article-tags" v-if="post.tags && post.tags.length > 0">
        <a 
          v-for="tag in post.tags" 
          :key="tag"
          :href="`/tags?tag=${encodeURIComponent(tag)}`" 
          class="tag tag-secondary"
        >
          {{ tag }}
        </a>
      </div>
      
      <div class="post-meta">
        {{ formatDate(post.date) }}
      </div>
      
      <!-- 密碼保護文章的特殊處理 -->
      <div v-if="post.isProtected" class="protected-preview">
        <div class="password-notice">
          <span class="lock-icon">🔒</span>
          <span class="notice-text">此文章受密碼保護，需要輸入密碼才能查看完整內容</span>
        </div>
        <a :href="post.url" class="read-more-protected">點擊進入並輸入密碼</a>
      </div>
      
      <!-- 普通文章顯示摘要 -->
      <p v-else-if="post.excerpt" class="post-excerpt">
        {{ post.excerpt }}
      </p>
    </article>
  </div>
</template>

<script setup>
import { data as posts } from '../../data/posts.data.js'

const formatDate = (dateString) => {
  if (!dateString) return ''
  
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  
  return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
}
</script>

<style scoped>
.post-list {
  margin-top: 24px;
}

.post-list h2 {
  margin-bottom: 24px;
  font-size: 24px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.no-posts {
  color: var(--vp-c-text-2);
  font-style: italic;
  text-align: center;
  padding: 40px 0;
}

.post-item {
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.post-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.post-item h3 {
  margin: 0 0 12px 0;
  font-size: 20px;
  font-weight: 600;
}

.post-item h3 a {
  color: var(--vp-c-brand);
  text-decoration: none;
  transition: color 0.2s ease;
}

.post-item h3 a:hover {
  color: var(--vp-c-brand-darker);
  text-decoration: underline;
}

.article-tags {
  margin: 12px 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 0;
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

.tag-secondary {
  background-color: #4285f4;
  color: white;
}

.post-meta {
  margin: 8px 0;
  color: var(--vp-c-text-2);
  font-size: 14px;
}

.post-excerpt {
  margin: 12px 0 0 0;
  line-height: 1.6;
  color: var(--vp-c-text-1);
}

/* 密碼保護文章樣式 */
.protected-preview {
  margin: 12px 0 0 0;
}

.password-notice {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: linear-gradient(135deg, #667eea20, #764ba220);
  border: 1px solid #667eea40;
  border-radius: 8px;
  margin-bottom: 12px;
}

.lock-icon {
  font-size: 16px;
}

.notice-text {
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.4;
}

.read-more-protected {
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  background: var(--vp-c-brand);
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.2s ease;
}

.read-more-protected:hover {
  background: var(--vp-c-brand-darker);
  text-decoration: none;
}

/* 深色模式支援 */
.dark .tag-secondary {
  background-color: #4285f4;
  color: white;
}

.dark .password-notice {
  background: linear-gradient(135deg, #667eea10, #764ba210);
  border-color: #667eea30;
}

.dark .notice-text {
  color: var(--vp-c-text-2);
}

/* 響應式設計 */
@media (max-width: 768px) {
  .post-list h2 {
    font-size: 20px;
    margin-bottom: 20px;
  }
  
  .post-item {
    margin-bottom: 24px;
    padding-bottom: 20px;
  }
  
  .post-item h3 {
    font-size: 18px;
    margin-bottom: 10px;
  }
  
  .tag {
    font-size: 13px;
    padding: 3px 10px;
  }
  
  .password-notice {
    padding: 10px 12px;
  }
  
  .notice-text {
    font-size: 13px;
  }
  
  .read-more-protected {
    padding: 6px 12px;
    font-size: 13px;
  }
}
</style> 