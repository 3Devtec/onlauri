import React, { useState } from 'react'
import { index as RichText } from 'vtex.rich-text'

import style from './styles.css'

const SeoText = (props: any) => {
  const [visibility, setVisibility] = useState(false)

  return props.text1 ? (
    <div className={style.seoText_container}>
      {props.title.length ? (
        <div className={style.seoText_title}>
          <RichText
            text={props.title}
            textAlignment="CENTER"
            textPosition="CENTER"
          />
        </div>
      ) : null}
      <div className={style.seoText_content}>
        <div className={`${style.seoText_text}`}>
          <RichText
            text={props.text1}
            textAlignment="LEFT"
            textPosition="LEFT"
          />
        </div>
        <div
          className={`${style.seoText_text} ${style.seoText_text2} ${
            visibility ? style.seoText_text2_show : ''
          }`}
        >
          <RichText
            text={props.text2}
            textAlignment="LEFT"
            textPosition="LEFT"
          />
        </div>
        {!visibility ? (
          <div className={`${style.seoText_button} justify-center`}>
            <button
              className={style.seoText_button_readMore}
              onClick={() => setVisibility(!visibility)}
            >
              {props.btnTextClose}
            </button>
          </div>
        ) : (
          <div className={style.seoText_button}>
            <button
              className={style.seoText_button_readLess}
              onClick={() => setVisibility(!visibility)}
            >
              {props.btnTextOpen}
            </button>
          </div>
        )}
      </div>
    </div>
  ) : null
}

SeoText.defaultProps = {
  title: 'Lorem ipsum dolor',
  text1: 'text1',
  text2: 'text2',
  btnTextOpen: 'Ler mais',
  btnTextClose: 'Ler menos',
}

SeoText.schema = {
  title: 'Texto SEO',
  type: 'object',
  properties: {
    title: {
      default: SeoText.defaultProps.title,
      title: 'Título',
      type: 'string',
    },
    text1: {
      default: SeoText.defaultProps.text1,
      title: 'Texto visivel',
      type: 'string',
      widget: {
        'ui:widget': 'textarea',
      },
    },
    text2: {
      default: SeoText.defaultProps.text2,
      title: 'Texto retratil',
      type: 'string',
      widget: {
        'ui:widget': 'textarea',
      },
    },
    btnTextClose: {
      default: SeoText.defaultProps.btnTextClose,
      title: 'Btn ver menos',
      type: 'string',
    },
    btnTextOpen: {
      default: SeoText.defaultProps.btnTextOpen,
      title: 'Btn ver mais',
      type: 'string',
    },
  },
}

export default SeoText
