<template>
  <div class="post-meta">
    <div class="meta-item">
      <strong>分類：</strong>
      <span class="category">{{ frontmatter.category }}</span>
    </div>
    
    <div class="meta-item">
      <strong>標籤：</strong>
      <span class="tags">
        <span v-for="tag in frontmatter.tags" :key="tag" class="tag">
          {{ tag }}
        </span>
      </span>
    </div>
    
    <div class="meta-item">
      <strong>發布日期：</strong>
      <span class="date">{{ formatDate(frontmatter.date) }}</span>
    </div>
  </div>
</template>

<script setup>
import { useData } from 'vitepress'

const { frontmatter } = useData()

const formatDate = (dateString) => {
  if (!dateString) return ''
  
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  
  return `${year}年${month}月${day}日`
}
</script>

<style scoped>
.post-meta {
  padding: 0;
  margin: 20px 0 30px 0;
  font-size: 16px;
  line-height: 1.8;
  color: var(--vp-c-text-1);
}

.meta-item {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.meta-item:last-child {
  margin-bottom: 0;
}

.meta-item strong {
  color: var(--vp-c-text-1);
  margin-right: 8px;
  font-weight: 500;
  font-size: 16px;
}

.category {
  background-color: #4285f4;
  color: white;
  padding: 4px 12px;
  border-radius: 0;
  font-size: 14px;
  font-weight: 500;
  display: inline-block;
  text-decoration: none;
}

.tags {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  background-color: #4285f4;
  color: white;
  padding: 4px 12px;
  border-radius: 0;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  text-decoration: none;
}

.tag:hover {
  background-color: #3367d6;
}

.date {
  color: var(--vp-c-text-1);
  font-weight: 500;
  font-size: 16px;
}

/* 響應式設計 */
@media (max-width: 768px) {
  .post-meta {
    font-size: 15px;
    margin: 16px 0 24px 0;
  }
  
  .meta-item {
    margin-bottom: 10px;
  }
  
  .meta-item strong {
    margin-right: 6px;
    font-size: 15px;
  }
  
  .category {
    font-size: 13px;
    padding: 3px 10px;
  }
  
  .tag {
    font-size: 13px;
    padding: 3px 10px;
  }
  
  .date {
    font-size: 15px;
  }
}

/* 深色模式 */
.dark .category {
  background-color: #4285f4;
}

.dark .tag {
  background-color: #4285f4;
}

.dark .tag:hover {
  background-color: #3367d6;
}
</style> 