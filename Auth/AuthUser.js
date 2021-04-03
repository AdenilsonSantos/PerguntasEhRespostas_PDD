import Firebase from "firebase";
import {db} from '../config/config';

let UID_USER_AUTHENTICATED = null
let FULLNAME_USER_AUTHENTICATED = null


//Registrar usuário
async function RegisterUser(fullName, email, password){
    let responseMessage = ''
    await Firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(async (userCredential) => {
            let user = userCredential.user;
            await user.updateProfile({displayName: fullName, photoURL: null})
            UID_USER_AUTHENTICATED = user.uid
            FULLNAME_USER_AUTHENTICATED = user.displayName
            responseMessage = {isSussecc: true,
                message: `Bem-vindo a nossa plataforma ${FULLNAME_USER_AUTHENTICATED}`,
                user: {
                    name: FULLNAME_USER_AUTHENTICATED,
                    uid: UID_USER_AUTHENTICATED
                }
            }
        })
        .catch((error) => {
            responseMessage = {isSussecc: false, message: `Não conseguimos concluir seu cadastro. ${error.code}`}
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
            responseMessage = {isSussecc: true,
                message: `Olá ${user.displayName}, você foi autenticado`,
                user: {
                    uid: user.uid,
                    name: user.displayName
                }}
        })
        .catch((error) => {
            responseMessage = {isSussecc: false, message: `Houve algum erro, tente novamente`}
        });
    return responseMessage
}

export default {
    RegisterUser,
    AuthenticatedUser
}
