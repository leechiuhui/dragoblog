<template>
  <div class="post-list">
    <h2>最新文章</h2>
    
    <div v-if="posts.length === 0" class="no-posts">
      目前還沒有文章。
    </div>
    
    <article v-for="post in posts" :key="post.url" class="post-item">
      <h3>
        <a :href="post.url">{{ post.title }}</a>
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
      
      <p class="post-excerpt" v-if="post.excerpt">
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

/* 深色模式支援 */
.dark .tag-secondary {
  background-color: #4285f4;
  color: white;
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
}
</style> 