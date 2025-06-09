import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export function generateSidebar() {
  const postsDir = path.resolve(process.cwd(), 'docs/posts')
  
  // 檢查 posts 目錄是否存在
  if (!fs.existsSync(postsDir)) {
    return [
      {
        text: '📖 所有文章',
        collapsed: false,
        items: []
      }
    ]
  }
  
  // 讀取所有 markdown 文件
  const files = fs.readdirSync(postsDir)
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const filePath = path.join(postsDir, file)
      const content = fs.readFileSync(filePath, 'utf-8')
      const { data: frontmatter } = matter(content)
      
      // 檢查是否需要密碼保護
      const isProtected = !!frontmatter.password
      const titlePrefix = isProtected ? '🔒 ' : ''
      
      return {
        filename: file,
        title: titlePrefix + (frontmatter.title || file.replace('.md', '')),
        date: frontmatter.date || new Date().toISOString().split('T')[0],
        url: `/posts/${file.replace('.md', '')}`,
        isProtected
      }
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date)) // 按日期排序，最新的在前
  
  // 生成側邊欄項目
  const sidebarItems = files.map(file => ({
    text: file.title,
    link: file.url
  }))
  
  return [
    {
      text: '📖 所有文章',
      collapsed: false,
      items: sidebarItems
    }
  ]
} 