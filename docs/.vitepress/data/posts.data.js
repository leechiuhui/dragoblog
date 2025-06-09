import { createContentLoader } from 'vitepress'

export default createContentLoader('posts/*.md', {
  includeSrc: false, // 不包含原始markdown內容
  render: false,     // 不渲染HTML
  excerpt: true,     // 包含摘要
  transform(rawData) {
    // 按日期排序，最新的在前面
    return rawData
      .map(({ url, frontmatter, excerpt }) => ({
        title: frontmatter.title,
        url: url.replace('.html', ''),
        date: frontmatter.date,
        category: frontmatter.category,
        tags: frontmatter.tags || [],
        excerpt: excerpt || frontmatter.description || '',
        author: frontmatter.author,
        isProtected: !!frontmatter.password, // 檢查是否有密碼保護
        password: frontmatter.password // 用於調試（生產環境可移除）
      }))
      .sort((a, b) => new Date(b.date) - new Date(a.date))
  }
}) 