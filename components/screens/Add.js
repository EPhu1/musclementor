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
                            style = {styles.imgs}
                            source={require('./lift-pictures/' + item.id.toString() + '.PNG')} 
                            // source={require('./lift-pictures/3.PNG')}
                        
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
                    style = {{height: 40}}
                    label = "Weight"
                    value = {weight}
                    onChangeText = {(weight) => setWeight(weight)}
                    theme = {{colors: {primary: "#006aff"}}}
                    mode = 'outlined'
                />
                <TextInput
                    style = {{height: 40}}
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
                <DataTable data = {myData}/>
            </View>
        )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        marginHorizontal: '2%',
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    data: store.userState.data
})

const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser, fetchData}, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Add)