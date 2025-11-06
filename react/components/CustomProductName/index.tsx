import React from 'react'
import { useProduct } from 'vtex.product-context'

import styles from './styles.css'

const CustomProductName = () => {
  const { selectedItem, product } = useProduct()

  const productName = `${product?.productName} - ${selectedItem?.name
    ?.split(';')[0]
    ?.toUpperCase()}`

  return (
    <div className={styles.productNameContainer}>
      <h1 className={styles.productNameTitle}>{productName}</h1>
    </div>
  )
}

export default CustomProductName
