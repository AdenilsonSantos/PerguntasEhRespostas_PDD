import * as React from 'react';

import {db} from '../config/config';


async function registerMatter(matter){
    let responseMessage = ''
    await db.ref('/matters')
        .push(matter)
        .then((response) => {
           responseMessage = {isSuccess: true, message: "Seu assunto foi cadastro com sucesso"}
        })
        .catch((error) => {
            responseMessage = {isSuccess: false, message: "Não conseguimos cadastrar seu assunto"}
        })
    return responseMessage
}

export default {
    registerMatter
}
