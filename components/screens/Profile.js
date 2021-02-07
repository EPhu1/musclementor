import React from 'react'
import { View, Text, FlatList } from 'react-native';

import { connect } from 'react-redux';


const Profile = (props) => {
    const { currentUser, data } = props;
    console.log({currentUser, data})
    return (
        <View>
            <Text>Profile</Text>
        </View>
    )
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    data: store.userState.data
})

export default connect(mapStateToProps, null)(Profile)

