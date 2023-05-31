import React, { useState } from 'react';

import { Alert, Image, StyleSheet, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import CustomButton from '../component/CustomButton';
import CustomInput from '../component/CustomInput';


const LoginScreen = (props) => {
    let users = [];
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

  
    async function fetchData() {
        try {
            const response = await fetch('http://192.168.202.101:3000/users');
            const data = await response.json();
            return data;
        } catch (error) {
            log.error('Fetch data failed ' + error);
            return null;
        }
    }

    async function storeData() {
        users = await fetchData();
    }

    storeData();

    const doLogin = () => {
     
        if (username.length == 0) {
            alert('Username khong duoc de trong');
            return;
        }

        if (password.length == 0) {
            alert('Password khong duoc de trong');
            return;
        }


        let request = { username: username, password: password };
        
        
        if (users) {
            const authInfo = users.find((user) => user.userName === request.username);
            if (!authInfo) {
                Alert.alert('Notification', 'Khong tim thay user', [{ text: 'Cancel', onPress: () => console.log('Không tìm thấy user ' + request.username) }]);
            } else {
                if (!(authInfo.password === request.password)) {
                    Alert.alert('Notification', 'Mat khau sai', [{ text: 'Cancel', onPress: () => console.log('Password khong dung cho ' + request.username) }]);
                } else {
                    Alert.alert('Notification', 'Dang nhap thanh cong ' + request.username, [
                        { text: 'OK', onPress: () => navigateToHome() },
                        { text: 'Cancel', onPress: () => console.log('Press Cancel') }
                    ]);
                }
            }
        }
    };

    const navigateToHome = () => {
        props.navigation.navigate('Home');
    };

    return (
        <SafeAreaView>
        <View  style={styles.root}>
            <Image source={require('../assets/logo.png')} style={styles.logo}/>
            <CustomInput placeholder='Username' value={username} setValue={setUsername} secureTextEntry={false} />
            <CustomInput placeholder='Password' value={password} setValue={setPassword} secureTextEntry={true} />
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
        padding: 20
    },
    logo: {
        width: '50%',
        height: '50%',
        resizeMode: 'contain'
    }
});
