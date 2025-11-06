import React from 'react'
import { index as RichText } from 'vtex.rich-text'
import { useProduct } from 'vtex.product-context'

import style from './styles.css'

const MedidasComponent = () => {
  const { product } = useProduct()
  const productSpecifications = product?.specificationGroups?.find(
    (item: { name: string }) => item?.name === 'allSpecifications'
  )

  const medidasSkus = productSpecifications?.specifications?.find(
    (item: { name: string }) => item?.name === 'MEDIDAS'
  )?.values?.[0]

  return (
    <div className={style.MedidasComponent_container}>
      <RichText text={medidasSkus} textAlignment="LEFT" textPosition="LEFT" />
    </div>
  )
}

export default MedidasComponent
