---
title: Vue.js 最佳實踐
date: 2024-01-04
author: DragoBlog
category: 技術筆記
tags:
  - Vue.js
  - 前端
  - 最佳實踐
  - 框架
---

# Vue.js 最佳實踐

分享 Vue.js 開發中的最佳實踐和經驗總結。

## 1. 組件設計原則

### 單一職責原則
每個組件應該只負責一個功能：

```vue
<!-- ❌ 不好的例子 - 一個組件做太多事情 -->
<template>
  <div>
    <header>{{ title }}</header>
    <nav><!-- 導航邏輯 --></nav>
    <main><!-- 主要內容 --></main>
    <footer><!-- 頁腳內容 --></footer>
  </div>
</template>

<!-- ✅ 好的例子 - 拆分成多個組件 -->
<template>
  <div>
    <AppHeader :title="title" />
    <AppNavigation />
    <AppMain />
    <AppFooter />
  </div>
</template>
```

### Props 驗證
始終為 props 提供詳細的驗證：

```vue
<script>
export default {
  name: 'UserCard',
  props: {
    user: {
      type: Object,
      required: true,
      validator: (value) => {
        return value && typeof value.id !== 'undefined' && value.name
      }
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value) => {
        return ['small', 'medium', 'large'].includes(value)
      }
    },
    isActive: {
      type: Boolean,
      default: false
    }
  }
}
</script>
```

## 2. 響應式資料管理

### 使用 Composition API
Vue 3 推薦使用 Composition API：

```vue
<script setup>
import { ref, computed, watch, onMounted } from 'vue'

// 響應式資料
const count = ref(0)
const name = ref('')

// 計算屬性
const doubleCount = computed(() => count.value * 2)

// 監聽器
watch(count, (newVal, oldVal) => {
  console.log(`計數從 ${oldVal} 變為 ${newVal}`)
})

// 生命週期
onMounted(() => {
  console.log('組件已掛載')
})

// 方法
const increment = () => {
  count.value++
}
</script>
```

### 正確使用 reactive 和 ref
```javascript
import { ref, reactive } from 'vue'

// ✅ 基本型別使用 ref
const count = ref(0)
const message = ref('Hello')

// ✅ 物件使用 reactive
const state = reactive({
  users: [],
  loading: false,
  error: null
})

// ❌ 不要對 reactive 物件進行解構
const { users } = state // 會失去響應性

// ✅ 使用 toRefs 解構
const { users } = toRefs(state)
```

## 3. 效能優化

### 使用 v-memo 進行記憶化
```vue
<template>
  <!-- 只有當 item.id 或 item.name 變化時才重新渲染 -->
  <div v-for="item in list" :key="item.id" v-memo="[item.id, item.name]">
    {{ item.name }}
  </div>
</template>
```

### 懶載入組件
```javascript
// 路由懶載入
const Home = () => import('./views/Home.vue')
const About = () => import('./views/About.vue')

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About }
]

// 組件懶載入
export default {
  components: {
    HeavyComponent: () => import('./HeavyComponent.vue')
  }
}
```

### 使用 KeepAlive 快取組件
```vue
<template>
  <KeepAlive :include="['ComponentA', 'ComponentB']">
    <router-view />
  </KeepAlive>
</template>
```

## 4. 狀態管理

### Pinia 最佳實踐
```javascript
// stores/user.js
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  const isLoggedIn = computed(() => !!user.value)
  
  const login = async (credentials) => {
    try {
      const response = await api.login(credentials)
      user.value = response.data
    } catch (error) {
      throw new Error('登入失敗')
    }
  }
  
  const logout = () => {
    user.value = null
  }
  
  return {
    user,
    isLoggedIn,
    login,
    logout
  }
})
```

### 組件中使用 Store
```vue
<script setup>
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

// 響應式解構
const { user, isLoggedIn } = storeToRefs(userStore)
const { login, logout } = userStore
</script>
```

## 5. 樣式管理

### 使用 CSS Modules 或 Scoped CSS
```vue
<template>
  <div :class="$style.container">
    <h1 :class="$style.title">標題</h1>
  </div>
</template>

<style module>
.container {
  padding: 20px;
}

.title {
  color: #333;
  font-size: 24px;
}
</style>
```

### CSS 變數與主題
```vue
<style scoped>
.theme-light {
  --primary-color: #007bff;
  --background-color: #ffffff;
  --text-color: #333333;
}

.theme-dark {
  --primary-color: #0d6efd;
  --background-color: #1a1a1a;
  --text-color: #ffffff;
}

.button {
  background-color: var(--primary-color);
  color: var(--text-color);
}
</style>
```

## 6. 測試策略

### 單元測試
```javascript
// UserCard.spec.js
import { mount } from '@vue/test-utils'
import UserCard from '@/components/UserCard.vue'

describe('UserCard', () => {
  it('should render user name', () => {
    const user = { id: 1, name: 'John Doe' }
    const wrapper = mount(UserCard, {
      props: { user }
    })
    
    expect(wrapper.text()).toContain('John Doe')
  })
  
  it('should emit click event', async () => {
    const wrapper = mount(UserCard, {
      props: { user: { id: 1, name: 'John' } }
    })
    
    await wrapper.find('.user-card').trigger('click')
    
    expect(wrapper.emitted('click')).toBeTruthy()
  })
})
```

## 7. 開發工具與除錯

### 使用 Vue DevTools
- 安裝 Vue DevTools 瀏覽器擴展
- 檢查組件樹狀結構
- 監控 Vuex/Pinia 狀態變化
- 分析組件效能

### 除錯技巧
```vue
<script setup>
import { watchEffect } from 'vue'

// 除錯響應式資料變化
watchEffect(() => {
  console.log('響應式資料變化:', JSON.stringify(state, null, 2))
})

// 在開發環境中暴露到全局
if (process.env.NODE_ENV === 'development') {
  window.debugState = state
}
</script>
```

## 8. 程式碼風格

### 使用 ESLint 和 Prettier
```json
// .eslintrc.js
{
  "extends": [
    "@vue/typescript/recommended",
    "plugin:vue/vue3-recommended"
  ],
  "rules": {
    "vue/multi-word-component-names": "error",
    "vue/component-definition-name-casing": ["error", "PascalCase"]
  }
}
```

### 命名規範
```javascript
// ✅ 組件名稱使用 PascalCase
const UserProfile = defineComponent({})

// ✅ 事件名稱使用 kebab-case
this.$emit('user-updated', user)

// ✅ Props 使用 camelCase
props: {
  userName: String,
  isActive: Boolean
}
```

## 總結

遵循這些最佳實踐將幫助您：

- 📚 **可維護性**：清晰的程式碼結構和命名規範
- 🚀 **效能優化**：合理使用快取和懶載入
- 🧪 **可測試性**：編寫易於測試的組件
- 🔧 **開發效率**：使用適當的工具和除錯技巧
- 👥 **團隊協作**：統一的程式碼風格和規範

持續學習和實踐這些原則，將讓您成為更優秀的 Vue.js 開發者！ 