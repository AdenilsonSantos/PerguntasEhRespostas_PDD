import * as Yup from 'yup'

const registerValidator =  Yup.object().shape({
    fullName: Yup.string()
        .trim()
        .required("Insira seu nome"),
    email: Yup.string()
        .email("Insira um e-mail válido")
        .required("Insira um e-mail"),
    password: Yup.string()
        .min(8, ({ min }) => `A senha deve conter ${min} caracteres no mínimo`)
        .max(10, ({max}) => `A senha não pode ter mais que ${max} caracteres.`)
        .trim()
        .required("Insira a senha")
})

const loginValidator =  Yup.object().shape({
    email: Yup.string()
        .email("Insira um e-mail válido")
        .required("Insira um e-mail"),
    password: Yup.string()
        .min(8, ({ min }) => `A senha deve conter ${min} caracteres no mínimo`)
        .max(10, ({max}) => `A senha não pode ter mais que ${max} caracteres.`)
        .nullable("Insira a senha")
        .trim()
        .required("Insira a senha")
})

const questionValidator =  Yup.object().shape({
    matter: Yup.string()
        .required("Insira ou crie um assunto"),
    ask: Yup.string()
        .trim()
        .required("Insira uma pergunta"),
    alternative_a: Yup.string()
        .trim()
        .required("Insira a alternativa A"),
    alternative_b: Yup.string()
        .trim()
        .required("Insira a alternativa B"),
    alternative_c: Yup.string()
        .trim()
        .required("Insira a alternativa C"),
    alternative_d: Yup.string()
        .trim()
        .required("Insira a alternativa D"),
    alternativeCorrect: Yup.string()
        .required("Selecione uma alternativa para ser a correta")
})

const matterValidator =  Yup.object().shape({
    matter: Yup.string()
        .trim()
        .required("Insira um assunto")
})

export default {
    registerValidator,
    loginValidator,
    questionValidator,
    matterValidator
}
