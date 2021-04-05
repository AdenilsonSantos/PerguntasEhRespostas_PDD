import * as React from 'react';

import {db} from '../config/config';


async function registerMatter(matter){

    let responseMessage = ''
    if (!existMatter(matter)){
        console.log("Cheguei primeiro")
        await db.ref('/matters')
            .push({matter})
            .then((response) => {
                responseMessage = {isSuccess: true, message: "Seu assunto foi cadastro com sucesso"}
            })
            .catch((error) => {
                responseMessage = {isSuccess: false, message: "Não conseguimos cadastrar seu assunto"}
            })
        return responseMessage
    }else{
        responseMessage = {isSuccess: false, message: "Esse assunto já existe, tente outro nome"}
        return responseMessage
    }
}

async function getMatters(){
    let matters = []
    await db.ref('/matters')
        .get().then((dataSnapshot) => {
            dataSnapshot.forEach((matter) => {
                matters.push(matter.val())
            })
        })
    return matters
}

function existMatter(matter){
    let exist = false
    db.ref('/matters')
        .get()
        .then((dataSnapshot) => {
            dataSnapshot.forEach((matt) => {
                if (matter === matt.exportVal().matter){
                    exist = true
                }
            })
        })
    return exist
}

export default {
    registerMatter,
    getMatters
}
