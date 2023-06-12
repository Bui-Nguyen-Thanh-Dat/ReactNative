import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import React, { useState } from 'react';

import { Alert, Image, StyleSheet, View ,Text} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import CustomButton from '../component/CustomButton';
import CustomInput from '../component/CustomInput';


const LoginScreen = () => {
    let users = [];

    const navigation= useNavigation();
    const [username, setUsername] = useState('');
    const [usernameError,setUsernameError]=useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
  
    const navigateToHome = () => {
        navigation.navigate('Home');
    };

    async function fetchData() {
        try {
            const response = await fetch("http://192.168.202.105:3000/users");
            const data = await response.json();
            users=data;
            return data;

            
        } catch (error) {
            log.error('Fetch data failed ' + error);
            return null;
        }
    }
    fetchData();
    storeAuthInfo= async (value)=>{
        try {
            const authInfo=JSON.stringify(value);
            await AsyncStorage.setItem('authInfo', authInfo);
        } catch (error) {
            console.log(error);
        }
    };
    
    
    const validateAuthInfo=(authInfo)=>{
        if (authInfo.username === '') {
            setUsernameError('Username field cannot be empty');
            return false;
        }

        if (authInfo.password ==='') {
            setUsernameError('Password field cannot be empty');
            return false;
        }
        return true;
    };


    const clearError = () => {
        setUsernameError('');
        setPasswordError('');
    };



    const doLogin = () => {
     
        let request = { username: username, password: password };
        
        
        if (users) {
            const validateResult=validateAuthInfo(request);
            if (validateResult===true) {
                const authInfo = users.find((user) => user.userName === request.username);
                console.log('authInfo: ' + JSON.stringify(request));
                if (!authInfo) {
                    Alert.alert('Notification', 'Can not find user information', [{ text: 'Cancel', onPress: () => console.log('Không tìm thấy user ' + request.username) }]);
                    clearError();
                } else {
                    if (!(authInfo.password === request.password)) {
                        setPasswordError('Password is not correct');
                        return;
                    } else {
                        clearError();
                        storeAuthInfo(authInfo);
                        Alert.alert('Notification', 'Login successfull ' + request.username, [
                            { text: 'OK', onPress: () => navigateToHome() },
                            { text: 'Cancel', onPress: () => console.log('Press Cancel') }
                        ]);
                    }
                }
            }

        }
    };

    

    return (
        <SafeAreaView>
        <View  style={styles.root}>
            <Image source={require('../assets/logo.png')} style={styles.logo}/>
            <CustomInput placeholder='Username' value={username} setValue={setUsername} secureTextEntry={false}  />
            <Text  style={styles.txtErr}>{usernameError}</Text>

            <CustomInput placeholder='Password' value={password} setValue={setPassword} secureTextEntry={true} />
            <Text  style={styles.txtErr}>{passwordError}</Text>

            <CustomButton btnLabel={'Sign In'} onPress={doLogin} />
            <CustomButton btnLabel={'Back to Home'} onPress={navigateToHome} />
        </View>
        </SafeAreaView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 10
    },
    logo: {
        width: '50%',
        height: '35%',
        resizeMode: 'contain'
    },
    txtErr:{
        color:'red',
        marginVertical: 5
    }
});
