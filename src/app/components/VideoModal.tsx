'use client'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Image from 'next/image'
import styles from './VideoModal.module.css'

type ReviewItem = {
  id: string
  image: string
}

type VideoModalProps = {
  videoId: string | null
  items: readonly ReviewItem[]
  onClose: () => void
}

function youtubeEmbedSrc(id: string, autoplay: boolean) {
  return `https://www.youtube.com/embed/${id}?${autoplay ? 'autoplay=1&' : ''}rel=0`
}

export default function VideoModal({ videoId, items, onClose }: VideoModalProps) {
  const open = Boolean(videoId)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const scrollToIndex = useCallback((index: number, behavior: ScrollBehavior = 'smooth') => {
    const scroller = scrollerRef.current
    if (!scroller) return
    const slide = scroller.children[index] as HTMLElement | undefined
    slide?.scrollIntoView({ behavior, block: 'start' })
  }, [])

  const goPrev = useCallback(() => {
    if (activeIndex <= 0) return
    scrollToIndex(activeIndex - 1)
  }, [activeIndex, scrollToIndex])

  const goNext = useCallback(() => {
    if (activeIndex >= items.length - 1) return
    scrollToIndex(activeIndex + 1)
  }, [activeIndex, scrollToIndex, items.length])

  useLayoutEffect(() => {
    if (!open || !videoId) return
    const index = items.findIndex((item) => item.id === videoId)
    if (index < 0) return
    setActiveIndex(index)
    requestAnimationFrame(() => scrollToIndex(index, 'instant'))
  }, [open, videoId, items, scrollToIndex])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose, goNext, goPrev])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [open])

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!open || !scroller) return

    const onScroll = () => {
      const slides = Array.from(scroller.children) as HTMLElement[]
      const center = scroller.scrollTop + scroller.clientHeight / 2
      let closest = 0
      let minDistance = Infinity

      slides.forEach((slide, index) => {
        const slideCenter = slide.offsetTop + slide.offsetHeight / 2
        const distance = Math.abs(center - slideCenter)
        if (distance < minDistance) {
          minDistance = distance
          closest = index
        }
      })

      setActiveIndex(closest)
    }

    scroller.addEventListener('scroll', onScroll, { passive: true })
    return () => scroller.removeEventListener('scroll', onScroll)
  }, [open])

  const canPrev = activeIndex > 0
  const canNext = activeIndex < items.length - 1

  return (
    <div
      className={`${styles.overlay} ${open ? styles.open : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Відео відгуки"
      aria-hidden={!open}
    >
      <button type="button" className={styles.backdrop} onClick={onClose} aria-label="Закрити" tabIndex={open ? 0 : -1} />
      <div className={styles.modal}>
        <button type="button" className={styles.close} onClick={onClose} aria-label="Закрити">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M4 4 L20 20 M20 4 L4 20"/>
          </svg>
        </button>

        {open && (
          <>
            <div className={styles.scrollerWrap}>
              <button
                type="button"
                className={`${styles.navBtn} ${styles.navPrev}`}
                onClick={goPrev}
                disabled={!canPrev}
                aria-label="Попереднє відео"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M11 15 L5 9 L11 3" />
                </svg>
              </button>

              <div ref={scrollerRef} className={styles.scroller}>
                {items.map((item, index) => {
                  const isActive = index === activeIndex
                  const shouldLoad = Math.abs(index - activeIndex) <= 1

                  return (
                    <div key={item.id} className={styles.slide}>
                      <div className={styles.videoWrap}>
                        <Image
                          src={item.image}
                          alt=""
                          fill
                          sizes="400px"
                          className={`${styles.slidePoster} ${isActive && shouldLoad ? styles.slidePosterHidden : ''}`}
                        />
                        {shouldLoad && (
                          <iframe
                            src={youtubeEmbedSrc(item.id, isActive)}
                            title="Відео відгук West Auto Shipping"
                            className={styles.slideIframe}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            referrerPolicy="strict-origin-when-cross-origin"
                          />
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              <button
                type="button"
                className={`${styles.navBtn} ${styles.navNext}`}
                onClick={goNext}
                disabled={!canNext}
                aria-label="Наступне відео"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M7 15 L13 9 L7 3" />
                </svg>
              </button>
            </div>

            <p className={styles.counter}>
              {activeIndex + 1} / {items.length}
              <span className={styles.hint}>Гортайте для наступного</span>
            </p>
          </>
        )}
      </div>
    </div>
  )
}
