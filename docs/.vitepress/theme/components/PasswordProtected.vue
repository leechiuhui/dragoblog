<template>
  <div class="password-protected">
    <!-- 密碼輸入界面 -->
    <div v-if="!isAuthenticated" class="password-form">
      <div class="password-container">
        <h2>🔒 此文章需要密碼</h2>
        <p class="password-hint">請輸入密碼以查看內容</p>
        
        <div class="input-group">
          <input
            v-model="inputPassword"
            type="password"
            placeholder="請輸入密碼"
            class="password-input"
            @keyup.enter="checkPassword"
            @input="clearError"
          />
          <button @click="checkPassword" class="password-button">
            確認
          </button>
        </div>
        
        <div v-if="showError" class="error-message">
          ❌ 密碼錯誤，請重新輸入
        </div>
        
        <div v-if="debugMode" class="debug-info">
          <small>調試信息：需要密碼 "{{ requiredPassword }}"</small>
        </div>
      </div>
    </div>
    
    <!-- 文章內容 -->
    <div v-else class="protected-content">
      <div class="unlock-notice">
        <span>🔓 內容已解鎖</span>
        <button @click="lockContent" class="lock-button">重新鎖定</button>
      </div>
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useData } from 'vitepress'

const { frontmatter } = useData()

const inputPassword = ref('')
const isAuthenticated = ref(false)
const showError = ref(false)
const debugMode = ref(false) // 調試模式

// 從frontmatter獲取密碼
const requiredPassword = computed(() => {
  return frontmatter.value?.password || ''
})

// 生成唯一的存儲key
const storageKey = computed(() => {
  return `auth_${frontmatter.value?.title || 'unknown'}`
})

onMounted(() => {
  // 檢查調試模式
  if (window.location.search.includes('debug=1')) {
    debugMode.value = true
  }
  
  // 檢查是否已經驗證過
  if (typeof window !== 'undefined' && window.localStorage && requiredPassword.value) {
    const stored = localStorage.getItem(storageKey.value)
    if (stored === requiredPassword.value) {
      isAuthenticated.value = true
    }
  }
})

const checkPassword = () => {
  if (inputPassword.value === requiredPassword.value && requiredPassword.value) {
    isAuthenticated.value = true
    showError.value = false
    // 保存驗證狀態
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(storageKey.value, requiredPassword.value)
    }
  } else {
    showError.value = true
    inputPassword.value = ''
  }
}

const clearError = () => {
  showError.value = false
}

const lockContent = () => {
  isAuthenticated.value = false
  inputPassword.value = ''
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.removeItem(storageKey.value)
  }
}
</script>

<style scoped>
.password-protected {
  margin: 2rem 0;
}

.password-form {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  margin: 2rem 0;
}

.password-container {
  background: white;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  width: 100%;
}

.password-container h2 {
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
}

.password-hint {
  color: #666;
  margin-bottom: 2rem;
}

.input-group {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.password-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.password-input:focus {
  outline: none;
  border-color: #667eea;
}

.password-button {
  padding: 0.75rem 1.5rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.password-button:hover {
  background: #5a67d8;
}

.error-message {
  color: #e53e3e;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.debug-info {
  margin-top: 1rem;
  padding: 0.5rem;
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 4px;
  color: #856404;
}

.unlock-notice {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f0fff4;
  border: 1px solid #9ae6b4;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  margin-bottom: 2rem;
  color: #2f855a;
}

.lock-button {
  background: #e2e8f0;
  color: #4a5568;
  border: none;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.lock-button:hover {
  background: #cbd5e0;
}

.protected-content {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 深色模式支持 */
.dark .password-container {
  background: #1a202c;
  color: #e2e8f0;
}

.dark .password-container h2 {
  color: #e2e8f0;
}

.dark .password-input {
  background: #2d3748;
  border-color: #4a5568;
  color: #e2e8f0;
}

.dark .password-input:focus {
  border-color: #667eea;
}

.dark .unlock-notice {
  background: #1a2e1a;
  border-color: #38a169;
  color: #68d391;
}
</style> 