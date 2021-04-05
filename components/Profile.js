import * as React from 'react';
import { View, StyleSheet } from "react-native";
import { Avatar } from 'react-native-elements';
import {Button, Text} from 'react-native-paper';

import {AuthContext} from "../routes/Routes";


export default function Profile({ navigation }){

    const { authUser, setAuthUser } = React.useContext(AuthContext)

    const logOut = () => {
        setAuthUser({isAuthenticated: false, uid: '', name: '', email: ''})
    }

    return(
        <View style={styles.container}>
            <View style={styles.containerInfoUser}>
                <Avatar
                    containerStyle={styles.avatar}
                    rounded
                    size={230}
                    title= {authUser.name.substr(0, 1)}
                    onPress={() => console.log("Works!")}
                    activeOpacity={0.7}
                />
                <Text style={styles.name} >Olá, {authUser.name}</Text>
                <Text style={styles.email} >{authUser.email}</Text>
            </View>
            <View style={styles.containerButtons}>
                <Button style={styles.buttonPrimary} mode="contained" onPress={() => navigation.navigate('Registrar Pergunta')} >Criar uma pergunta</Button>
                <Button style={styles.buttonSecondary} mode="contained" onPress={() => navigation.navigate('Responder Questionário')}>Responder um Questionário</Button>
                <Button style={styles.buttonOut} mode="contained" onPress={() => logOut()} >Sair</Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    avatar: {
        backgroundColor: '#A9A9A9'
    },
    containerInfoUser: {
        flex: 1,
        alignItems: 'center',
        marginTop: 100
    },
    name: {
        fontSize: 24,

    },
    email: {
        fontSize: 16
    },
    container: {
        flex: 1,
        padding: 13,
        justifyContent: 'center',
        backgroundColor: '#D3D3D3',
    },
    buttonPrimary: {
        marginTop: 10,
        //backgroundColor: '#6200ee',
        padding: 12
    },
    buttonSecondary:{
        marginTop: 10,
        backgroundColor: '#8944eb',
        padding: 12
    },
    buttonOut:{
        marginTop: 10,
        backgroundColor: '#ab87de',
        padding: 12
    },
    containerButtons:{
        marginBottom: 150
    }

})
