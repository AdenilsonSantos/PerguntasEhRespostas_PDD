import * as React from 'react';

import {db} from '../config/config';

async function registerQuestion(ask, alternative_a, alternative_b,
                          alternative_c, alternative_d, alternativeCorrect, matter, uid){
    let responseMessage = ''
    await db.ref('/questions')
        .push(
            {ask,
                alternative_a,
                alternative_b,
                alternative_c,
                alternative_d,
                alternativeCorrect,
                matter
            })
        .then((response) => {
            responseMessage = {isSuccess: true, message: "Sua resposta foi cadastrada com sucesso"}
        }).catch((error) => {
            responseMessage = {isSuccess: false, message: "Não conseguimos cadastrar sua pergunta"}
        })
    return responseMessage
}

export default {
    registerQuestion
}
