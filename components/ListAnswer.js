import * as React from 'react'
import {ScrollView, StyleSheet, View} from "react-native";
import { Button, Card, Title } from "react-native-paper";
import MatterService from "../services/MatterService";


export default function AnswerQuestion({ navigation }){

    const [answer, setAnswer] = React.useState()

    const getAnswer = React.useCallback(async () => {
        await MatterService.getMatters().then((response) => {
            //setMatters(response)
        })
    }, [])

    React.useEffect(() => {
        getAnswer().then(r => "")
    }, [getAnswer()])

    return(

        <View style={styles.container}>
           <Title></Title>
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
