import Firebase from "firebase";
import {db} from '../config/config'

let UID_USER_AUTHENTICATED = null
let FULLNAME_USER_AUTHENTICATED = null
let EMAIL_USER_AUTHENTICATED = null


//Registrar usuário
async function RegisterUser(fullName, email, password){
    let responseMessage = ''
    await Firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(async (userCredential) => {
            let user = userCredential.user;
            await user.updateProfile({displayName: fullName, photoURL: null})
            UID_USER_AUTHENTICATED = user.uid
            FULLNAME_USER_AUTHENTICATED = user.displayName
            EMAIL_USER_AUTHENTICATED = user.email
            responseMessage = {isSuccess: true,
                message: `Bem-vindo a nossa plataforma ${FULLNAME_USER_AUTHENTICATED}`,
                user: {
                    uid: UID_USER_AUTHENTICATED,
                    name: FULLNAME_USER_AUTHENTICATED,
                    email: EMAIL_USER_AUTHENTICATED
                }
            }
        })
        .catch(() => {
            responseMessage = {isSuccess: false, message: 'E-mail já existente na plataforma'}
        })
    return responseMessage
}

//Autenticar usuário
async function AuthenticatedUser(email, password){
    let responseMessage = ''
    await Firebase.auth().signInWithEmailAndPassword(email, password)
        .then( async (userCredential) => {
            let user = userCredential.user
            UID_USER_AUTHENTICATED = user.uid
            FULLNAME_USER_AUTHENTICATED = user.displayName
            EMAIL_USER_AUTHENTICATED = user.email
            responseMessage = {isSussecc: true,
                message: `Olá ${FULLNAME_USER_AUTHENTICATED}, você foi autenticado`,
                user: {
                    uid: UID_USER_AUTHENTICATED,
                    name: FULLNAME_USER_AUTHENTICATED,
                    email: EMAIL_USER_AUTHENTICATED
                }}
        })
        .catch(() => {
            responseMessage = {isSuccess: false, message: `Houve algum erro, tente novamente`}
        });
    return responseMessage
}


export default {
    RegisterUser,
    AuthenticatedUser
}
