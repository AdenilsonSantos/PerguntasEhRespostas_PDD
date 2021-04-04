import * as React from 'react';

import {db} from '../config/config';


async function registerMatter(matter){
    let responseMessage = ''
    if (!await existMatter(matter)){
        await db.ref('/matters')
            .push({matter})
            .then((response) => {
                responseMessage = {isSuccess: true, message: "Seu assunto foi cadastro com sucesso"}
            })
            .catch((error) => {
                responseMessage = {isSuccess: false, message: "Não conseguimos cadastrar seu assunto"}
            })
        return responseMessage
    }
    responseMessage = {isSuccess: false, message: "Esse assunto já existe, tente outro nome"}
    return responseMessage

}

async function getMatters(){
    let aux = undefined
    await db.ref('/matters')
        .on('value', (snapshot) => {
            let data = snapshot.val();
            let matters = Object.values(data);
            console.log(matters)
            aux = matters
        })
    return aux
}

async function existMatter(matter){
    await db.ref('/matters')
        .on('value', (snapshot) => {
            let data = snapshot.val();
            let matters = Object.values(data);
            console.log(matters)
            matters.map((mat) => {
                if (mat == matter) return true
            })
        })
    return false
}

export default {
    registerMatter,
    getMatters,
    existMatter
}
