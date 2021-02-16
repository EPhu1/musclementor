import React, {useState, useEffect} from 'react'
import { View, Text, FlatList,Button } from 'react-native';

import firebase from 'firebase';
require("firebase/firestore")


const Profile = () => {
    const [users, setUsers] = useState([]);

    const retrieveUsers = () =>{
        firebase.firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    setUsers(snapshot.data())
                }
                else {
                    console.log('does not exist')
                }
            })
    }

    useEffect(() => {
        retrieveUsers()
    }, [])

    console.log(users)
    console.log(users.email) //prints out email
    console.log(users.name) // prints out name

    const RPMformula = (weight, reps) => {
        return ((100*weight)/(48.8+53.8*(Math.pow(2.71828, (-0.075*reps))))).toFixed(2)
    }

    return (
        <View>
            <Text>Profile</Text>
            <Button
                title="Logout"
                onPress={() => firebase.auth().signOut()}
            />
            {/* <text>{RPMformula(187,7)} </text> */}
            
        </View>
    )
}


export default Profile