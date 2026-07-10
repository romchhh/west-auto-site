import type { Metadata } from 'next'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ContactForm from '../components/ContactForm'
import ContactMethodsList from '../components/ContactMethodsList'
import { ContactModalProvider } from '../components/ContactModalContext'
import { SectionHeading } from '../components/sections/SectionHeading'
import { BRAND } from '../brand'
import { absoluteUrl } from '../seo'
import contactStyles from '../components/ContactSection.module.css'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Контакти',
  description:
    'Звʼяжіться з West Auto Shipping у Рівному: адреса офісу, телефон, email, соціальні мережі та форма заявки на пригін авто з США.',
  alternates: {
    canonical: absoluteUrl('/kontakty'),
  },
  openGraph: {
    title: 'Контакти — West Auto Shipping',
    description:
      'Офіс у Рівному, консультація з пригону авто з США. Телефон, email, Telegram та форма зворотного звʼязку.',
    url: absoluteUrl('/kontakty'),
  },
}

export default function ContactsPage() {
  return (
    <ContactModalProvider>
      <Navbar />
      <main id="main-content">
        <section className={`${contactStyles.section} ${styles.page}`}>
          <div className={contactStyles.inner}>
            <SectionHeading
              title={<>Маєте <em>запитання?</em></>}
              lead="Залиште заявку або зв'яжіться з нами будь-яким зручним способом."
            />

            <p className={contactStyles.contactNote}>
              Залиште заявку вже сьогодні — і ми безкоштовно підберемо для вас найкращі варіанти автомобілів під ваш
              бюджет.
            </p>

            <div className={contactStyles.panel}>
              <div className={contactStyles.visual}>
                <Image
                  src={BRAND.heroDesktop}
                  alt="West Auto Shipping — офіс у Рівному"
                  fill
                  sizes="(max-width: 900px) 100vw, 48vw"
                  className={contactStyles.img}
                  priority
                />
                <div className={contactStyles.visualOverlay} aria-hidden="true" />
                <div className={contactStyles.visualContent}>
                  <ContactMethodsList />
                </div>
              </div>

              <div className={contactStyles.formCard}>
                <ContactForm idPrefix="contacts-page" />
              </div>
            </div>

            <section className={styles.mapSection} aria-labelledby="map-heading">
              <div className={styles.mapHeader}>
                <h2 id="map-heading" className="section-heading">Як нас знайти</h2>
                <p className="section-lead">{BRAND.address}, {BRAND.city}</p>
              </div>
              <div className={styles.mapWrap}>
                <iframe
                  title={`Карта — ${BRAND.name}, ${BRAND.city}`}
                  src={BRAND.mapEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </ContactModalProvider>
  )
}
