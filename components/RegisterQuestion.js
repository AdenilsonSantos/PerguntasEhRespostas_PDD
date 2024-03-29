import * as React from "react";
import {View, Alert, StyleSheet, Picker, ScrollView} from "react-native";
import {TextInput, Button, Title, Text} from 'react-native-paper';
import {Formik} from "formik";
import Validator from "../validator/validator";
import QuestionService from "../services/QuestionService";
import MatterService from "../services/MatterService";
import RegisterMatter from "./RegisterMatter";

export const RegisterQuestionContext = React.createContext({isRegister: false})

export default function RegisterQuestion() {

    const [newMatter, setNewMatter] = React.useState(false)
    const [ question ] = React.useState({
        ask: '',
        alternative_a: '',
        alternative_b: '',
        alternative_c: '',
        alternative_d: '',
        alternativeCorrect: '',
        uid: '',
        matter: ''
    })

    const [matters, setMatters] = React.useState([
        {
        "matter": ""
    }])

    const getMatters = React.useCallback(async () => {
        await MatterService.getMatters().then((response) => {
            setMatters(response)
        })
    }, [])

    React.useEffect(() => {
        getMatters(),
        newMatter
    }, [getMatters, newMatter])


    const onSubmit = (values) => {
        QuestionService.registerQuestion(
            values.ask,
            values.alternative_a,
            values.alternative_b,
            values.alternative_c,
            values.alternative_d,
            values.alternativeCorrect,
            values.matter
        ).then((response) => {
            Alert.alert("Cadastro", response?.message)
        }).catch((error) => {
            Alert.alert("Cadastro",error.message)
        })
    }

    return (
        <RegisterQuestionContext.Provider value={{newMatter, setNewMatter}}>
            <ScrollView>
                {newMatter && <RegisterMatter visible={true} />}
                <View style={styles.container} >
                    <View style={styles.containerAux} >
                        <Title style={styles.title} >Registre sua pergunta aqui</Title>

                        <Formik
                            initialValues={question}
                            validationSchema={Validator.questionValidator}
                            onSubmit={onSubmit}
                        >
                            {({ handleChange,
                                  handleBlur,
                                  handleSubmit,
                                  setFieldValue,
                                  resetForm,
                                  errors,
                                  values }) => (
                                <>
                                    <View>
                                        <View style={styles.viewError}>
                                            {errors && <Text style={styles.errors} >{errors.matter}</Text>}
                                            {errors && <Text style={styles.errors}>{errors.ask}</Text>}
                                        </View>
                                        <View style={styles.viewError}>
                                            {errors && <Text style={styles.errors}>{errors.alternative_a}</Text>}
                                            {errors && <Text style={styles.errors}>{errors.alternative_b}</Text>}
                                        </View>
                                        <View style={styles.viewError}>
                                            {errors && <Text style={styles.errors}>{errors.alternative_c}</Text>}
                                            {errors && <Text style={styles.errors}>{errors.alternative_d}</Text>}
                                        </View>
                                        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                                            {errors && <Text style={styles.errors}>{errors.alternativeCorrect}</Text>}
                                        </View>

                                    </View>

                                    <View style={styles.viewSelectMatter}>
                                        <View style={styles.containerSelect}>
                                            <Picker
                                                style={{color: '#616161', fontSize: 38, width: 250}}
                                                selectedValue={values.matter}
                                                onValueChange={value => {
                                                    setFieldValue('matter', value)
                                                }}
                                            >
                                                <Picker.Item color={'#424242'} label="Selecione meu assunto..." value='' />
                                                {
                                                    matters.map((matter) => {
                                                        return <Picker.Item color={'#616161'} key={matter?.matter} label={matter?.matter} value={matter?.matter}/>
                                                    })
                                                }
                                            </Picker>
                                        </View>
                                        <Button style={styles.buttonNewMatter}
                                                mode="contained"
                                                onPress={() => setNewMatter(true)}
                                        >
                                            Novo
                                        </Button>
                                    </View>


                                    <TextInput
                                        style={styles.input}
                                        name="ask"
                                        label="Pergunta"
                                        value={values.ask}
                                        onBlur={handleBlur('ask')}
                                        onChangeText={handleChange('ask')}
                                    />
                                    <TextInput
                                        style={styles.input}
                                        name="alternative_a"
                                        label="Alternativa A"
                                        value={values.alternative_a}
                                        onBlur={handleBlur('alternative_a')}
                                        onChangeText={handleChange('alternative_a')}
                                    />
                                    <TextInput
                                        style={styles.input}
                                        name="alternative_b"
                                        label="Alternativa B"
                                        value={values.alternative_b}
                                        onBlur={handleBlur('alternative_b')}
                                        onChangeText={handleChange('alternative_b')}
                                    />
                                    <TextInput
                                        style={styles.input}
                                        name="alternative_c"
                                        label="Alternativa C"
                                        value={values.alternative_c}
                                        onBlur={handleBlur('alternative_c')}
                                        onChangeText={handleChange('alternative_c')}
                                    />
                                    <TextInput
                                        style={styles.input}
                                        name="alternative_d"
                                        label="Alternativa D"
                                        value={values.alternative_d}
                                        onBlur={handleBlur('alternative_d')}
                                        onChangeText={handleChange('alternative_d')}
                                    />

                                    <View style={styles.containerSelect}>
                                        <Picker
                                            style={{color: '#616161', fontSize: 38}}
                                            selectedValue={values.alternativeCorrect}
                                            onValueChange={value => {
                                                setFieldValue('alternativeCorrect', value)
                                            }}
                                        >
                                            <Picker.Item color={'#424242'} label="Qual dessas alternativas é a correta?" value='' />
                                            <Picker.Item color={'#424242'} label="Alternativa A" value='A' />
                                            <Picker.Item color={'#424242'} label="Alternativa B" value='B' />
                                            <Picker.Item color={'#424242'} label="Alternativa C" value='C' />
                                            <Picker.Item color={'#424242'} label="Alternativa D" value='D' />
                                        </Picker>
                                    </View>
                                    <Button style={styles.buttonPrimary} mode="contained" onPress={handleSubmit}>
                                        Cadastrar Pergunta
                                    </Button>
                                    <Button style={styles.buttonSecondary} mode="contained" onPress={() => resetForm({values: ''})}>
                                        Resetar Formulário
                                    </Button>
                                </>
                            )}
                        </Formik>
                    </View>

                </View>
            </ScrollView>
        </RegisterQuestionContext.Provider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 13,
        justifyContent: 'center',
        backgroundColor: '#D3D3D3',
    },
    containerAux: {
        marginTop: 38.3
    },
    title: {
        fontSize: 30,
        alignSelf: 'center',
    },
    viewError:{
        flexDirection: 'row',
        justifyContent: 'space-between'
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
    buttonNewMatter:{
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
    },
    viewSelectMatter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    containerSelectMatter: {
    backgroundColor: '#e7e7e7',
        height: "50%",
        marginTop: 7,
        padding: 9,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        borderBottomColor: '#9e9e9e',
        borderBottomWidth: 1
    }

})
