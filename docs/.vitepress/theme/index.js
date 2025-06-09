import DefaultTheme from 'vitepress/theme'
import PostMeta from './components/PostMeta.vue'
import PostList from './components/PostList.vue'
import CategoryList from './components/CategoryList.vue'
import TagList from './components/TagList.vue'
import PasswordProtected from './components/PasswordProtected.vue'
import TestComponent from './components/TestComponent.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('PostMeta', PostMeta)
    app.component('PostList', PostList)
    app.component('CategoryList', CategoryList)
    app.component('TagList', TagList)
    app.component('PasswordProtected', PasswordProtected)
    app.component('TestComponent', TestComponent)
  },
  setup() {
    // 確保在服務器端也能正確處理
  }
} 