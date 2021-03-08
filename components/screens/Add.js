import React, {useState, useEffect} from 'react'
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { TextInput } from 'react-native-paper';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser, fetchData } from '../../redux/actions/index';

import { WORKOUTS, WORKOUT_GROUPS, WORKOUT_RATIOS_MALE } from '../constants/workouts';
import DataTable from '../functional_components/DataTable';
import DataChart from '../functional_components/DataChart';

import { Ionicons } from '@expo/vector-icons'; 

import firebase from 'firebase';
require("firebase/firestore")


const Add = (props) => {
    // const { currentUser, data } = props; //uses redux to get currentUser and data information
    const [myData, setMyData] = useState([]); //data collection from firebase
    const [weight, setWeight] = useState(""); //keeps track of user inputted weight
    const [reps, setReps] = useState(""); //keeps track of user inputted reps
    const [screen, setScreen] = useState("selectworkout");
    const [workout, setWorkout] = useState("");

    const [workoutScores, setWorkoutScores] = useState([]); //an array of every workout name and corresponding score.

    const saveData = (weight, reps, workoutName) => {
        let milliseconds = Date.now();
        firebase.firestore()
            .collection("data")
            .doc(firebase.auth().currentUser.uid)
            .collection(workoutName)
            .add({
                weight,
                reps,
                timestamp: milliseconds,
                group: WORKOUT_GROUPS[workoutName]
            })
    }

    const retrieveData = (workoutName) =>{
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

    const retrieveData2 = async (workoutName) =>{ //currently using this to read and store all the data from firebase into workoutScores
        let x = await firebase.firestore()
            .collection("data")
            .doc(firebase.auth().currentUser.uid)
            .collection(workoutName)             
            .orderBy("timestamp", "desc")         
            .get()
            .then((snapshot) => {
                let data = snapshot.docs.map(doc => {
                    const x = doc.data();
                    const id = doc.id;
                    return {id, ...x}
                })
                return data;
            })
        return x
    }

    useEffect(() => { //sets information into workoutScores which is used for the recommendation system.
        let temp = []
        Promise.all([retrieveData2('benchpress'), retrieveData2('deadlift'), retrieveData2('squat'), retrieveData2('chin-up'), 
                     retrieveData2('pull-up'), retrieveData2('dip'), retrieveData2('military press')]).then((values) => {
            values.forEach((data, i) => { // every workout type; benchpress, deadlift, etc
                let sum = 0;
                data.forEach((datum) => { //every recorded workout session
                    sum += parseInt(datum.weight);
                })
                const workoutRatio = WORKOUT_RATIOS_MALE[WORKOUTS[i].name];
                const score = (sum / data.length) / workoutRatio;
                temp.push({name: WORKOUTS[i].name, score: score });
                temp.sort((a, b) => (a.score > b.score) ? 1 : -1) //sort object by the ascending order of score
            })
            setWorkoutScores(temp)
        })
    }, [myData])

    console.log(workoutScores)

    if(screen == 'selectworkout'){
        return(
            <View style = {styles.root}>
                <FlatList
                    numColumns = {3}
                    horizontal = {false}
                    data = {WORKOUTS}
                    keyExtractor = {(item) => item.id}
                    renderItem = {({item}) => (
                        <TouchableOpacity
                            onPress = {() => {
                                retrieveData(item.name);
                                setWorkout(item.name);
                                setScreen('addworkout');
                            }}
                            >
                            <Image 
                                style = {workoutScores.length == 0 ? styles.imgs : (item.name == workoutScores[0].name ? [styles.imgs, {borderColor: 'green'}]: styles.imgs)}
                                source={item.url} 
                            />
                        </TouchableOpacity>
                    )}
                />
            </View>
        )
    }
    else if(screen == "addworkout"){
        return (
            <View style = {styles.root}>
                <View style = {{flexDirection: 'row'}}>
                    <TouchableOpacity
                        onPress = {() => setScreen("selectworkout")}
                        style = {{width: '5%'}}
                    >
                        <Ionicons name="arrow-back-outline" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress = {() => console.log('settings')}
                        style = {{marginLeft: '88%'}}
                    >
                        <Ionicons name="ios-settings-outline" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <Text>Add a {workout} workout</Text>
                <TextInput
                    style = {{height: 40, marginBottom: "2%"}}
                    label = "Weight"
                    value = {weight}
                    onChangeText = {(weight) => setWeight(weight)}
                    theme = {{colors: {primary: "#006aff"}}}
                    mode = 'outlined'
                />
                <TextInput
                    style = {{height: 40, marginBottom: "5%"}}
                    label = "Repitions"
                    value = {reps}
                    onChangeText = {(reps) => setReps(reps)}
                    theme = {{colors: {primary: "#006aff"}}}
                    mode = 'outlined'
                />
                <Button
                    title = "save"
                    onPress = {() => {
                        saveData(weight, reps, workout)
                        retrieveData(workout)
                    }}
                />
                <DataChart workoutData = {myData}/>
                <DataTable data = {myData}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        marginHorizontal: '2%',
        marginTop: '10%'
    },
    imgs: {
        borderWidth: 2,
        borderRadius: 15,
        padding: 50,
        borderColor: 'black',
        width:100, height:100,
        marginHorizontal: '3.5%',
        marginTop: '15%'
    }
})

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    data: store.userState.data
})

const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser, fetchData}, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Add);