'use client'
import Image from 'next/image'
import { PROCESS_CARDS } from '../../data/homeSections'
import { useContactModal } from '../ContactModalContext'
import { SectionHeading } from './SectionHeading'
import styles from './sections.module.css'

export default function ProcessSection() {
  const { openForm } = useContactModal()

  return (
    <section id="proces" className={styles.section}>
      <div className={styles.inner}>
        <SectionHeading
          title={<>Етапи <em>співпраці</em></>}
          lead="Весь процес — зрозумілий та прозорий"
        />
        <div className={styles.processGrid}>
          {PROCESS_CARDS.map(({ steps, image, cta }) => (
            <article key={steps[0].title} className={styles.processCard}>
              <Image
                src={image}
                alt={steps[0].title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className={styles.processImage}
              />
              <div className={styles.processOverlay} aria-hidden="true" />
              <div className={styles.processContent}>
                <div className={styles.processCopy}>
                  {steps.map((step) => (
                    <div key={step.title} className={styles.processStep}>
                      <h3 className={styles.processTitle}>{step.title}</h3>
                      <p className={styles.processText}>{step.description}</p>
                    </div>
                  ))}
                </div>
                <button type="button" className={styles.processCta} onClick={openForm}>
                  {cta}
                  <span className={styles.processCtaIcon} aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 12 L12 2 M5 2 H12 V9" />
                    </svg>
                  </span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
