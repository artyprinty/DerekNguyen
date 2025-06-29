import BudgetImpactChart from '../../components/BudgetImpactChart';
import styles from '../../page.module.css';

export default function ArticlePage() {
  return (
    <main>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 20 }}>
        <article className={styles.articleCard}>
          <h1 className={styles.title} style={{ fontSize: '2rem', marginBottom: '1rem' }}>
            One Big Bill: The Budgetary Impact of the House Tax and Spending Bill (2025-34)
          </h1>
          <div className={styles.tagList} style={{ marginBottom: '1.5rem' }}>
            <span className={styles.tag}>US Budget</span>
            <span className={styles.tag}>Congress</span>
            <span className={styles.tag}>Tax Policy</span>
            <span className={styles.tag}>Spending</span>
          </div>
          <p className={styles.summary} style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>
            The article describes negotiations between the U.S. House of Representatives and the Senate regarding significant spending bills. The House passed a bill influenced by former President Trump's policies, notably making the 2017 income-tax cuts permanent. The Senate, however, intends significant changes to immigration, energy, social insurance, and defense spending elements, with particular resistance against adding over $3 trillion to the deficit.
          </p>
          <p className={styles.summary} style={{ marginBottom: '1.5rem' }}>
            <b>Key contentious points include:</b><br />
            • Eliminating or curtailing SALT (state-and-local-tax) deductions.<br />
            • Reducing the House's proposed $500 billion tax handouts.<br />
            • Senate Republicans pushing for around $6 trillion in spending cuts, primarily targeting food assistance and Medicaid, though a compromise around $2 trillion is expected.<br />
            • Allowing certain tax cuts to expire, effectively raising taxes, is universally opposed by Republicans.
          </p>
          <p className={styles.summary} style={{ marginBottom: '2.5rem' }}>
            The chart below illustrates the budgetary impact of the bill by category, showing both savings and costs over the next decade.
          </p>
          <BudgetImpactChart />
        </article>
      </div>
    </main>
  );
} 