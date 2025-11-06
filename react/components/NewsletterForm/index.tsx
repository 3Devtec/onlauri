import React, { useEffect, useState } from 'react'
import axios from 'axios'

import style from './styles.css'

const NewsletterForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  // const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const submit = (e) => {
    e.preventDefault()

    return axios
      .post('/api/dataentities/NL/documents', {
        name,
        email,
      })
      .then(() => setSuccess(true))
  }

  useEffect(() => {
    if (success) {
      setName('')
      setEmail('')

      setTimeout(() => {
        setSuccess(false)
      }, 10000)
    }
  }, [success])

  return (
    <div className={style.newsletter_container}>
      <form onSubmit={submit}>
        <div className={style.line1}>
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={({ target: { value } }) => setName(value)}
            required
          ></input>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={({ target: { value } }) => setEmail(value)}
            required
          ></input>
        </div>
        <div className={style.line2}>
          <button type="submit">Cadastrar</button>
        </div>
      </form>
      {success && (
        <div className={`${style.newsletter_container} ${style.success}`}>
          <h6>E-mail cadastrado com sucesso!</h6>
        </div>
      )}
    </div>
  )
}

export default NewsletterForm
