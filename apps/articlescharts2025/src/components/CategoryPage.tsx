import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import styles from '../page.module.css'
import categories from '../data/categories.json'
import articleData from '../articles/2025-06-10/data.json'

export function CategoryPage() {
  const { categoryId } = useParams()
  const category = categories.categories.find(cat => cat.id === categoryId)
  const article = articleData

  if (!category) {
    return (
      <div className={styles.layout}>
        <main className={styles.mainContent}>
          <h1>Category not found</h1>
        </main>
      </div>
    )
  }

  return (
    <div className={styles.layout}>
      <main className={styles.mainContent}>
        <div className={styles.categoryHeader}>
          <div className={styles.categoryIcon}>{category.icon}</div>
          <h1 className={styles.categoryTitle}>{category.name}</h1>
          <p className={styles.categoryDescription}>{category.description}</p>
        </div>
        <div className={styles.articleList}>
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
        </div>
      </main>
      <aside className={styles.sidebar}>
        <section className={styles.sidebarSection}>
          <h2 className={styles.sidebarTitle}>Related Categories</h2>
          <div className={styles.topicsList}>
            {categories.categories
              .filter(cat => cat.id !== categoryId)
              .map(cat => (
                <Link
                  key={cat.id}
                  to={`/articles/categories/${cat.id}`}
                  className={styles.topicTag}
                >
                  {cat.name}
                </Link>
              ))}
          </div>
        </section>
      </aside>
    </div>
  )
} 