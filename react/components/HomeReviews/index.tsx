import React from 'react'
import { index as RichText } from 'vtex.rich-text'
import { SliderLayout } from 'vtex.slider-layout'

import style from './styles.css'

interface Props {
  isActive: boolean
  reviews: Reviews[]
}
interface Reviews {
  stars: string
  reviewText: string
  reviewAuthorImage: string
  reviewsAuthorName: string
  reviewsProductName: string
}

const HomeReviews = ({ isActive, reviews }: Props) => {
  return isActive ? (
    <div className={style.HomeReviews_container}>
      <SliderLayout
        showPaginationDots="never"
        infinite
        fullWidth={false}
        itemsPerPage={{
          desktop: 2,
          tablet: 1,
          phone: 1,
        }}
        centerMode={{
          desktop: 'center',
          tablet: 'center',
          mobile: 'center',
        }}
      >
        {reviews.map((item: any, index: any) => {
          return (
            <div className={style.HomeReviews_content} key={index}>
              <div className={style.HomeReviews_review_container}>
                <div
                  className={`${style.HomeReviews_stars}`}
                  data-rating={item?.stars}
                >
                  <span
                    className={`${style.HomeReviews_star} ${style.HomeReviews_star_1}`}
                  >
                    ★
                  </span>
                  <span
                    className={`${style.HomeReviews_star} ${style.HomeReviews_star_2}`}
                  >
                    ★
                  </span>
                  <span
                    className={`${style.HomeReviews_star} ${style.HomeReviews_star_3}`}
                  >
                    ★
                  </span>
                  <span
                    className={`${style.HomeReviews_star} ${style.HomeReviews_star_4}`}
                  >
                    ★
                  </span>
                  <span
                    className={`${style.HomeReviews_star} ${style.HomeReviews_star_5}`}
                  >
                    ★
                  </span>
                </div>
                <div className={`${style.HomeReviews_review}`}>
                  <RichText
                    text={item?.reviewText}
                    textAlignment="CENTER"
                    textPosition="CENTER"
                  />
                </div>
              </div>
              <div className={style.HomeReviews_author_infos}>
                <div className={`${style.HomeReviews_image}`}>
                  <img
                    src={item?.reviewAuthorImage}
                    width="86px"
                    height="86px"
                    alt="Avatar do usuário"
                  />
                </div>
                <div className={`${style.HomeReviews_author_product}`}>
                  <div className={`${style.HomeReviews_product}`}>
                    <RichText
                      text={item?.reviewsProductName}
                      textAlignment="LEFT"
                      textPosition="LEFT"
                    />
                  </div>
                  <div className={`${style.HomeReviews_author}`}>
                    <RichText
                      text={item?.reviewsAuthorName}
                      textAlignment="LEFT"
                      textPosition="LEFT"
                    />
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </SliderLayout>
    </div>
  ) : null
}

HomeReviews.schema = {
  title: 'Home Reviews',
  type: 'object',
  properties: {
    isActive: {
      title: 'Ativar componente',
      type: 'boolean',
      default: true,
    },
    reviews: {
      title: 'Lista de Reviews',
      type: 'array',
      items: {
        properties: {
          __editorItemTitle: {
            title: 'Nome no Editor',
            type: 'string',
          },
          stars: {
            title: 'Quantidade de Estrelas',
            type: 'string',
            enum: ['1', '2', '3', '4', '5'],
            enumNames: ['1', '2', '3', '4', '5'],
            widget: {
              'ui:widget': 'radio',
              'ui:options': {
                inline: true,
              },
            },
          },
          reviewText: {
            title: 'Texto Review',
            type: 'string',
            widget: {
              'ui:widget': 'textarea',
            },
          },
          reviewAuthorImage: {
            title: 'Imagem do Autor',
            type: 'string',
            widget: {
              'ui:widget': 'image-uploader',
            },
          },
          reviewsAuthorName: {
            title: 'Nome do Autor',
            type: 'string',
            widget: {
              'ui:widget': 'textarea',
            },
          },
          reviewsProductName: {
            title: 'Nome do Produto',
            type: 'string',
            widget: {
              'ui:widget': 'textarea',
            },
          },
        },
      },
    },
  },
}

export default HomeReviews
