import * as React from 'react'
import {Alert, ScrollView, StyleSheet, View} from "react-native";
import { Button, Card, Title } from "react-native-paper";
import MatterService from "../services/MatterService";
import QuizService from "../services/QuizService";


export default function AnswerQuestion({ navigation }){

    const [startQuizz, setStartQuizz] = React.useState(false)
    const [questions, setQuestions] = React.useState([])
    const [question, setQuestion] = React.useState()
    const [matters, setMatters] = React.useState([])

    const getQuestions = React.useCallback((matter) => {
        QuizService.getQuestions(matter).then((response) => {
            setQuestions(response)
            if (response.length === 0){
                Alert.alert('Assuntos','Não existem perguntas para esse assunto')
            }else{
                setQuestion(response.pop())
                setStartQuizz(true)
            }
        })
    }, [])

    const getMatters = React.useCallback(async () => {
        await MatterService.getMatters().then((response) => {
            setMatters(response)
            console.log(matters)
        })
    }, [])

    React.useEffect(() => {
        getMatters().then(r => "")
    }, [getMatters])

    const check = () => {
        if(!(questions.length <= 0)){
            setQuestion(questions.pop())
        }else{
            Alert.alert('Fim da tarefa',"Finalizamos essa tarefa, até a próxima")
            setStartQuizz(false)
        }
    }

    const fA = () =>{
        if (question.alternativeCorrect === 'A'){
            Alert.alert('Acertou',"Bom trabalho, você acertou!",[
                {
                    text: "Continue",
                    onPress: () => check()
                }
            ])

        }else{
            Alert.alert('Opa, essa você errou',
                `A resposta correta é a ${question.alternativeCorrect}`
                ,
                [
                    {
                        text: "Continue",
                        onPress: () => check()
                    }
                ])

        }
    }
    const fB = () =>{
        if (question.alternativeCorrect === 'B'){
            Alert.alert('Feedback',"Bom trabalho, você acertou!",[
                {
                    text: "Continue",
                    onPress: () => check()
                }
            ])

        }else{
            Alert.alert('Opa, essa você errou',
                `A resposta correta é a ${question.alternativeCorrect}`
                ,
                [
                    {
                        text: "Continue",
                        onPress: () => check()
                    }
                ])

        }
    }

    const fC = () =>{
        if (question.alternativeCorrect === 'C'){
            Alert.alert('Feedback',"Bom trabalho, você acertou!",[
                {
                    text: "Continue",
                    onPress: () => check()
                }
            ])

        }else{
            Alert.alert('Opa, essa você errou',
                `A resposta correta é a ${question.alternativeCorrect}`
                ,
                [
                    {
                        text: "Continue",
                        onPress: () => check()
                    }
                ])

        }
    }
    const fD = () =>{
        if (question.alternativeCorrect === 'D'){
            Alert.alert('Feedback',"Bom trabalho, você acertou!","Vamos lá",[
                {
                    text: "Continue",
                    onPress: () => check()
                }
            ])

        }else{
            Alert.alert('Opa, essa você errou',
                `A resposta correta é a ${question.alternativeCorrect}`
                ,
                [
                    {
                        text: "Continue",
                        onPress: () => check()
                    }
                ])

        }
    }

    return(
        <View style={styles.container}>
            {
                (!startQuizz) ?
                <View >
                    <ScrollView>
                        <Title style={styles.title}>Escolha um assunto</Title>
                        {
                            matters.map((matter) => {
                                return (
                                    <Card key={matter.matter} style={styles.card} >
                                        <Card.Content>
                                            <Title onPress={() => getQuestions(matter.matter)} >{matter.matter}</Title>
                                        </Card.Content>
                                    </Card>
                                )
                            })
                        }
                        <Button style={styles.buttonPrimary} mode="contained" onPress={() => navigation.navigate('Perfil')}>
                            Voltar para meu perfil
                        </Button>
                    </ScrollView>
                </View>
                :
                <View style={styles.container}>
                <Title style={styles.question}>{question?.ask}</Title>
                <Button style={styles.buttonPrimary} mode="contained" onPress={() => fA()}>A) {question?.alternative_a}</Button>
                <Button style={styles.buttonPrimary} mode="contained" onPress={() => fB()}>B) {question?.alternative_b}</Button>
                <Button style={styles.buttonPrimary} mode="contained" onPress={() => fC()}>C) {question?.alternative_c}</Button>
                <Button style={styles.buttonPrimary} mode="contained" onPress={() => fD()}>D) {question?.alternative_d}</Button>
                </View>
            }
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 13,
        justifyContent: 'center',
        backgroundColor: '#D3D3D3',
    },
    question:{
        fontSize: 24,
        marginBottom: 20,
        alignSelf: 'center'
    },
    card:{
        marginTop: 13,
        alignItems: 'center',
        padding:13,
        backgroundColor: '#e7e7e7',
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        borderBottomColor: '#9e9e9e',
        borderBottomWidth: 6,
    },
    title: {
        fontSize: 30,
        alignSelf: 'center',
        marginBottom: 5,
    },
    buttonPrimary: {
        marginTop: 10,
        padding: 12
    },
    buttonSecondary:{
        marginTop: 10,
        backgroundColor: '#A9A9A9',
        padding: 12
    },
    input: {
        marginTop: 7,
        fontSize: 18
    },
    errors: {
        fontSize: 16,
        color: '#FF0000'
    },
    logo:{
        width: 200,
        alignSelf: 'center',
        height: 200,
        resizeMode: 'stretch',
    }

})
