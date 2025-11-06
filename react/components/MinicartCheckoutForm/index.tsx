import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { useOrderItems } from 'vtex.order-items/OrderItems'

import './MinicartCheckoutForm.global.css'

import { cepMask } from './utils/cep'

const MinicartCheckoutForm = () => {
  const { orderForm } = useOrderForm()
  const { updateQuantity } = useOrderItems()
  // console.log('orderForm >', orderForm)

  const updateOrderForm = () => {
    if (orderForm?.items && orderForm?.items?.length) {
      const item = orderForm.items[0]
      updateQuantity({ uniqueId: item.uniqueId, quantity: item.quantity })
    }
  }

  /* FRETE */
  const [shipping, setShipping] = useState()
  const [errorCep, setErrorCep] = useState(false)
  const [cepPlaceholderText, setCepPlaceholderText] = useState('')
  const [cep, setCep] = useState(() => {
    const hasPostalCode = orderForm?.shipping?.selectedAddress?.postalCode

    if (!hasPostalCode || hasPostalCode === '') {
      return null
    }

    return orderForm?.shipping?.selectedAddress?.postalCode
  })

  const getPostalCode = (inputCepValue: string) =>
    axios.get(`/api/checkout/pub/postal-code/BRA/${inputCepValue}`)

  const postShipping = async (inputCepValue: string) => {
    setCep(inputCepValue)

    const { data: addressData } = await getPostalCode(inputCepValue)

    const shippingData = {
      selectedAddresses: [
        {
          ...addressData,
          addressId: null,
          addressType: null,
          receiverName: null,
          addressQuery: '',
          isDisposable: null,
        },
      ],
      clearAddressIfPostalCodeNotFound: false,
    }

    axios
      .post(
        `/api/checkout/pub/orderForm/${orderForm.id}/attachments/shippingData`,
        shippingData
      )
      .then(function (response) {
        setShipping(response.data.shippingData.logisticsInfo[0].slas[0].price)
        updateOrderForm()
        setErrorCep(false)
      })
      .catch(() => {
        setErrorCep(true)
        setCep('')
      })
  }

  // const calculoFrete = () => {
  //   if (cep) {
  //     if (!IsCEP(cep)) {
  //       setErrorCep(true)
  //       setCep('')
  //       return false
  //     }
  //     setErrorCep(false)
  //     postShipping(cep)
  //   }
  //   return true
  // }

  const isPostalCode = (code: string) => {
    const dashedPattern = /^[0-9]{5}-[0-9]{3}$/
    const pattern = /^[0-9]{8}$/

    const test1 = dashedPattern.test(code)
    const test2 = pattern.test(code)

    if (!test1 && !test2) {
      return false
    }

    return true
  }

  const showCepPlaceholderText = (placeholderText: string) => {
    setCepPlaceholderText(placeholderText)
    setTimeout(() => setCepPlaceholderText(''), 3000)
  }

  const handleInputCep = (cepInputValue: string) => {
    const cepFormatted = cepMask(cepInputValue)
    setCep(cepFormatted)
  }

  const handleSubmitCep = (inputValue: string) => {
    if (!inputValue || inputValue?.length === 0) {
      showCepPlaceholderText('Insira o CEP')
      return
    }

    if (
      inputValue.replace('-', '') ===
      orderForm?.shipping?.selectedAddress?.postalCode
    ) {
      return
    }

    if (inputValue?.length >= 8) {
      if (isPostalCode(inputValue)) {
        postShipping(inputValue)
      } else {
        setErrorCep(true)
        setCep('')
        showCepPlaceholderText('CEP inválido')
      }
    } else {
      setCep('')
      showCepPlaceholderText('CEP inválido')
    }
  }

  // useEffect(() => {
  //   if (cep !== null) {
  //     calculoFrete()
  //   }
  // }, [])
  /* END FRETE */

  useEffect(() => {
    setShipping(orderForm?.shipping?.deliveryOptions[0]?.price)
    // eslint-disable-next-line
    if (!orderForm.totalizers[0]) return
  }, [orderForm])

  function currency(value: number | undefined) {
    if (value === undefined) {
      return
    }

    let tmp = value?.toString()?.replace(/[^0-9]/g, '')

    tmp = tmp?.replace(/([0-9]{2})$/g, ',$1')

    if (tmp.length > 6) {
      tmp = tmp?.replace(/([0-9]{3}),([0-9]{2}$)/g, '.$1,$2')
    }

    return `R$ ${tmp}`
  }

  return (
    <div className="minicart-form">
      <div className="minicart-form-inputs">
        <div className="row input cep-container divider">
          <label htmlFor="cep">FRETE</label>
          <div className="input_container input_container--coupon">
            <input
              name="cep"
              id="cep"
              maxLength={9}
              placeholder={cepPlaceholderText}
              value={cep ? cepMask(cep) : cep}
              onChange={(e) => handleInputCep(e.target.value)}
            />
            <button onClick={() => handleSubmitCep(cep)}>calcular</button>
          </div>
        </div>
      </div>

      <div className="row sub-total divider">
        <p>Subtotal</p>

        <p>
          R${' '}
          {String(
            (orderForm?.totalizers[0]
              ? orderForm?.totalizers[0].value / 100
              : 0
            ).toFixed(2)
          )?.replace('.', ',')}
        </p>
      </div>

      {!errorCep && orderForm?.shipping?.selectedAddress && (
        <div className="row item">
          <p>Frete</p>

          <p>{currency(shipping)}</p>
        </div>
      )}

      <div className="row total">
        <p>Total</p>

        <p>
          R$ {String((orderForm.value / 100).toFixed(2))?.replace('.', ',')}
        </p>
      </div>
    </div>
  )
}

export default MinicartCheckoutForm
