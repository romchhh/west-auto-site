'use client'
import { useRef, useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { REVIEWS } from '../../data/homeSections'
import { SOCIAL_LINKS } from '../../brand'
import VideoModal from '../VideoModal'
import { SectionHeading } from './SectionHeading'
import styles from './sections.module.css'

function youtubePreviewSrc(id: string) {
  const params = new URLSearchParams({
    autoplay: '1',
    mute: '1',
    controls: '0',
    modestbranding: '1',
    rel: '0',
    playsinline: '1',
    loop: '1',
    playlist: id,
    fs: '0',
    disablekb: '1',
    iv_load_policy: '3',
  })
  return `https://www.youtube.com/embed/${id}?${params.toString()}`
}

function ReviewCard({
  review,
  onOpen,
}: {
  review: (typeof REVIEWS)[number]
  onOpen: () => void
}) {
  const [preview, setPreview] = useState(false)

  return (
    <button
      type="button"
      className={`${styles.reviewCard} ${preview ? styles.reviewCardPreview : ''}`}
      onMouseEnter={() => setPreview(true)}
      onMouseLeave={() => setPreview(false)}
      onFocus={() => setPreview(true)}
      onBlur={() => setPreview(false)}
      onClick={onOpen}
      aria-label="Переглянути відео відгук"
    >
      <Image
        src={review.image}
        alt="Відгук клієнта West Auto Shipping"
        fill
        sizes="(max-width: 768px) 42vw, 220px"
        className={`${styles.reviewImage} ${preview ? styles.reviewImageHidden : ''}`}
      />
      {preview && (
        <iframe
          className={styles.reviewPreview}
          src={youtubePreviewSrc(review.id)}
          title=""
          tabIndex={-1}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      )}
      <span className={styles.reviewOverlay} aria-hidden="true" />
      <span className={styles.reviewPlay} aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
    </button>
  )
}

export default function ReviewsSection() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null)

  const updateNav = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const { scrollLeft, scrollWidth, clientWidth } = track
    setCanPrev(scrollLeft > 8)
    setCanNext(scrollLeft + clientWidth < scrollWidth - 8)
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    updateNav()
    track.addEventListener('scroll', updateNav, { passive: true })
    window.addEventListener('resize', updateNav)
    return () => {
      track.removeEventListener('scroll', updateNav)
      window.removeEventListener('resize', updateNav)
    }
  }, [updateNav])

  const scroll = (direction: 'prev' | 'next') => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector<HTMLElement>(`.${styles.reviewCard}`)
    const gap = 16
    const amount = card ? card.offsetWidth + gap : track.clientWidth * 0.75
    track.scrollBy({ left: direction === 'next' ? amount : -amount, behavior: 'smooth' })
  }

  return (
    <>
      <section id="vidguky" className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.carsHeader}>
            <SectionHeading
              title={<>Відгуки <em>клієнтів</em></>}
              lead="Реальні історії покупки авто з США — дивіться відео наших клієнтів."
            />
            <div className={styles.carouselNav}>
              <button
                type="button"
                className={styles.carouselBtn}
                onClick={() => scroll('prev')}
                disabled={!canPrev}
                aria-label="Попередній відгук"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M11 3 L5 9 L11 15" />
                </svg>
              </button>
              <button
                type="button"
                className={styles.carouselBtn}
                onClick={() => scroll('next')}
                disabled={!canNext}
                aria-label="Наступний відгук"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M7 3 L13 9 L7 15" />
                </svg>
              </button>
            </div>
          </div>

          <div className={styles.carouselViewport}>
            <div ref={trackRef} className={styles.carouselTrack}>
              {REVIEWS.map((review) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  onOpen={() => setActiveVideoId(review.id)}
                />
              ))}
            </div>
          </div>

          <p className={styles.reviewsFollow}>
            Більше відео — на нашому{' '}
            <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer">
              YouTube @west_auto_shipping
            </a>
          </p>
        </div>
      </section>

      <VideoModal
        videoId={activeVideoId}
        items={REVIEWS}
        onClose={() => setActiveVideoId(null)}
      />
    </>
  )
}
