import React, {useState, useEffect} from 'react'
import { View, Text, TouchableOpacity, Button,StyleSheet} from 'react-native';

import firebase from 'firebase'
require('firebase/firestore')


const Profile = () => {
    const [userInfo, setUserInfo] = useState(0);

    const retrieveUserWeight = () => {
        firebase.firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)      
            .get()
            .then((snapshot) => {
                if(snapshot.exists){
                    setUserInfo(snapshot.data())
                }
                else{
                    console.log('user info does not exist')
                }
            })
    }

    useEffect(() => {
        retrieveUserWeight()
    }, [])

    return (
        <View style = {styles.root}>
            <Text style = {styles.topText}>Profile</Text>
            <Text><Text style={{fontWeight: "bold"}}>Name:</Text> {userInfo.name}</Text>
            <Text><Text style={{fontWeight: "bold"}}>Email:</Text> {userInfo.email}</Text>
            <Text><Text style={{fontWeight: "bold"}}>Weight:</Text> {userInfo.weight} lbs</Text>
            <Text></Text>
            <TouchableOpacity 
                onPress={() => firebase.auth().signOut()} 
                style={styles.button}
            >
                <Text style = {styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    root: {
        flex: 1,
        marginHorizontal: '2%',
        marginTop: '10%'
    },

    button: {
        borderRadius: 5,
        backgroundColor: "#DDDDDD",
        borderColor: 'black',
        width:100, height:40,
        alignItems: "center",
        justifyContent: "center",
    },

    buttonText: {
        fontWeight: 'bold',
    },
    
    topText: {
        textAlign: 'center', 
        fontSize: 25, 
        marginBottom: '2%', 
        marginTop: '3%', 
        fontWeight: 'bold'
    }
})

export default Profile;