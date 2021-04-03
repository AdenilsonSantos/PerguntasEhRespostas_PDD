import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Login from "../components/Login";
import Profile from "../components/Profile";
import RegisterQuestion from "../components/RegisterQuestion";
import RegisterUser from "../components/RegisterUser";

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
                                <Drawer.Screen name={"Perfil"} component={Profile} />
                                <Drawer.Screen name={"Login"} component={Login} />
                            </>:
                            <>
                                <Drawer.Screen name={"Perfil"} component={Profile} />
                                <Drawer.Screen name={"Registro"} component={RegisterUser} />
                                <Drawer.Screen name={"Criar Questão"} component={RegisterQuestion} />
                                <Drawer.Screen name={"Login"} component={Login} />
                            </>
                    }
                </Drawer.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
    );
}
