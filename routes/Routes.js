import * as React from 'react';
import { Button, View, Text, TextInput} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import RegisterUser from "../components/RegisterUser";
import Login from "../components/Login";

const AuthContext = React.createContext()


function HomeScreen(){
    const {signOut} = React.useContext(AuthContext)
    return (
        <Login />
    )
}


function SignInScreen() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const { signIn } = React.useContext(AuthContext);

    return (
        <View>
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Sign in" onPress={() => signIn({ username, password })} />
        </View>
    );
}



const Drawer = createDrawerNavigator();

export default function Routes({ navigation }) {

    const [state, dispatch] = React.useReducer((prevState, action) => {
        switch (action.type){
            case 'RESTORE_TOKEN':
                return {
                    ...prevState,
                    userToken: action.token,
                    isLoading: false
                };
            case 'SIGN_IN':
                return {
                    ...prevState,
                    isSignout: false,
                    userToken: action.token,
                };
            case 'SIGN_OUT':
                return {
                    ...prevState,
                    isSignout: true,
                    userToken: null,
                };
        }
    },{
        isLoading: true,
        isSignout: false,
        userToken: null,
    })

    React.useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            let userToken;

            try {
                // Restore token stored in `SecureStore` or any other encrypted storage
                // userToken = await SecureStore.getItemAsync('userToken');
            } catch (e) {
                // Restoring token failed
            }
            dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        };

        bootstrapAsync();
    }, []);

    const authContext = React.useMemo(
        () => ({
            signIn: async (data) => {
                dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
            },
            signOut: () => dispatch({ type: 'SIGN_OUT' }),
            signUp: async (data) => {
                dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
            },
        }),
        []
    );

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                <Drawer.Navigator initialRouteName="Home">
                    {
                        state.isLoading ? (
                            <Drawer.Screen name={'Splash'} component={SplahScreen} />
                        ): state.userToken == null ? (
                            <>
                                <Drawer.Screen name={'Login'} component={SignInScreen}
                                               options={{
                                                   title: 'Sign in',
                                                   animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                                               }}/>
                                <Drawer.Screen name={'Registrar-se'} component={RegisterUser}
                                               options={{
                                                   title: 'Registrar-se',
                                                   animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                                               }}/>
                            </>

                        ) : (
                            <>
                                <Drawer.Screen name={'Home Screen'} component={HomeScreen} />
                                <Drawer.Screen name={'Registrar-se'} component={RegisterUser} />
                            </>
                        )
                    }
                </Drawer.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
    );
}
