
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { Button ,StyleSheet, View,Text,Image, ScrollView} from 'react-native';

import React, { useEffect, useState } from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';

import Student from '../component/Student';
const HomeScreen = () => {
    const navigation=useNavigation();

    const[students, setStudents]= useState([]);
    const[authInfo, setAuthInfo]= useState();
   

    // Hàm điều hướng
    const navigateToLogin = () => {
        navigation.navigate('Login');
    };


    const retrieveData =async()=>{
        const authInfo = await AsyncStorage.getItem('authInfo', authInfo);
            if (authInfo !== null) {
                console.log('====> authInfo from AsyncStorage', authInfo);
                setAuthInfo(JSON.parse(authInfo));
            }
    };


    const doLogout=()=>{
        AsyncStorage.removeItem('authInfo');
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }]
        });
    };
    async function getListStudent() {
        try {
            const API_URL="http://192.168.202.100:3000/students";
            const response= await fetch(API_URL);
            const data= await response.json();
            setStudents(data);
            return data;
        } catch (error) {
            console.log('Fetch data fail '+ error);
            return null;
        }
    }
    
    useEffect(() => {
        retrieveData();
        getListStudent();
    }, []);

    const renderStudents = () => {
        return (
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View>
                    <Text style={styles.txtHeader}>List Student</Text>
                </View>
                <View style={styles.studentContainer}>
                    {students.map((item, index) => {
                        return <Student student={item} key={index}></Student>;
                    })}
                </View>
            </ScrollView>
        );
    };

    return( <SafeAreaView style={styles.container}>
        {authInfo ? <Button title='Logout' onPress={doLogout} /> : <Button title='Go to Login Screen' onPress={navigateToLogin} />}
        {authInfo?.role === 'ADMIN' ? renderStudents() : null}
    </SafeAreaView>);
};

export default HomeScreen;

const styles=StyleSheet.create(
    {
        container: {
            flex: 1
        },
        txtHeader: {
            fontSize: 18,
            fontWeight: 'bold',
        },
        item: {
            paddingVertical: 15,
            borderBottomColor: '#E2E2E2',
            borderBottomWidth: 0.5,
            flexDirection: 'row'
        },
        itemImageContainer: {
            width: 100,
            height: 100,
            borderRadius: 100
        },
        itemImage: {
            flex: 1,
            width: undefined,
            height: undefined
        },
        scrollView: {
            flexGrow: 1,
            padding: 20
        },
    }
);