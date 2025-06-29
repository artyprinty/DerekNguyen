import { useParams } from 'react-router-dom'
import { BudgetImpactChart } from './BudgetImpactChart'
import styles from '../page.module.css'
import articleData from '../articles/2025-06-10/data.json'

export function ArticlePage() {
  const { slug } = useParams()
  const article = articleData

  return (
    <main>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 20 }}>
        <article className={styles.articleCard}>
          <h1 className={styles.title} style={{ fontSize: '2rem', marginBottom: '1rem' }}>
            {article.title}
          </h1>
          <div className={styles.tagList} style={{ marginBottom: '1.5rem' }}>
            {article.tags.map(tag => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
          <p className={styles.summary} style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>
            {article.content.intro}
          </p>
          <p className={styles.summary} style={{ marginBottom: '1.5rem' }}>
            <b>Key contentious points include:</b><br />
            {article.content.keyPoints.map((point, index) => (
              <span key={index}>
                • {point}<br />
              </span>
            ))}
          </p>
          <p className={styles.summary} style={{ marginBottom: '2.5rem' }}>
            {article.content.chartDescription}
          </p>
          <BudgetImpactChart />
        </article>
      </div>
    </main>
  )
} 