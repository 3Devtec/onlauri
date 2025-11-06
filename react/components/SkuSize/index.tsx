import React, { useEffect } from 'react'
import { useProduct } from 'vtex.product-context'

export const SkuSize = () => {
  const prod = useProduct()
  const targetMeasures = [
    'Medida P',
    'Medida PP',
    'Medida M',
    'Medida G',
    'Medida GG',
  ]

  const result = prod?.product?.properties
    ?.filter((prop) => targetMeasures.includes(prop.name))
    .map((prop) => ({ [prop.name]: prop.values[0] }))

  useEffect(() => {
    if (!result || result.length === 0) return

    const createWrapper = (
      selector: string,
      text: string,
      wrapperClass: string
    ) => {
      const element = document.querySelector(selector) as HTMLElement

      if (element && !element.hasAttribute('data-wrapped')) {
        const parent = element.parentElement

        const wrapper = document.createElement('div')
        wrapper.className = wrapperClass
        Object.assign(wrapper.style, {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '5px',
          fontSize: '12px',
          fontWeight: '400',
          color: '#000000',
        })

        const newDiv = document.createElement('div')
        newDiv.textContent = `Tam.${text}`
        newDiv.className = 'my-custom-size'

        parent?.insertBefore(wrapper, element)
        wrapper.appendChild(element)
        wrapper.appendChild(newDiv)

        element.setAttribute('data-wrapped', 'true')
      }
    }

    const sizeMap: Record<string, { selector: string; wrapper: string }> = {
      'Medida P': {
        selector:
          '.vtex-store-components-3-x-skuSelectorSubcontainer--tamanho .vtex-store-components-3-x-skuSelectorItem--p',
        wrapper: 'my-wrapper-p',
      },
      'Medida M': {
        selector:
          '.vtex-store-components-3-x-skuSelectorSubcontainer--tamanho .vtex-store-components-3-x-skuSelectorItem--m',
        wrapper: 'my-wrapper-m',
      },
      'Medida G': {
        selector:
          '.vtex-store-components-3-x-skuSelectorSubcontainer--tamanho .vtex-store-components-3-x-skuSelectorItem--g',
        wrapper: 'my-wrapper-g',
      },
      'Medida GG': {
        selector:
          '.vtex-store-components-3-x-skuSelectorSubcontainer--tamanho .vtex-store-components-3-x-skuSelectorItem--gg',
        wrapper: 'my-wrapper-gg',
      },
      'Medida PP': {
        selector:
          '.vtex-store-components-3-x-skuSelectorSubcontainer--tamanho .vtex-store-components-3-x-skuSelectorItem--pp',
        wrapper: 'my-wrapper-pp',
      },
    }

    result.forEach((sizeObj) => {
      const sizeName = Object.keys(sizeObj)[0]
      const sizeValue = sizeObj[sizeName]
      const sizeConfig = sizeMap[sizeName]

      if (sizeConfig) {
        createWrapper(sizeConfig.selector, sizeValue, sizeConfig.wrapper)
      }
    })
  }, [prod, result])

  return <></>
}
