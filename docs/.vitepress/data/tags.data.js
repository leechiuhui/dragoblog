import { createContentLoader } from 'vitepress'

export default createContentLoader('posts/*.md', {
  includeSrc: false,
  render: false,
  transform(rawData) {
    const tags = new Map()
    
    rawData.forEach(({ url, frontmatter }) => {
      const postTags = frontmatter.tags || []
      postTags.forEach(tag => {
        if (!tags.has(tag)) {
          tags.set(tag, [])
        }
        tags.get(tag).push({
          title: frontmatter.title,
          url: url.replace('.html', ''),
          date: frontmatter.date,
          category: frontmatter.category,
          excerpt: frontmatter.description || ''
        })
      })
    })
    
    // 對每個標籤的文章按日期排序
    tags.forEach((posts) => {
      posts.sort((a, b) => new Date(b.date) - new Date(a.date))
    })
    
    return Array.from(tags.entries()).map(([tag, posts]) => ({
      tag,
      posts,
      count: posts.length
    }))
  }
}) 