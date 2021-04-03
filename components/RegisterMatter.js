import * as React from "react";
import {Alert, Modal, StyleSheet, View} from "react-native";
import {Button, Text, TextInput, Title} from "react-native-paper";
import MatterService from "../services/MatterService";
import Validator from "../validator/validator";
import {Formik} from "formik";


export default function RegisterMatter(props){

    const [matter, setMatters] = React.useState('')
    const [isSuccess, setIsSuccess] = React.useState(true)
    const [visible, setVisible] = React.useState(props.visible ? true : false)

    const newMatter = () => {
        props.setNewMatter(false)
    }

    const onSubmit = async (values) => {
        await MatterService.registerMatter(matter)
            .then(async (response) => {
                await setVisible(false)
                Alert.alert(response?.message)
            })
            .catch((error) => {
                Alert.alert(error.message)
            })
    }

    return (
            <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            //onRequestClose={() => setVisible(false)}
            >
                <View style={{flex: 1,
                    justifyContent: 'center',
                    backgroundColor: 'rgba(98, 0, 238, 0.4)'}}>
                    <View style={styles.container}>
                        <Formik
                            initialValues={matter}
                            validationSchema={Validator.matterValidator}
                            onSubmit={onSubmit}
                        >
                            {({ handleChange,
                                  handleBlur,
                                  handleSubmit,
                                  errors,
                                  values }) => (
                                <>
                                    {errors && <Text>Não conseguimos cadastrar o assuntos</Text>}
                                    <TextInput
                                        style={styles.input}
                                        name="matter"
                                        label="Assunto"
                                        value={values.password}
                                        onBlur={handleBlur('matter')}
                                        onChangeText={handleChange('matter')}
                                    />
                                    <Button style={styles.buttonPrimary} mode="contained" onPress={handleSubmit}>
                                        Cadastrar novo assunto
                                    </Button>
                                    <Button style={styles.buttonSecondary} mode="contained" onPress={() => setVisible(false)}>
                                        Sair
                                    </Button>
                                </>
                            )}
                        </Formik>

                    </View>

                </View>
            </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 13,
        height: '40%',
        width: '90%',
        //borderWidth: 3,
        alignSelf: 'center',
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16,
        elevation: 24,

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
    input: {
        marginTop: 7,
        fontSize: 18
    },
    errors: {
        fontSize: 16,
        color: '#FF0000',
    },
    matter: {
        borderWidth: 4,
        fontSize: 30,
        borderColor: '#A9A9A9',
        backgroundColor: '#f6f6f6'
    },
    containerSelect: {
        backgroundColor: '#e7e7e7',
        marginTop: 7,
        padding: 7,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        borderBottomColor: '#9e9e9e',
        borderBottomWidth: 1
    }
})
