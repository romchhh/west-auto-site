import { BRAND, SOCIAL_LINKS } from '../brand'
import { phoneTel } from '../seo'
import styles from './ContactSection.module.css'

function ContactMethodIcon({ type }: { type: 'phone' | 'telegram' | 'instagram' | 'location' }) {
  const iconClass = styles.contactMethodIcon

  switch (type) {
    case 'phone':
      return (
        <span className={iconClass} aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </span>
      )
    case 'telegram':
      return (
        <span className={iconClass} aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
          </svg>
        </span>
      )
    case 'instagram':
      return (
        <span className={iconClass} aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <circle cx="12" cy="12" r="4.5" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
          </svg>
        </span>
      )
    case 'location':
      return (
        <span className={iconClass} aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </span>
      )
  }
}

export default function ContactMethodsList() {
  return (
    <ul className={styles.contactMethods}>
      <li>
        <a href={`tel:${phoneTel(BRAND.phone)}`}>
          <ContactMethodIcon type="phone" />
          Телефон — {BRAND.phone}
        </a>
      </li>
      <li>
        <a href={SOCIAL_LINKS.telegram} target="_blank" rel="noopener noreferrer">
          <ContactMethodIcon type="telegram" />
          Telegram
        </a>
      </li>
      <li>
        <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer">
          <ContactMethodIcon type="instagram" />
          Instagram
        </a>
      </li>
      <li>
        <a href={BRAND.mapLink} target="_blank" rel="noopener noreferrer">
          <ContactMethodIcon type="location" />
          {BRAND.city}
        </a>
      </li>
    </ul>
  )
}
