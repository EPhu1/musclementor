import { USER_STATE_CHANGE, DATA_STATE_CHANGE } from '../constants/index';
import firebase from 'firebase';

export function fetchUser() {
    return ((dispatch) => {
        firebase.firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() })
                }
                else {
                    console.log('does not exist')
                }
            })
    })
}

export function fetchData(workout) {
    return ((dispatch) => {
        firebase.firestore()
            .collection("data")
            .doc(firebase.auth().currentUser.uid)//fetches a document
            .collection("benchpress")             //fetches a collection
            .orderBy("timestamp", "asc")         //fetches by ascending order of the timestamps
            .get()
            .then((snapshot) => {
                let data = snapshot.docs.map(doc => {
                    const x = doc.data();
                    const id = doc.id;
                    return {id, ...x}
                })
                // console.log(data)
                dispatch({ type: DATA_STATE_CHANGE, data })
            })
    })
}