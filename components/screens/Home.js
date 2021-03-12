import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, Button, FlatList} from 'react-native';
import { WORKOUTS, WORKOUT_RATIOS_MALE} from '../constants/workouts';

import firebase from 'firebase';
require("firebase/firestore")

function Home() {
    const [allData, setAllData] = useState([]); //every workout so far stored as a dictionary of arrays.
    const [userInfo, setUserInfo] = useState(0);
    const lightColors = {green: "#80dfbc", yellow: '#f5f09a', red: '#fda08e'};
    const darkColors = {green: "#c0efde", yellow: '#faf8cd', red: '#fecfc6'};

    const retrieveUserWeight = () => {
        firebase.firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)      
            .get()
            .then((snapshot) => {
                if(snapshot.exists){
                    setUserInfo(snapshot.data())
                    return snapshot.data()
                }
                else{
                    console.log('user info does not exist')
                }
            })
    }

    const retrieveData = async (workoutName) =>{ 
        let x = await firebase.firestore()
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
                return data;
            })
        return x
    }


    // const calculateScore = (sum, workoutRatio, data) => {
    //     retrieveUserWeight();
    //     console.log(userInfo.weight, "xd");
    //     const score = (sum / data.length) / (userInfo.weight * workoutRatio); //need to replace 150 with userWeight
    //     return score;
    // }

    useEffect(() => {
        let temp = []
        retrieveUserWeight()
        
        Promise.all([retrieveData('benchpress'), retrieveData('deadlift'), retrieveData('squat'), retrieveData('chin-up'), 
                     retrieveData('pull-up'), retrieveData('dip'), retrieveData('military press'), retrieveData('pushup')
                     , retrieveData('lat pulldown'), retrieveData('dumbbell lunge'), retrieveData('hip thrust'),
                      retrieveData('dumbbell benchpress')]).then((values) => {
            values.forEach((data, i) => {
                let sum = 0;
                data.forEach((datum) => {
                    sum += parseInt(datum.weight); 
                })
                // retrieveUserWeight();
                // console.log(userInfo.weight)
                const workoutRatio = WORKOUT_RATIOS_MALE[WORKOUTS[i].name];
                const score = (sum / data.length) / (150 * workoutRatio); //need to replace 150 with userWeight
                if(sum >= 1){
                    sum = 1;
                }
                if(sum > 0){
                    temp.push({name: WORKOUTS[i].name, score: score});
                }
                temp.sort((a, b) => (a.score > b.score) ? -1 : 1) //sort object by the descending order of sum

            })
            // let sortedObjs = _.sortBy( temp, 'score' ).reverse(); //sort object by the descending order of sum
            setAllData(temp)
        })
    }, [])

    return (
        <View style = {styles.root}>
            <Text style = {{textAlign: 'center', fontSize: 25, marginBottom: '2%', fontWeight: 'bold'}}>Strengths and Weaknesses</Text>
            <Text style = {{textAlign: 'center', fontSize: 15, fontStyle: 'italic'}}>Recommended protein intake for muscle growth:</Text>
            <Text style = {{textAlign: 'center', fontSize: 15, marginBottom: '5%', fontStyle: 'italic'}}>~{userInfo.weight*1.5} grams</Text>
            {allData.length == 0 ? <Text style = {{textAlign: 'center'}}>Enter a workout to view statistics</Text> : null}
            <FlatList
                data = {allData}
                keyExtractor = {(item) => item.name}
                renderItem = {({item}) => (
                    <View style = {{flexDirection: 'row'}}>
                        <Text style = {{width: 90, fontWeight: "bold"}}>
                            {item.name}
                        </Text>
                        <View style = {[styles.bar, {backgroundColor: (item.score > .33 ? (item.score > .67 ? darkColors.green : darkColors.yellow) : darkColors.red)}]}>
                            <View style = {{borderRadius: 5, width: (((item.score * 100).toFixed(2)).toString() + "%"), 
                            height: '100%', backgroundColor: (item.score > .33 ? (item.score > .67 ? lightColors.green : lightColors.yellow) : lightColors.red)}}>
                                {item.score > 0.15? 
                                    <Text>
                                        {item.score > 0.33 ?
                                            (item.score > 0.67 ? 'Advanced' : 'Intermediate')
                                            : 'Novice'
                                        }
                                    </Text>
                                    : null
                                }
                            </View>
                        </View>
                    </View>
                )}
            />

        </View>
    )
    

}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        marginHorizontal: '2%',
        marginTop: '10%',
    },
    bar: {
        flex: 1,
        flexDirection: 'row',
        width: '75%',
        height: 25, 
        marginBottom: 15,
        borderRadius: 5, 
        borderColor: 'gray', 
        borderWidth: 1.5,
    }
})

export default Home;