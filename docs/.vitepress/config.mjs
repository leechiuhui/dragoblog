import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'DragoBlog',
  description: '我的 VitePress Blog',
  
  // GitHub Pages 部署設定
  base: '/dragoblog/',
  
  // 主題設定
  themeConfig: {
    // 導航欄
    nav: [
      { text: '首頁', link: '/' },
      { text: '關於', link: '/about' },
      { text: '文章', link: '/posts/' }
    ],
    
    // 側邊欄
    sidebar: [
      {
        text: '開始使用',
        items: [
          { text: '介紹', link: '/introduction' },
          { text: '快速開始', link: '/getting-started' }
        ]
      }
    ],
    
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