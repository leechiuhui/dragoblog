import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'DragoBlog',
  description: '我的 VitePress Blog',
  
  // GitHub Pages 部署設定 - 使用自定義域名時設為 '/'
  base: '/',
  
  // 主題設定
  themeConfig: {
    // 本地搜尋
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜尋文章',
                buttonAriaLabel: '搜尋文章'
              },
              modal: {
                noResultsText: '無法找到相關結果',
                resetButtonTitle: '清除查詢條件',
                footer: {
                  selectText: '選擇',
                  navigateText: '切換',
                  closeText: '關閉'
                }
              }
            }
          }
        }
      }
    },
    
    // 導航欄
    nav: [
      { text: '首頁', link: '/' },
      // { text: '文章', link: '/posts/' },
      { text: '分類', link: '/categories/' },
      { text: '標籤', link: '/tags/' },
      { text: '關於', link: '/about' }
    ],
    
    // 統一側邊欄 - 只顯示文章列表
    sidebar: [
      {
        text: '📖 所有文章',
        collapsed: false,
        items: [
          // { text: '2024 年度回顧', link: '/posts/2024-review' },
          // { text: 'Vue.js 最佳實踐', link: '/posts/vue-best-practices' },
          // { text: 'JavaScript 進階技巧', link: '/posts/javascript-advanced' },
          // { text: 'VitePress 使用心得', link: '/posts/vitepress-experience' },
          { text: '2025-06-01', link: '/posts/20250601-daily-note' }
        ]
      }
    ],
    
    // 確保右側目錄正常顯示
    outline: {
      level: [2, 3],
      label: '目錄'
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