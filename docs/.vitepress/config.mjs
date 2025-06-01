import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'DragoBlog',
  description: '我的 VitePress Blog',
  
  // GitHub Pages 部署設定 - 使用自定義域名時設為 '/'
  base: '/',
  
  // 主題設定
  themeConfig: {
    // 導航欄
    nav: [
      { text: '首頁', link: '/' },
      // { text: '文章', link: '/posts/' },
      { text: '分類', link: '/categories/' },
      { text: '標籤', link: '/tags/' },
      { text: '關於', link: '/about' }
    ],
    
    // 側邊欄
    sidebar: {
      '/': [
        {
          text: '所有文章',
          items: [
            { text: '我的第一篇文章', link: '/posts/first-post' },
            // { text: 'VitePress 使用心得', link: '/posts/vitepress-experience' },
            // { text: 'JavaScript 進階技巧', link: '/posts/javascript-advanced' },
            // { text: 'Vue.js 最佳實踐', link: '/posts/vue-best-practices' },
            // { text: '2024 年度回顧', link: '/posts/2024-review' }
          ]
        }
      ],
      '/posts/': [
        {
          text: '所有文章',
          items: [
            { text: '我的第一篇文章', link: '/posts/first-post' },
            { text: 'VitePress 使用心得', link: '/posts/vitepress-experience' },
            { text: 'JavaScript 進階技巧', link: '/posts/javascript-advanced' },
            { text: 'Vue.js 最佳實踐', link: '/posts/vue-best-practices' },
            { text: '2024 年度回顧', link: '/posts/2024-review' }
          ]
        }
      ],
      '/categories/': [
        {
          text: '文章分類',
          items: [
            { text: '所有分類', link: '/categories/' },
            { text: '每日紀錄', link: '/categories/daily-notes' },
            { text: '每週紀錄', link: '/categories/weekly-notes' },
            { text: '至青宇宙學校課程分享', link: '/categories/universe-school' },
            { text: '生活分享', link: '/categories/life-sharing' }
          ]
        }
      ],
      '/tags/': [
        {
          text: '熱門標籤',
          items: [
            { text: '標籤雲', link: '/tags/' },
            { text: 'VitePress', link: '/tags/vitepress' },
            { text: 'JavaScript', link: '/tags/javascript' },
            { text: 'Vue.js', link: '/tags/vue' },
            { text: '前端', link: '/tags/frontend' }
          ]
        }
      ]
    },
    
    // 社交連結
    socialLinks: [
      { icon: 'github', link: 'https://github.com/leechiuhui/dragoblog' }
    ],
    
    // 頁腳
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present DragoBlog'
    }
  },
  
  // Markdown 設定
  markdown: {
    lineNumbers: true
  }
}) 