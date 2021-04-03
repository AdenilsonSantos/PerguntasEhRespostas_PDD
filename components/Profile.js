import * as React from 'react';
import { View, StyleSheet } from "react-native";
import { Avatar } from 'react-native-elements';
import {AuthContext} from "../routes/Routes";
import {TextInput, Button, Title, Text} from 'react-native-paper';


export default function Profile(){

    const { authUser } = React.useContext(AuthContext)

    return(
        <View style={styles.container}>
            <View style={styles.containerInfoUser}>
                <Avatar
                    containerStyle={styles.avatar}
                    rounded
                    size={230}
                    title= {'AD'}
                    onPress={() => console.log("Works!")}
                    activeOpacity={0.7}
                />
                <Text style={styles.name} >Olá, {authUser.name}</Text>
                <Text style={styles.email} >{authUser.email} email</Text>
            </View>
            <View style={styles.containerButtons}>
                <Button style={styles.buttonPrimary} mode="contained" >Criar um pergunta</Button>
                <Button style={styles.buttonSecondary} mode="contained" >Responder um Questionário</Button>
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
        fontSize: 46,

    },
    email: {
        fontSize: 22
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
        backgroundColor: '#A9A9A9',
        padding: 12
    },
    containerButtons:{
        marginBottom: 200
    }

})
