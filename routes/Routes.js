import * as React from 'react';
import { Button, View, Text, TextInput} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

const AuthContext = React.createContext()


function HomeScreen(){
    const {signOut} = React.useContext(AuthContext)
    return (
        <View>
            <Text>Signed in!</Text>
            <Button title="Sign out" onPress={signOut} />
        </View>
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



function SplahScreen({ navigation }) {
    return (
        <View>
            <Text>Estamos lendo seus dados</Text>
        </View>
    );
}


function NotificationsScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button onPress={() => navigation.goBack()} title="Go back home" />
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

            // After restoring token, we may need to validate it in production apps

            // This will switch to the App screen or Auth screen and this loading
            // screen will be unmounted and thrown away.
            dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        };

        bootstrapAsync();
    }, []);

    const authContext = React.useMemo(
        () => ({
            signIn: async (data) => {
                // In a production app, we need to send some data (usually username, password) to server and get a token
                // We will also need to handle errors if sign in failed
                // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
                // In the example, we'll use a dummy token

                dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
            },
            signOut: () => dispatch({ type: 'SIGN_OUT' }),
            signUp: async (data) => {
                // In a production app, we need to send user data to server and get a token
                // We will also need to handle errors if sign up failed
                // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
                // In the example, we'll use a dummy token

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
                            <Drawer.Screen name={'Login'} component={SignInScreen}
                               options={{
                                   title: 'Sign in',
                                   // When logging out, a pop animation feels intuitive
                                   animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                               }}/>
                        ) : (
                            <Drawer.Screen name={'Home Screen'} component={HomeScreen} />
                        )
                    }
                </Drawer.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
    );
}
