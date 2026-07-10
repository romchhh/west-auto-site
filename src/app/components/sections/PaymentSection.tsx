import { PAYMENT_STEPS } from '../../data/homeSections'
import { SectionHeading } from './SectionHeading'
import styles from './sections.module.css'

export default function PaymentSection() {
  return (
    <section id="oplata" className={`${styles.section} ${styles.paymentSection}`}>
      <div className={styles.inner}>
        <SectionHeading
          title={<>Оплата <em>на капоті</em></>}
          lead="Ви не ризикуєте оплачувати повну вартість авто наперед"
        />

        <div className={styles.paymentSplit}>
          <div className={styles.paymentSplitItem}>
            <span className={styles.paymentSplitValue}>30%</span>
            <span className={styles.paymentSplitLabel}>оплата на початку</span>
          </div>
          <div className={styles.paymentSplitDivider} aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </div>
          <div className={`${styles.paymentSplitItem} ${styles.paymentSplitItemAccent}`}>
            <span className={styles.paymentSplitValue}>70%</span>
            <span className={styles.paymentSplitLabel}>після прибуття в Україну</span>
          </div>
        </div>

        <div className={styles.paymentLayout}>
          <div className={styles.paymentIntro}>
            <p>
              Ми розуміємо, що купівля автомобіля зі США — це важливе рішення. Саме тому ви сплачуєте лише{' '}
              <strong>30%</strong> вартості автомобіля на початку, а решту <strong>70%</strong> — тільки після його
              прибуття в Україну.
            </p>
            <p>
              Це означає, що перед остаточним розрахунком ви вже бачите свій автомобіль і можете переконатися, що він
              відповідає вашим очікуванням.
            </p>
          </div>

          <div className={styles.paymentStepsCard}>
            <h3 className={styles.paymentStepsTitle}>Як це працює?</h3>
            <ol className={styles.paymentStepsList}>
              {PAYMENT_STEPS.map((step, index) => (
                <li key={step} className={index === PAYMENT_STEPS.length - 1 ? styles.paymentStepFinal : undefined}>
                  <span className={styles.paymentStepMarker} aria-hidden="true" />
                  <span className={styles.paymentStepText}>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
