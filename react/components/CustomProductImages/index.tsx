import React, { useEffect, useRef, useState } from 'react'
import { useProduct } from 'vtex.product-context'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/splide/dist/css/splide.min.css'
import type { Options } from '@splidejs/splide'
import { useRuntime } from 'vtex.render-runtime'

import './global.css'
import styles from './styles.css'
import VideoPlayer from '../VideoPlayer'
import ZoomImage from './components/ZoomImage.tsx'

interface CustomProductImages {
  videoFirst?: boolean
}

const CustomProductImages = ({ videoFirst }: CustomProductImages) => {
  const { selectedItem } = useProduct()
  const mainRef = useRef<Splide>(null)
  const thumbsRef = useRef<Splide>(null)
  const { deviceInfo } = useRuntime()
  const [isMainReady, setIsMainReady] = useState(false)
  const [isThumbsReady, setIsThumbsReady] = useState(false)
  const mainOptions: Options = {
    type: 'slide',
    perPage: 1,
    perMove: 1,
    gap: '1rem',
    pagination: false,
    classes: {
      arrows: 'splide__arrows main-arrows',
      prev: 'splide__arrow--prev main-arrow-prev',
      next: 'splide__arrow--next main-arrow-next',
      pagination: 'splide__pagination main-pagination',
    },
  }

  const images = selectedItem?.images ?? []
  const videos = selectedItem?.videos ?? []

  const mediaList = videoFirst
    ? [
        ...videos.map((video) => ({ type: 'video', data: video })),
        ...images.map((image) => ({ type: 'image', data: image })),
      ]
    : [
        ...images.map((image) => ({ type: 'image', data: image })),
        ...videos.map((video) => ({ type: 'video', data: video })),
      ]

  const thumbsOptions: Options = {
    type: 'slide',
    gap: '0.75rem',
    pagination: false,
    isNavigation: true,
    paginationDirection: 'ttb',
    arrows: true,
    direction: 'ttb',
    height: '778px',
    fixedWidth: 143,
    fixedHeight: 200,
  }

  useEffect(() => {
    if (
      isMainReady &&
      isThumbsReady &&
      mainRef.current &&
      thumbsRef.current &&
      thumbsRef.current.splide
    ) {
      mainRef.current.sync(thumbsRef.current.splide)
    }
  }, [isMainReady, isThumbsReady, selectedItem])

  useEffect(() => {
    setIsMainReady(false)
    setIsThumbsReady(false)
  }, [selectedItem])

  return (
    <div className={styles.container}>
      {deviceInfo.isMobile ? (
        <></>
      ) : (
        <div className={styles.thumbContainer}>
          <Splide
            key={selectedItem?.itemId}
            options={thumbsOptions}
            ref={thumbsRef}
            onMounted={() => setIsThumbsReady(true)}
          >
            {mediaList.map((media, index) => (
              <SplideSlide key={index}>
                {media.type === 'image' ? (
                  <img src={media.data.imageUrl} alt={media.data.imageLabel} />
                ) : (
                  <div className={styles.mediaContainer}>
                    <div className={styles.thumbVideo}>
                      <VideoPlayer
                        autoplay={false}
                        controls={false}
                        loop
                        muted
                        videoUrl={media.data.videoUrl}
                      />
                    </div>
                  </div>
                )}
              </SplideSlide>
            ))}
          </Splide>
        </div>
      )}

      <div>
        <Splide
          key={selectedItem?.itemId}
          options={mainOptions}
          ref={mainRef}
          onMounted={() => setIsMainReady(true)}
        >
          {mediaList.map((media, index) => (
            <SplideSlide key={index}>
              {media.type === 'image' ? (
                <ZoomImage
                  src={media.data.imageUrl}
                  alt={media.data.imageLabel}
                />
              ) : (
                <div className={styles.mediaContainer}>
                  <VideoPlayer
                    autoplay
                    controls={false}
                    loop
                    muted
                    videoUrl={media.data.videoUrl}
                  />
                </div>
              )}
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </div>
  )
}

export default CustomProductImages

CustomProductImages.schema = {
  title: 'Configurações da Imagem do Produto',
  type: 'object',
  properties: {
    videoFirst: {
      title: 'Exibir vídeos primeiro',
      description: 'Exibe vídeo antes das imagens',
      type: 'boolean',
    },
  },
}
