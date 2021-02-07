
import firebase from 'firebase';
require("firebase/firestore")

export const retrieve = (workoutName) => {
    const workoutData = firebase.firestore()
        .collection("data")
        .doc(firebase.auth().currentUser.uid)//fetches a document
        .collection(workoutName)             //fetches a collection
        .orderBy("timestamp", "asc")         //fetches by ascending order of the timestamps
        .get()
        .then((snapshot) => {
            let data = snapshot.docs.map(doc => {
                const x = doc.data();
                const id = doc.id;
                return {id, ...x}
            })
            // console.log(data)
            return data;
        })
    return workoutData;
}