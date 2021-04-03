import * as React from 'react';

import {db} from '../config/config';


async function registerMatter(matter, uidUser){
    let responseMessage = ''
    if (await existMatter(matter)){
        responseMessage = {isSuccess: false, message: "Esse assunto já existe, tente outro nome"}
        return responseMessage
    }
    await db.ref('/matters')
        .push({matter, uidUser})
        .then((response) => {
           responseMessage = {isSuccess: true, message: "Seu assunto foi cadastro com sucesso"}
        })
        .catch((error) => {
            responseMessage = {isSuccess: false, message: "Não conseguimos cadastrar seu assunto"}
        })
    return responseMessage
}

async function getMatters(){
    let aux = undefined
    await db.ref('/matters')
        .on('value', (snapshot) => {
            let data = snapshot.val();
            let matters = Object.values(data);
            aux = matters
        })
    return aux
}

async function existMatter(matter){
    await db.ref('/matters')
        .on('value', (snapshot) => {
            let data = snapshot.val();
            let matters = Object.values(data);
            matters.map((matters) => {
                if (matters === matter) return true
            })
        })
}

export default {
    registerMatter,
    getMatters
}
