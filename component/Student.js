import { FontAwesome5 } from '@expo/vector-icons';

import { StyleSheet, View, Text, Image, Button } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';

import React from 'react';


const Student =({student,onDelete})=>{
    return(
        <View style={styles.item}>
            <View style={styles.itemImageContainer}>
                {student.gender === 'Male' ? (
                <Image style={styles.itemImage} source={require('../assets/images/male.png')} resizeMode='contain' />
                ) : (
                <Image style={styles.itemImage} source={require('../assets/images/female.png')} resizeMode='contain' />
                )}
                </View>
                <View style={{ paddingLeft: 15 }}>
                    <Text>{student.studentId}</Text>
                    <Text>{student.fullName}</Text>
                    <Text>{student.gender}</Text>
                    <Text>{student.email}</Text>
                    <Text>{student.dateOfBirth}</Text>
                </View>
                <TouchableOpacity style={styles.deleteButton} onFocus={()=>onDelete(student)}>
                <Button title='Xoa' onPress={()=>onDelete(student)}/>
            </TouchableOpacity>
            
        </View>
            
      
    );
};

export default Student;

const styles = StyleSheet.create({
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
    right: {
        paddingLeft: 15
    },
    deleteButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
});