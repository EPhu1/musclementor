import React from 'react'
import { View, Text, FlatList,Button } from 'react-native';
import firebase from 'firebase'
require('firebase/firestore')
import { connect } from 'react-redux';


const Profile = (props) => {
    const { currentUser, data } = props;
    console.log({currentUser, data})
    return (
        <View>
            <Text>Profile</Text>
            <Button
                title="Logout"
                onPress={() => onLogout()}
            />
        </View>
    )
}

const onLogout = () => {
    firebase.auth().signOut();
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    data: store.userState.data
})

export default connect(mapStateToProps, null)(Profile)