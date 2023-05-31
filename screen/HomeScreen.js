import { Button ,StyleSheet, View,Text,Image, ScrollView} from 'react-native';

import React, { useEffect, useState } from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';

import Student from '../component/Student';
const HomeScreen = ({ navigation }) => {
    const[students, setStudents]= useState([]);
    useEffect(()=>{
        getListStudent();
    },[]);
      
    // Hàm điều hướng
    const navigateToLogin = () => {
        navigation.navigate('Login');
    };
    async function getListStudent() {
        try {
            const API_URL="http://192.168.202.101:3000/students";
            const response= await fetch(API_URL);
            const data= await response.json();
            setStudents(data);
            return data;
        } catch (error) {
            console.log('Fetch data fail '+ error);
            return null;
        }
    }
    


    return( <SafeAreaView style={styles.container}>
        <ScrollView style={{flex:1}} contentContainerStyle={styles.scrollView}>
        <Button title='Go to Login Screen' onPress={navigateToLogin} />
        <View>
            <Text style={styles.txtHeader}>List Student </Text>
        </View>

        <View style={styles.studentContainer}>
                    {students.map((item,index)=>{return <Student student={item} key={index}></Student>})}
                </View>
        </ScrollView>
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