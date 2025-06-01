import DefaultTheme from 'vitepress/theme'
import PostMeta from './components/PostMeta.vue'
import PostList from './components/PostList.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('PostMeta', PostMeta)
    app.component('PostList', PostList)
  }
} 