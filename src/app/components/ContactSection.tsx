'use client'
import Image from 'next/image'
import { BRAND } from '../brand'
import ContactForm from './ContactForm'
import ContactMethodsList from './ContactMethodsList'
import { SectionHeading } from './sections/SectionHeading'
import styles from './ContactSection.module.css'

export default function ContactSection() {
  return (
    <section id="kontakt" className={styles.section}>
      <div className={styles.inner}>
        <SectionHeading
          title={<>Маєте <em>запитання?</em></>}
          lead="Залиште заявку або зв'яжіться з нами будь-яким зручним способом."
        />

        <p className={styles.contactNote}>
          Залиште заявку вже сьогодні — і ми безкоштовно підберемо для вас найкращі варіанти автомобілів під ваш
          бюджет.
        </p>

        <div className={styles.panel}>
          <div className={styles.visual}>
            <Image
              src={BRAND.heroDesktop}
              alt="West Auto Shipping — пригін авто з США"
              fill
              sizes="(max-width: 900px) 100vw, 48vw"
              className={styles.img}
            />
            <div className={styles.visualOverlay} aria-hidden="true" />
            <div className={styles.visualContent}>
              <ContactMethodsList />
            </div>
          </div>

          <div className={styles.formCard}>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
