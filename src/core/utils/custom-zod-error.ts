export function strMessage(field: string) {
  return {
    required_error: `O campo ${field} é obrigatório.`,
    invalid_type_error: `O campo ${field} deve ser preenchido por uma palavra.`,
  }
}

export function numbMessage(field: string) {
  return {
    required_error: `O campo ${field} é obrigatório.`,
    invalid_type_error: `O campo ${field} deve ser preenchido por um número.`,
  }
}

export function dateMessage(field: string) {
  return {
    required_error: `O campo ${field} é obrigatório.`,
    invalid_type_error: `O campo ${field} deve ser preenchido por uma data.`,
  }
}

export function boolMessage(field: string) {
  return {
    required_error: `O campo ${field} é obrigatório.`,
    invalid_type_error: `O campo ${field} deve ser preenchido por verdadeiro ou falso.`,
  }
}
