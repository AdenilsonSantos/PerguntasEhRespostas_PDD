import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Login from "../components/Login";
import Profile from "../components/Profile";
import RegisterQuestion from "../components/RegisterQuestion";
import RegisterUser from "../components/RegisterUser";
import AnswerQuestion from "../components/AnswerQuestion";

export const AuthContext = React.createContext({isAuthenticated: false, uid: '', name: '', email: ''})

const Drawer = createDrawerNavigator();

export default function Routes() {

    const [authUser, setAuthUser] = React.useState({isAuthenticated: false, uid: '', name: '', email: ''})

    return (
        <AuthContext.Provider value={{authUser, setAuthUser}}>
            <NavigationContainer>
                <Drawer.Navigator initialRouteName="Home">
                    {
                        ( authUser.isAuthenticated )?
                            <>
                                <Drawer.Screen options={{ title: `${authUser.name}` }} name={"Perfil"}component={Profile} />
                                <Drawer.Screen name={"Criar Pergunta"} component={RegisterQuestion} />
                                <Drawer.Screen name={"Responder Questionário"} component={AnswerQuestion} />
                            </>:
                            <>
                                <Drawer.Screen name={"Responder Questionário"} component={AnswerQuestion} />
                                <Drawer.Screen name={"Criar Pergunta"} component={RegisterQuestion} />
                                <Drawer.Screen name={"Acessar"} component={Login} />
                                <Drawer.Screen name={"Seja um membro"} component={RegisterUser} />
                            </>
                    }
                </Drawer.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
    );
}
