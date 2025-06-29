import { Outlet } from 'react-router-dom'
import styles from '../header.module.css'

export function Layout() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Articles Charts 2025</h1>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
} 