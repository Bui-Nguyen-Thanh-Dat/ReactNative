import { Button ,StyleSheet, View,Text,Image} from 'react-native';

import React, { useEffect, useState } from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';

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
    


    return <SafeAreaView style={styles.container}>
        <Button title='Go to Login Screen' onPress={navigateToLogin} />
        <View>
            <Text style={styles.txtHeader}>List Student </Text>
        </View>

        <View style={styles.container}>
            {students.map((item,index)=>{
                return(
                    <View style={styles.item} key={index}>
                          <View style={styles.itemImageContainer}>
                                    {item.gender === 'Male' ? (
                                        <Image style={styles.itemImage} source={require('../assets/images/male.png')} resizeMode='contain' />
                                    ) : (
                                        <Image style={styles.itemImage} source={require('../assets/images/female.png')} resizeMode='contain' />
                                    )}
                                </View>
                                <View style={{ paddingLeft: 15 }}>
                                    <Text>{item.studentId}</Text>
                                    <Text>{item.fullName}</Text>
                                    <Text>{item.gender}</Text>
                                    <Text>{item.email}</Text>
                                    <Text>{item.dateOfBirth}</Text>
                                </View>
                    </View>
                );
            })}
        </View>

        </SafeAreaView>;
};

export default HomeScreen;

const styles=StyleSheet.create(
    {
        container: {
            flex: 1
        },
        txtHeader: {
            fontSize: 18,
            fontWeight: 'bold'
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
        }
    }
);