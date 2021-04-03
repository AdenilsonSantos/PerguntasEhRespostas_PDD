import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import RegisterUser from "../components/RegisterUser";
import Login from "../components/Login";

export const AuthContext = React.createContext({isAuthenticated: false, uid: '', name: ''})

const Drawer = createDrawerNavigator();

export default function Routes() {

    const [authUser, setAuthUser] = React.useState({isAuthenticated: false, uid: '', name: ''})

    return (
        <AuthContext.Provider value={{authUser, setAuthUser}}>
            <NavigationContainer>
                <Drawer.Navigator initialRouteName="Home">
                    {
                        ( authUser.isAuthenticated )?
                            <>
                                <Drawer.Screen name={"Registrar-se"} component={RegisterUser} />
                            </>:
                            <>
                                <Drawer.Screen name={"Login"} component={Login} />
                            </>
                    }
                </Drawer.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
    );
}
