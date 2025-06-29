import Link from 'next/link';
import styles from '../header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.siteName}>
          ChartComprehend
        </Link>
        
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>
            Home
          </Link>
          <Link href="/archive" className={styles.navLink}>
            Archive
          </Link>
          <Link href="/tags" className={styles.navLink}>
            Topics
          </Link>
          <Link href="/subscribe" className={styles.subscribeButton}>
            Subscribe
          </Link>
        </nav>
      </div>
    </header>
  );
} 