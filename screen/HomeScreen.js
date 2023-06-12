
import { getFocusedRouteNameFromRoute, useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { Button ,StyleSheet, View,Text,Image, ScrollView, TextInput, Alert} from 'react-native';

import React, { useEffect, useState } from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';

import moment from 'moment/moment';

import { CheckBox } from 'react-native-elements';

import CustomButton from '../component/CustomButton';
import CustomInput from '../component/CustomInput';
import Student from '../component/Student';
const HomeScreen = () => {
    const navigation=useNavigation();

    const[students, setStudents]= useState([]);
    const[authInfo, setAuthInfo]= useState();
    const [selectedIndex, setIndex] = useState(0);

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
            const API_URL="http://192.168.202.105:3000/students";
            const response= await fetch(API_URL);
            const data= await response.json();
            setStudents(data);
            return data;
        } catch (error) {
            console.log('Fetch data fail '+ error);
            return null;
        }
    }
    const [userName1,setUsername]=useState('');
    const [password1,setPassword]=useState('');
    const [firstName1,setFirstName]=useState('');
    const [lastName1,setLastName]=useState('');
    const [email1,setEmail]=useState('');
    const [gender1,setGender]=useState('');
    const [createDate1,setCreateDate]=useState('');
    const [updateDate1,setUpdateDate]=useState('');
   
    

    
    const userData={
        userName:userName1,
        password:password1,
        firstName:firstName1,
        lastName:lastName1,
        email:email1,
        gender:selectedIndex===0?'Male':'Female',
        role:'STAFF',
        createDate:createDate1,
        updateDate:updateDate1
    }

   
   const SaveData =() => {

    let API_URL='http://192.168.202.105:3000/users/'+authInfo.id;

    fetch(API_URL,{
    method:'PUT',
    headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
    },
    body:JSON.stringify(userData)
    })
    .then((response)=>{
    response=> response.json();    
    console.log(response.status);
    if (response.status==200) {
        alert("Thay doi thanh cong");
    }
    })
    .catch((err)=>{
        console.log(err);
    });

   };
   const PostData =() => {

    let API_URL='http://192.168.202.105:3000/users';

    fetch(API_URL,{
    method:'POST',
    headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
    },
    body:JSON.stringify(userData)
    })
    .then((response)=>{
    response=> response.json();    
    console.log(response.status);
    if (response.status==201) {
        alert("Them thanh cong");
    }
    })
    .catch((err)=>{
        console.log(err);
    });

   };
   const validateFormStaff=()=>{
    if (userName1 === '') {
        Alert.alert('Notification', 'khong de trong username');
        return false;
    }

    if (password1 ==='') {
        Alert.alert('Notification', 'khong de trong password');
        return false;
    }
    if (firstName1 ==='') {
        Alert.alert('Notification', 'khong de trong firstname');
        return false;
    }
    if (lastName1 ==='') {
        Alert.alert('Notification', 'khong de trong lastname');
        return false;
    }
    if (email1 ==='') {
        Alert.alert('Notification', 'khong de trong email');
        return false;
    }

    if (createDate1 ==='') {
        Alert.alert('Notification', 'khong de trong createDate');
        return false;
    }
    if (updateDate1 ==='') {
        Alert.alert('Notification', 'khong de trong updateDate');
        return false;
    }
    SaveData();
    return true;
};
const deleteStudent = async (item) => {
    try {
        const studentId = item.id;
        const API_URL = 'http://192.168.203.101:3000/students/' + studentId;
        const response = await fetch(API_URL, { method: 'DELETE' });
        if (response && response.status === 200) {
            getListStudent();
        }
    } catch (error) {
        log.error('Delete data failed ' + error);
    }
};
    
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
                        return <Student student={item} key={index} onDelete={deleteStudent}></Student>;
                    })}
                </View>
            </ScrollView>
        );
    };
   
    const formStaff=()=>{
        return(
            <View style={[styles.container,styles.staffView]}>
                <Text style={styles.txtHeader}>Information staff</Text>
                <CustomInput placeholder={"Username"} value={userName1} setValue={setUsername}  secureTextEntry={false} ></CustomInput>
                <CustomInput placeholder={"NewPassword"} value={password1} setValue={setPassword} secureTextEntry={true}></CustomInput>
                <CustomInput placeholder={"firstName"} value={firstName1} setValue={setFirstName} secureTextEntry={false}></CustomInput>
                <CustomInput placeholder={"lastName"} value={lastName1} setValue={setLastName} secureTextEntry={false}></CustomInput>
                <CustomInput placeholder={"Email"} value={email1} setValue={setEmail} secureTextEntry={false}></CustomInput>
                <View style={{ flexDirection: 'row' }}>
                    <CheckBox title='Male' checked={selectedIndex === 0} onPress={() => setIndex(0)} checkedIcon='dot-circle-o' uncheckedIcon='circle-o' />
                    <CheckBox title='Female' checked={selectedIndex === 1} onPress={() => {setIndex(1)}} checkedIcon='dot-circle-o' uncheckedIcon='circle-o' />
                </View>
                <CustomInput placeholder={"CreateDate"} value={createDate1} setValue={setCreateDate} secureTextEntry={false}  ></CustomInput>
                
                <CustomInput placeholder={"UpdateDate"} value={updateDate1} setValue={setUpdateDate} secureTextEntry={false} ></CustomInput>
                <CustomButton btnLabel={"Update"} onPress={validateFormStaff}></CustomButton>
                <CustomButton btnLabel={"Create"} onPress={PostData}></CustomButton>

             </View>
            
        );
    };

    return( <SafeAreaView style={styles.container}>
        {authInfo?.role === 'ADMIN' ? renderStudents() : null}
        {authInfo?.role === 'STAFF' ? formStaff() : null}
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
        staffView:{
            width: '90%',
            height: 50,
            paddingLeft:20,
        }
    }
);