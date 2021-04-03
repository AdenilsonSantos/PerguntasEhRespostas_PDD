import * as React from "react";
import { View, Alert, StyleSheet, Image, Keyboard } from "react-native";
import {TextInput, Button, Title, Text} from 'react-native-paper';
import {Formik} from "formik";
import AuthUser from "../Auth/AuthUser";
import Validator from "../validator/validator";

import Logo from '../assets/logo.png'
import {AuthContext} from "../routes/Routes";

//export const AuthenticatedContext = React.createContext()


export default function Login({ navigation }) {

    const {authUser, setAuthUser} = React.useContext(AuthContext)

    const [user, setUser] = React.useState({
        email: '',
        password: ''
    })

    const onSubmit = (values) => {
        console.log("Aqui")
        AuthUser.AuthenticatedUser(
            values.email,
            values.password
        ).then( async (response) => {
            let user = response?.user
            await setAuthUser({isAuthenticated: true, uid: user.uid, name: user.name})
            Alert.alert(response?.message)
        }).catch((error) => {
            Alert.alert(error.message)
        })
    }

    return (
        <View style={styles.container} >

            <Image style={styles.logo} source={Logo} />

            <Formik
                initialValues={user}
                validationSchema={Validator.loginValidator}
                onSubmit={onSubmit}
            >
                {({ handleChange,
                      handleBlur,
                      handleSubmit,
                      errors,
                      values }) => (
                    <>
                        {errors && <Text style={styles.errors}>{errors.email}</Text>}
                        {errors && <Text style={styles.errors}>{errors.password}</Text>}

                        <TextInput
                            style={styles.input}
                            name="email"
                            label="Email"
                            value={values.email}
                            onBlur={handleBlur('email')}
                            onChangeText={handleChange('email')}
                        />
                        <TextInput
                            style={styles.input}
                            name="password"
                            secureTextEntry={true}
                            label="Senha"
                            value={values.password}
                            onBlur={handleBlur('password')}
                            onChangeText={handleChange('password')}
                        />
                        <Button style={styles.buttonPrimary} mode="contained" onPress={handleSubmit}>
                            Entrar na plataforma
                        </Button>
                        <Button style={styles.buttonSecondary} mode="contained" onPress={handleSubmit}>
                            Quero ser membro
                        </Button>
                    </>
                )}
            </Formik>
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
    title: {
        fontSize: 30,
        alignSelf: 'center',
        marginBottom: 5,
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
