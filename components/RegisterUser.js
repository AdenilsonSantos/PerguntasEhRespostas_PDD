import React, {useState} from "react";
import { View, Alert, StyleSheet } from "react-native";
import {TextInput, Button, Title, Text} from 'react-native-paper';
import {Formik} from "formik";

import AuthUser from "../Auth/AuthUser";
import Validator from "../validator/validator";
import {AuthContext} from "../routes/Routes";


export default function RegisterUser({ navigation }) {

    const { authUser, setAuthUser } = React.useContext(AuthContext)

    const [ user ] = useState({
        fullName: '',
        email: '',
        password: ''
    })

    const onSubmit = (values, {resetForm}) => {
        AuthUser.RegisterUser(
            values.fullName,
            values.email,
            values.password
        ).then((response) => {
            Alert.alert(response?.message)
            if (response?.isSuccess){
                AuthUser.AuthenticatedUser(
                    values.email,
                    values.password
                ).then( async (response) => {
                    let user = response?.user
                    await setAuthUser({isAuthenticated: true, uid: user.uid, name: user.name, email: user.email})
                })
            }
        })
    }

    return (
        <View style={styles.container} >

            <Title style={styles.title} >Seja mais um membro</Title>

            <Formik
                initialValues={user}
                validationSchema={Validator.registerValidator}
                onSubmit={(values, {resetForm}) => {
                    onSubmit(values, resetForm)
                }}
            >
                {({ handleChange,
                      handleBlur,
                      handleSubmit,
                      resetForm,
                      errors,
                      values }) => (
                    <>
                        {errors && <Text style={styles.errors} >{errors.fullName}</Text>}
                        {errors && <Text style={styles.errors}>{errors.email}</Text>}
                        {errors && <Text style={styles.errors}>{errors.password}</Text>}
                        <TextInput
                            style={styles.input}
                            name="fullName"
                            label="Nome Completo"
                            value={values.fullName}
                            onBlur={handleBlur('fullName')}
                            onChangeText={handleChange('fullName')}
                        />
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
                            Torna-se membro
                        </Button>
                        <Button style={styles.buttonSecondary} mode="contained" onPress={() =>{
                            navigation.navigate('Acessar')
                            resetForm({values: ''})
                        } }>
                            Agora não
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
    }
})
