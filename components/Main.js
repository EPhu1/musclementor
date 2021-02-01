import React, { Component } from 'react'
import { View, Text} from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser, fetchData } from '../redux/actions/index';

import HomeScreen from './screens/Home';
import AddScreen from './screens/Add';
import ProfileScreen from './screens/Profile';

import firebase from 'firebase';

const Tab = createMaterialBottomTabNavigator();

export class Main extends Component {
    componentDidMount(){
        this.props.fetchUser();
        this.props.fetchData();
    }
    render() {
        return(
            <Tab.Navigator initialRouteName = "Home" labeled = {true}>
                <Tab.Screen name="Profile" component={ProfileScreen} 
                options = {{
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name = "account-circle" color = {color} size = {26}/>
                    ),
                }}/>
                <Tab.Screen name="Home" component={HomeScreen} 
                options = {{
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name = "home" color = {color} size = {28}/>
                    ),
                }}/>
                 <Tab.Screen name="Add" component={AddScreen} 
                options = {{
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name = "weight-lifter" color = {color} size = {24}/>
                    ),
                }}/>
            </Tab.Navigator>
        )
    }
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser, fetchData}, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main)
