import { createContentLoader } from 'vitepress'

export default createContentLoader('posts/*.md', {
  includeSrc: false,
  render: false,
  transform(rawData) {
    const categories = new Map()
    
    rawData.forEach(({ url, frontmatter }) => {
      const category = frontmatter.category
      if (category) {
        if (!categories.has(category)) {
          categories.set(category, [])
        }
        categories.get(category).push({
          title: frontmatter.title,
          url: url.replace('.html', ''),
          date: frontmatter.date,
          tags: frontmatter.tags || [],
          excerpt: frontmatter.description || ''
        })
      }
    })
    
    // 對每個分類的文章按日期排序
    categories.forEach((posts) => {
      posts.sort((a, b) => new Date(b.date) - new Date(a.date))
    })
    
    return Array.from(categories.entries()).map(([category, posts]) => ({
      category,
      posts,
      count: posts.length
    }))
  }
}) 