<template>
  <div class="tag-page">
    <h1>標籤</h1>
    <h2>所有標籤（Tags）</h2>

    <div class="tag-buttons">
      <a 
        href="#" 
        class="tag-button" 
        :class="{ active: selectedTag === 'all' }"
        @click="filterByTag('all')"
      >
        全部文章
      </a>
      <a 
        v-for="tagData in tagsData" 
        :key="tagData.tag"
        href="#" 
        class="tag-button"
        :class="{ active: selectedTag === tagData.tag }"
        @click="filterByTag(tagData.tag)"
      >
        {{ tagData.tag }} ({{ tagData.count }})
      </a>
    </div>

    <div id="articles-container">
      <div 
        v-for="post in filteredPosts" 
        :key="post.url" 
        class="article-item"
      >
        <h3>
          <a :href="post.url">{{ post.title }}</a>
        </h3>
        <p class="article-meta">
          {{ formatDate(post.date) }} | 分類：{{ post.category }}
        </p>
        <p class="article-excerpt" v-if="post.excerpt">
          {{ post.excerpt }}
        </p>
        <p class="article-tags" v-if="post.tags && post.tags.length > 0">
          <strong>標籤：</strong> 
          <span v-for="tag in post.tags" :key="tag" class="tag-item">
            `{{ tag }}`
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { data as posts } from '../../data/posts.data.js'
import { data as tags } from '../../data/tags.data.js'

const selectedTag = ref('all')
const tagsData = ref(tags)

const filteredPosts = computed(() => {
  if (selectedTag.value === 'all') {
    return posts
  }
  return posts.filter(post => 
    post.tags && post.tags.includes(selectedTag.value)
  )
})

const formatDate = (dateString) => {
  if (!dateString) return ''
  
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  
  return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
}

const filterByTag = (tag) => {
  selectedTag.value = tag
  
  // 更新 URL
  if (tag === 'all') {
    window.history.pushState(null, null, window.location.pathname)
  } else {
    window.history.pushState(null, null, `${window.location.pathname}?tag=${encodeURIComponent(tag)}`)
  }
}

const getURLParameter = (name) => {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get(name)
}

onMounted(() => {
  // 檢查 URL 參數並初始化篩選
  const urlTag = getURLParameter('tag')
  if (urlTag) {
    selectedTag.value = decodeURIComponent(urlTag)
  }
  
  // 監聽瀏覽器前進後退
  window.addEventListener('popstate', () => {
    const tag = getURLParameter('tag')
    if (tag) {
      selectedTag.value = decodeURIComponent(tag)
    } else {
      selectedTag.value = 'all'
    }
  })
})
</script>

<style scoped>
.tag-page h1 {
  margin-bottom: 16px;
  font-size: 32px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.tag-page h2 {
  margin-bottom: 24px;
  font-size: 24px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

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

.tag-item {
  margin-right: 4px;
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