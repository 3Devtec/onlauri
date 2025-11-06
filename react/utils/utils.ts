import { Seller } from 'vtex.product-context/react/ProductTypes'

export const formatCurrency = (currency: number) => {
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  return formatter.format(currency)
}

export const getDefaultSeller = (sellers?: Seller[]) => {
  if (!sellers || sellers.length === 0) {
    return
  }

  const defaultSeller = sellers.find((seller) => seller.sellerDefault)

  if (defaultSeller) {
    return defaultSeller
  }

  return sellers[0]
}

type Item = {
  id?: string
  quantity?: number
  seller?: string
}

export const simulateShipping = (items?: Item[], countryCode?: string) => {
  if (!items?.length) {
    return null
  }

  // Simulação de preços enviando dados para o carrinho
  const form = {
    items,
    country: countryCode ?? 'BRA',
  }

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  }

  const settings = {
    method: 'POST',
    headers,
    body: JSON.stringify(form),
  }

  return fetch('/api/checkout/pub/orderforms/simulation', settings)
    .then((response) => response.json())
    .then((response) => {
      if (!response) {
        return Promise.resolve(null)
      }

      const responseItems = response?.items
      const listPrice = response?.totals?.[0]?.value / 100

      const sellingPrice =
        (response?.totals?.[0]?.value -
          Math.abs(response?.totals?.[1]?.value || 0)) /
        100

      const discount = response?.totals?.[1]?.value
        ? Math.abs(response?.totals?.[1]?.value) / 100
        : 0

      // Pegando dados de parcelamento
      const creditCard = response?.paymentData?.installmentOptions?.filter(
        (item: any) => item.paymentGroupName === 'creditCardPaymentGroup'
      )

      const getInstallments =
        creditCard && creditCard?.length > 0
          ? creditCard
              ?.reduce((previousValue: any, currentValue: any) =>
                currentValue?.installments?.length >
                previousValue?.installments?.length
                  ? currentValue
                  : previousValue
              )
              ?.installments?.pop()
          : null

      const installmentCount = getInstallments ? getInstallments?.count : 0

      const installmentValue = getInstallments
        ? getInstallments?.value / 100
        : 0

      return Promise.resolve({
        responseItems,
        listPrice,
        sellingPrice,
        discount,
        installmentCount,
        installmentValue,
        messages: response.messages,
      })
    })
}

export const getShowTogetherProducts = async (productId: string) => {
  const url = `/api/catalog_system/pub/products/crossselling/showtogether/${productId}`
  const response = await fetch(url)
  const data = await response.json()

  if (response.status !== 200 || !data) {
    return []
  }

  return data
}

export const onClassChange = (element: Element, callback: any) => {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (
        mutation.type === 'attributes' &&
        mutation.attributeName === 'class'
      ) {
        callback(mutation.target)
      }
    })
  })
  observer.observe(element, { attributes: true })
  return observer.disconnect
}
