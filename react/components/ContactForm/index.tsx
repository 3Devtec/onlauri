import React, { useEffect, useState } from 'react'
import axios from 'axios'

import style from './styles.css'

const ContactForm = () => {
  const [name, setName] = useState('')
  const [telephone, setTelephone] = useState('')
  const [email, setEmail] = useState('')
  const [orderNumber, setOrderNumber] = useState('')
  const [storeType, setStoreType] = useState('')
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)

  const submit = (e) => {
    e.preventDefault()

    return axios
      .post('/api/dataentities/CO/documents', {
        Nome: name,
        Telefone: telephone,
        Email: email,
        NumeroPedido: orderNumber,
        TipoLoja: storeType,
        Mensagem: message,
      })
      .then(() => setSuccess(true))
  }

  useEffect(() => {
    if (success) {
      setName('')
      setTelephone('')
      setEmail('')
      setOrderNumber('')
      setStoreType('')
      setMessage('')

      setTimeout(() => {
        setSuccess(false)
      }, 10000)
    }
  }, [success])

  return (
    <div className={style.ContactForm_container}>
      <form onSubmit={submit}>
        <div className={style.row1}>
          <p className={style.mandatoryMessage}>
            * Campos de preenchimento obrigatório
          </p>
        </div>
        <div className={style.row2}>
          <input
            type="text"
            placeholder="Nome*"
            value={name}
            onChange={({ target: { value } }) => setName(value)}
            required
          ></input>
          <input
            type="tel"
            placeholder="Telefone*"
            value={telephone}
            onChange={({ target: { value } }) => setTelephone(value)}
            required
          ></input>
          <input
            type="email"
            placeholder="E-mail*"
            value={email}
            onChange={({ target: { value } }) => setEmail(value)}
            required
          ></input>
        </div>
        <div className={style.row3}>
          <input
            type="text"
            placeholder="Número do pedido*"
            value={orderNumber}
            onChange={({ target: { value } }) => setOrderNumber(value)}
            required
          ></input>
          <select
            value={storeType}
            onChange={({ target: { value } }) => setStoreType(value)}
          >
            <option value="">Loja física ou virtual?</option>
            <option value="Física">Física</option>
            <option value="Virtual">Virtual</option>
          </select>
        </div>
        <div className={style.row4}>
          <textarea
            placeholder="Mensagem*"
            value={message}
            onChange={({ target: { value } }) => setMessage(value)}
            required
          ></textarea>
        </div>
        <div className={style.row5}>
          <p className={style.mandatoryMessage}>
            * Campos de preenchimento obrigatório
          </p>
        </div>
        <div className={style.row6}>
          <button type="submit">Enviar</button>
        </div>
      </form>
      {success && (
        <div className={`${style.ContactForm_container} ${style.success}`}>
          <h6>E-mail cadastrado com sucesso!</h6>
        </div>
      )}
    </div>
  )
}

export default ContactForm
