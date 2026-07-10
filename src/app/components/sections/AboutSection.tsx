import { SectionHeading } from './SectionHeading'
import styles from './sections.module.css'

export default function AboutSection() {
  return (
    <section id="pro-nas" className={`${styles.section} ${styles.aboutSection}`}>
      <div className={styles.inner}>
        <div className={styles.aboutCard}>
          <SectionHeading
            title={<>Ми не просто доставляємо автомобілі — ми допомагаємо зробити <em>правильний вибір</em></>}
          />
          <div className={styles.aboutContent}>
            <p>
              West Auto Shipping — команда, яка супроводжує клієнтів на кожному етапі пригону автомобіля зі США.
            </p>
            <p>
              Ми цінуємо чесність, прозорість та довгострокову довіру. Саме тому відкрито показуємо процес роботи,
              надаємо всю необхідну інформацію про автомобіль ще до покупки та завжди залишаємося на зв&apos;язку.
            </p>
            <p className={styles.aboutGoal}>Наша мета — щоб ви отримали автомобіль, яким будете задоволені.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
