/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
import React, { useState, useRef } from 'react'

import styles from './styles.css'

interface ZoomImageProps {
  src: string
  alt: string
}

const ZoomImage: React.FC<ZoomImageProps> = ({ src, alt }) => {
  const [isZoomed, setIsZoomed] = useState(false)
  const [backgroundPosition, setBackgroundPosition] = useState('center')
  const containerRef = useRef<HTMLDivElement>(null)

  const handleClick = () => {
    setIsZoomed((prev) => !prev)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed || !containerRef.current) return

    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100
    setBackgroundPosition(`${x}% ${y}%`)
  }

  return (
    <div
      ref={containerRef}
      className={`${styles.zoomContainer} ${isZoomed ? styles.zoomed : ''}`}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      style={
        isZoomed
          ? {
              backgroundImage: `url(${src})`,
              backgroundPosition,
            }
          : {}
      }
    >
      {!isZoomed && <img src={src} alt={alt} className={styles.image} />}
    </div>
  )
}

export default ZoomImage
