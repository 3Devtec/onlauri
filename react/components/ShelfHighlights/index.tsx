import React from 'react'

interface ShelfHighlightsProps {
  video: boolean
}

const ShelfHighlights = ({
  children,
  video,
}: {
  children: React.ReactNode
  video: ShelfHighlightsProps
}) => {
  if (children == null) return null

  return <div>{video ? children[0] : children[1]}</div>
}

ShelfHighlights.schema = {
  title: 'Ativar/desativar Video',
  type: 'object',
  properties: {
    video: {
      title: 'Exibir vídeos',
      type: 'boolean',
      default: false,
    },
  },
}

export default ShelfHighlights
