'use client'
import { useEffect, useState } from 'react'
import { useContactModal } from './ContactModalContext'
import styles from './FloatingCtaButton.module.css'

export default function FloatingCtaButton() {
  const { openForm, formOpen } = useContactModal()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('hero')

    const updateVisibility = () => {
      if (!hero) {
        setVisible(true)
        return
      }
      const { bottom } = hero.getBoundingClientRect()
      setVisible(bottom <= 0)
    }

    updateVisibility()
    window.addEventListener('scroll', updateVisibility, { passive: true })
    window.addEventListener('resize', updateVisibility)
    return () => {
      window.removeEventListener('scroll', updateVisibility)
      window.removeEventListener('resize', updateVisibility)
    }
  }, [])

  if (formOpen || !visible) return null

  return (
    <button
      type="button"
      className={styles.fab}
      onClick={openForm}
      aria-label="Залишити заявку"
    >
      <span className={styles.pulse} aria-hidden="true" />
      <span className={styles.label}>Залишити заявку</span>
      <span className={styles.icon} aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 14 L14 2 M6 2 H14 V10" />
        </svg>
      </span>
    </button>
  )
}
