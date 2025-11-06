import React, { useEffect, useRef } from 'react'
import './global.css'

interface VideoPlayerProps {
  videoUrl: string
  autoplay: boolean
  loop: boolean
  muted: boolean
  controls: boolean
}

export default function VideoPlayer({
  videoUrl,
  autoplay = false,
  loop = false,
  muted = true,
  controls = true,
}: VideoPlayerProps) {
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current !== null && autoplay) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      videoRef.current?.play()
    }
  }, [])

  if (!videoUrl) {
    return null
  }

  return (
    <div className="home-video-player--container">
      {/* eslint-disable-next-line */}
      <video
        className="home-video-player--video"
        src={videoUrl}
        autoPlay={autoplay}
        loop={loop}
        muted={muted}
        controls={controls}
        playsInline
        ref={videoRef}
        /* eslint-disable-next-line */
        //@ts-ignore
        type="video/mp4"
        //   style={{ width, height }}
      />
    </div>
  )
}

VideoPlayer.schema = {
  title: 'Configurações de vídeo',
  type: 'object',
  properties: {
    videoUrl: {
      title: 'Url do vídeo',
      description: 'Link do vídeo',
      type: 'string',
      format: 'uri',
    },
    autoplay: {
      title: 'Autoplay',
      description: 'Iniciar vídeo automaticamente',
      type: 'boolean',
      default: false,
    },
    loop: {
      title: 'Loop',
      description: 'Reiniciar vídeo automaticamente',
      type: 'boolean',
      default: false,
    },
    muted: {
      title: 'Mudo',
      description: 'Iniciar vídeo mutado',
      type: 'boolean',
      default: true,
    },
    controls: {
      title: 'Mostrar controles',
      description: 'Mostra play, pause, e volume',
      type: 'boolean',
      default: true,
    },
  },
  required: ['videoUrl'],
}
