import React, {useState, useEffect} from 'react'
import { View, Text, FlatList } from 'react-native';

import firebase from 'firebase';
require("firebase/firestore")

const Profile = () => {
    const [users, setUsers] = useState([]); // store the firebase user info here
    const [myData, setMyData] = useState([]); //store the firebase workout data here

    const retrieveUsers = () =>{ //fetches data from users collection on firebase and saves it to users
        firebase.firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    setUsers([snapshot.data()])
                }
                else {
                    console.log('does not exist')
                }
            })
    }

    const retrieveData = (workoutName) =>{ //given a workoutname, fetches that information and saves it to myData
        firebase.firestore()
            .collection("data")
            .doc(firebase.auth().currentUser.uid)//fetches a document
            .collection(workoutName)             //fetches a collection
            .orderBy("timestamp", "desc")         //fetches by descending order of the timestamps
            .get()
            .then((snapshot) => {
                let data = snapshot.docs.map(doc => {
                    const x = doc.data();
                    const id = doc.id;
                    return {id, ...x}
                })
                setMyData(data)
                return data;
            })
    }

    useEffect(() => {
        retrieveUsers();
        retrieveData("benchpress");
    }, [])

    console.log(users)
    console.log(myData)

    return (
        <View>
            <FlatList
                data = {users}
                keyExtractor = {(item) => item.name}
                renderItem = {({item}) => (
                    <View>
                        <Text>{item.name}</Text>
                        <Text>{item.email}</Text>
                    </View>
                )}
            />
        </View>
    )
}


export default Profile

