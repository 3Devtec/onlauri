export function Trim(strTexto: string) {
  // Substitúi os espaços vazios no inicio e no fim da string por vazio.
  return strTexto.replace(/^s+|s+$/g, '')
}

export function IsCEP(strCEP: string) {
  // Caso o CEP não esteja nesse formato ele é inválido!
  const objER = /^[0-9]{5}-[0-9]{3}$/
  const objER2 = /^[0-9]{5}[0-9]{3}$/

  strCEP = Trim(strCEP)
  if (strCEP.length > 0) {
    if (objER.test(strCEP) || objER2.test(strCEP)) return true
    return false
  }
  return false
}

export const cepMask = (cepValue: string) => {
  return cepValue.replace(/\D/g, '').replace(/(\d{5})(\d{3})/, '$1-$2')
}
