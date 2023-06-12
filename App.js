import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { Button } from 'react-native';

import HomeScreen from './screen/HomeScreen';
import LoginScreen from './screen/LoginScreen';

const Stack = createNativeStackNavigator();

const App = () => {

    const doLogout = (navigation) => {
        AsyncStorage.removeItem('authInfo');
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }]
        });
    };

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Login'>
                <Stack.Screen name='Home' component={HomeScreen} options={(props)=> ({
                    gestureEnabled:false,
                    headerBackVisible:false,
                    headerRight:()=><Button title='Log out' onPress={()=> doLogout(props.navigation)} />

                })}/>
                <Stack.Screen name='Login' component={LoginScreen} options={{ gestureEnabled: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
