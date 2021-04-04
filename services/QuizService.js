import * as React from "react";
import { db } from '../config/config'

async function getQuestions(matter){
    let listQuestion = []
    await db.ref('/questions')
        .get()
        .then((dataSnapshot) => {
            dataSnapshot.forEach((data) => {
                let matt = data.val().matter
                if ( matt === matter){
                    listQuestion.push(data.exportVal())
                }
            })
        })
    return randomQuestions(listQuestion)
}


function randomQuestions(vetor = []){
    let randomSize = vetor.length -1
    let vetorAux = []
    vetor.forEach((item) => {
        let random = Math.floor(Math.random() * randomSize);
        vetorAux.push(vetor[randomSize])
        randomSize -= 1
    })
    if (vetorAux.length >= 10){
        vetor = []
        for (let i = 0; i < 10; i++) {
            vetor.push(vetorAux[i])
        }
        return vetor
    }
    return vetorAux
}


export default {
    getQuestions
}
