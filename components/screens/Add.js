import React, {useState} from 'react'
import { View, TextInput, Text, Button, FlatList} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser, fetchData } from '../../redux/actions/index';

import firebase from 'firebase';
require("firebase/firestore")

const Add = (props) => {
    const [weight, setWeight] = useState("")
    const [reps, setReps] = useState("")

    const [x, repError] = useState("")

    const { currentUser, data } = props; //uses redux to get currentUser and data information

    const [myData, setMyData] = useState(data); //temporary fix to show the data immediately after saving
    console.log(myData)

    const saveData = (weight, reps) => {
        setMyData([...myData, {id: (Math.random()*10000).toString(), weight: weight, reps: reps}]) //temporary fix
        firebase.firestore()
            .collection("data")
            .doc(firebase.auth().currentUser.uid)
            .collection("benchpress")
            .add({
                weight,
                reps,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
    }

    return (
        <View style = {{flex: 1}}>
            <Text>Add Benchpress Workout</Text>
            <TextInput
                placeholder = "weight"
                onChangeText = {(weight) => setWeight(weight)}
            />
            <TextInput
                placeholder = "repitions"
                onChangeText = {(reps) => setReps(reps)}
            />
            <Button
                title = "save"
                onPress = {() => saveData(weight, reps)}
            />
            <FlatList
                data = {myData}
                renderItem = {({item}) => (
                    <Text>
                        {item.weight} x {item.reps} lbs, date: {item.timestamp.toDate().toLocaleDateString()}
                    </Text>
                )}
            />
        </View>
    )
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    data: store.userState.data
})

const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser, fetchData}, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Add)