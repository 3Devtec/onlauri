import React from 'react'

import style from './styles.css'

interface Props {
  isActive: boolean
  stores: Stores[]
}
interface Stores {
  storeImage: string
  storeName: string
  storeAddress: string
  storeOpenTime: string
  storeCep: string
  storeEmail: string
  storeTelefone: string
  storeWhatsapp: string
  storeCta: string
}

const OurStores = ({ isActive, stores }: Props) => {
  return isActive ? (
    <div className={style.OurStores_container}>
      {stores.map((item: any, index: any) => {
        return (
          <div className={style.OurStores_content} key={index}>
            <div className={`${style.OurStores_img_container}`}>
              <img
                src={item?.storeImage}
                width="360px"
                height="auto"
                alt="Loja"
              />
            </div>
            <div className={style.OurStores_text_container}>
              <div className={style.OurStores_text}>
                <h2>{item?.storeName}</h2>
              </div>
              <div className={style.OurStores_text}>
                <p>
                  <b>Endereço: </b>
                  {item?.storeAddress}
                </p>
              </div>
              <div className={style.OurStores_text}>
                <p>
                  <b>Horário: </b>
                  {item?.storeOpenTime}
                </p>
              </div>
              <div className={style.OurStores_text}>
                <p>
                  <b>CEP: </b>
                  {item?.storeCep}
                </p>
              </div>
              <div className={style.OurStores_text}>
                <p>
                  <b>Email: </b>
                  {item?.storeEmail}
                </p>
              </div>
              <div
                className={`${style.OurStores_text} ${style.OurStores_text_contact}`}
              >
                <p>
                  <b>Telefone: </b>
                  <span className={style.OurStores_text_brand_secondary}>
                    {item?.storeTelefone}
                  </span>
                  <b> | Whatsapp: </b>
                  <span className={style.OurStores_text_brand_secondary}>
                    {item?.storeWhatsapp}
                  </span>
                </p>
              </div>
              <div className={style.OurStores_text}>
                <p className={style.OurStores_text_check_stores}>
                  <span>Compras na Loja</span>
                  <span>Retirada na loja</span>
                </p>
              </div>
              <div className={style.OurStores_cta_container}>
                <a className={style.OurStores_cta} href={item?.storeCta}>
                  VER MAPA
                </a>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  ) : null
}

OurStores.schema = {
  title: 'Minhas Lojas - Componente',
  type: 'object',
  properties: {
    isActive: {
      title: 'Ativar componente',
      type: 'boolean',
      default: true,
    },
    stores: {
      title: 'Lista de Lojas',
      type: 'array',
      items: {
        properties: {
          __editorItemTitle: {
            title: 'Nome no Editor',
            type: 'string',
          },
          storeImage: {
            title: 'Image Loja',
            type: 'string',
            widget: {
              'ui:widget': 'image-uploader',
            },
          },
          storeName: {
            title: 'Nome da Loja',
            type: 'string',
            widget: {
              'ui:widget': 'textarea',
            },
          },
          storeAddress: {
            title: 'Endereço da Loja',
            type: 'string',
            widget: {
              'ui:widget': 'textarea',
            },
          },
          storeOpenTime: {
            title: 'Horário de funcionamento da Loja',
            type: 'string',
            widget: {
              'ui:widget': 'textarea',
            },
          },
          storeCep: {
            title: 'CEP da Loja',
            type: 'string',
            widget: {
              'ui:widget': 'textarea',
            },
          },
          storeEmail: {
            title: 'E-mail da Loja',
            type: 'string',
            widget: {
              'ui:widget': 'textarea',
            },
          },
          storeTelefone: {
            title: 'Telefone da Loja',
            type: 'string',
            widget: {
              'ui:widget': 'textarea',
            },
          },
          storeWhatsapp: {
            title: 'Whatsapp da Loja',
            type: 'string',
            widget: {
              'ui:widget': 'textarea',
            },
          },
          storeCta: {
            title: 'CTA da Loja',
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

export default OurStores
