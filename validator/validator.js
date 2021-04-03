import * as Yup from 'yup'

const registerValidator =  Yup.object().shape({
    fullName: Yup.string()
        .required("Insira seu nome"),
    email: Yup.string()
        .email("Insira um e-mail válido")
        .required("Insira um e-mail"),
    password: Yup.string()
        .min(8, ({ min }) => `A senha deve conter ${min} caracteres no mínimo`)
        .max(10, ({max}) => `A senha não pode ter mais que ${max} caracteres.`)
        .required("Insira a senha")
})

const loginValidator =  Yup.object().shape({
    email: Yup.string()
        .email("Insira um e-mail válido")
        .required("Insira um e-mail"),
    password: Yup.string()
        .min(8, ({ min }) => `A senha deve conter ${min} caracteres no mínimo`)
        .max(10, ({max}) => `A senha não pode ter mais que ${max} caracteres.`)
        .required("Insira a senha")
})

export default {
    registerValidator,
    loginValidator
}
