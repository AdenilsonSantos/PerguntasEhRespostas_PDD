import React, {useState} from "react";
import { View } from "react-native";
import { TextInput, Button } from 'react-native-paper';

import {Formik} from "formik";

export default function RegisterUser({ navigation }) {
    const [user, setUser] = useState({
        fullName: '',
        email: '',
        password: ''
    })

    return (
        <View>
            <Formik
                initialValues={user}

            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <View>
                        <TextInput
                            label="Nome Completo"
                            value={values.fullName}
                            onBlur={handleBlur('fullName')}
                            onChangeText={handleChange('fullName')}
                        />
                        <Button icon="camera" mode="contained" onPress={handleSubmit}>
                            Cadastrar
                        </Button>
                    </View>
                )}
            </Formik>
        </View>
    )
}
