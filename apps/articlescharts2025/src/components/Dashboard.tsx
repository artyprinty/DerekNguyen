import { Link } from 'react-router-dom'
import styles from '../page.module.css'
import articleData from '../articles/2025-06-10/data.json'

interface Article {
  title: string
  summary: string
  tags: string[]
  date: string
  slug: string
  content: {
    intro: string
    keyPoints: string[]
    chartDescription: string
  }
}

export function Dashboard() {
  const article = articleData

  return (
    <div className={styles.layout}>
      <main className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>Latest Articles</h1>
          <Link to="/articles/categories" className={styles.categoriesLink}>
            Browse Categories
          </Link>
        </div>
        <article className={styles.articleCard}>
          <Link to={`/articles/${article.slug}`} className={styles.title}>
            {article.title}
          </Link>
          <p className={styles.summary}>{article.summary}</p>
          <div className={styles.tagList}>
            {article.tags.map(tag => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
          <time className={styles.date}>{article.date}</time>
        </article>
      </main>
      <aside className={styles.sidebar}>
        <section className={styles.sidebarSection}>
          <h2 className={styles.sidebarTitle}>Popular Topics</h2>
          <div className={styles.topicsList}>
            {article.tags.map(tag => (
              <Link
                key={tag}
                to={`/articles/categories/${tag.toLowerCase()}`}
                className={styles.topicTag}
              >
                {tag}
              </Link>
            ))}
          </div>
        </section>
      </aside>
    </div>
  )
} 