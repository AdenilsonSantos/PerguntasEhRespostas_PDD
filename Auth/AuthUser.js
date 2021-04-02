import Firebase from "firebase";

let UID_USER_AUTHENTICATED = null
let FULLNAME_USER_AUTHENTICATED = null

const RegisterUser = async (fullName, email, password) => {
    let responseMessage = undefined
    await Firebase.auth().createUserWithEmailAndPassword(email, password).then( async (userCredential) => {
        let user = userCredential.user
        await user.updateProfile({displayName: fullName, photoURL: null})
        UID_USER_AUTHENTICATED = user.uid
        FULLNAME_USER_AUTHENTICATED = user.displayName
        responseMessage = {isSuccess: true, message: `Bem vindo a nossa plataforma ${fullName}`}
    }).catch((error) => {
        responseMessage = responseMessage = {isSuccess: true, message: `Não foi possível finalizar o cadastro.`}
    })
}
