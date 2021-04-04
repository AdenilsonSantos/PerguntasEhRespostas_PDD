import * as React from 'react'
import {Alert, ScrollView, StyleSheet, View} from "react-native";
import { Button, Card, Title } from "react-native-paper";
import MatterService from "../services/MatterService";
import QuizService from "../services/QuizService";


export default function AnswerQuestion({ navigation }){

    const [a, setA] = React.useState(false)
    const [perguntas, setPerguntas] = React.useState([])
    const [pergunta, setPergunta] = React.useState()
    const [matters, setMatters] = React.useState([])

    const getQuestions = React.useCallback((matter) => {
        QuizService.getQuestions(matter).then((response) => {
            console.log(response)
            setPerguntas(response)
            if (response.length === 0){
                Alert.alert('Não existem perguntas para esse assunto')
            }else{
                setPergunta(response.pop())
                setA(true)
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


    const fA = () =>{
        if (pergunta.alternativeCorrect === 'A'){
            //check()
            Alert.alert("Bom trabalho, você acertou!","Vamos lá",[
                {
                    text: "Continue",
                    onPress: () => check()
                }
            ])

        }else{
            //check()
            Alert.alert(`A alternativa correta é:`,'Vamos lá', [
                    {
                        text: "Continue",
                        onPress: () => check()
                    }
                ])

        }
    }
    const fB = () =>{
        if (pergunta.alternativeCorrect === 'B'){
            //check()
            Alert.alert("Bom trabalho, você acertou!")

        }else{
            //check()
            Alert.alert(`A alternativa correta é: ${pergunta.alternativeCorrect}`)

        }
    }

    const check = () => {
        if(!(perguntas.length <= 0)){
            setPergunta(perguntas.pop())
        }else{
            Alert.alert("Finalizamos essa tarefa, até o próxima")
            setA(false)
        }
    }

    const fC = () =>{
        if (pergunta.alternativeCorrect === 'C'){
            //check()
            Alert.alert("Bom trabalho, você acertou!")

        }else{
            //check()
            Alert.alert(`A alternativa correta é: ${pergunta.alternativeCorrect}`)

        }
    }
    const fD = () =>{
        if (pergunta.alternativeCorrect === 'D'){
            //check()
            Alert.alert("Bom trabalho, você acertou!")

        }else{
            //check()
            Alert.alert(`A alternativa correta é: ${pergunta.alternativeCorrect}`)

        }
    }

    return(
        <View style={styles.container}>
            {
                (!a) ?
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
                <Title style={styles.question}>{pergunta?.ask}</Title>
                <Button style={styles.buttonPrimary} mode="contained" onPress={() => fA()}>{pergunta?.alternative_a}</Button>
                <Button style={styles.buttonPrimary} mode="contained" onPress={() => fB()}>{pergunta?.alternative_b}</Button>
                <Button style={styles.buttonPrimary} mode="contained" onPress={() => fC()}>{pergunta?.alternative_c}</Button>
                <Button style={styles.buttonPrimary} mode="contained" onPress={() => fD()}>{pergunta?.alternative_d}</Button>
                </View>
            }
        </View>
    )
}

function Quiz(){

    // const [questions, setQuestions] = React.useState([])
    //
    // const getQuestions = React.useCallback(() => {
    //     MatterService.getMatters().then((response) => {
    //         setQuestions(response)
    //     })
    // }, [])
    //
    // React.useEffect(() => {
    //     getQuestions()
    // }, [getQuestions()])

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
