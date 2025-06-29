import { Link } from 'react-router-dom'
import styles from '../page.module.css'
import categories from '../data/categories.json'

export function Categories() {
  return (
    <div className={styles.categoriesGrid}>
      {categories.categories.map(category => (
        <Link
          key={category.id}
          to={`/articles/categories/${category.id}`}
          className={styles.categoryCard}
        >
          <div className={styles.categoryIcon}>{category.icon}</div>
          <h3 className={styles.categoryTitle}>{category.name}</h3>
          <p className={styles.categoryDescription}>{category.description}</p>
          <div className={styles.categoryTags}>
            {category.tags.map(tag => (
              <span key={tag} className={styles.categoryTag}>
                {tag}
              </span>
            ))}
          </div>
        </Link>
      ))}
    </div>
  )
} 