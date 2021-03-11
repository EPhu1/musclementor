import React, {useState, useEffect} from 'react'
import { View, Text, FlatList, Button} from 'react-native';

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
        <View style = {{flex: 1, marginHorizontal: '2%', marginTop: '10%'}}>
            <Text>Name: {userInfo.name}</Text>
            <Text>Email: {userInfo.email}</Text>
            <Text>Weight: {userInfo.weight} lbs</Text>
            <Button
                title="Logout"
                onPress={() => firebase.auth().signOut()}
            />
        </View>
    )
}


export default Profile;