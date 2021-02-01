import React, { Component } from 'react';
import { View, Text} from 'react-native';
import firebase from 'firebase';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers';
import thunk from 'redux-thunk';
const store = createStore(rootReducer, applyMiddleware(thunk))

import LandingScreen from "./components/auth/Landing";
import RegisterScreen from "./components/auth/Register";
import LoginScreen from './components/auth/Login';
import MainScreen from './components/Main';

const firebaseConfig = {
  apiKey: "AIzaSyCuERCjqgz9YdoLRc9OHX9qLSNNPlnA3hI",
  authDomain: "muscle-mentor.firebaseapp.com",
  projectId: "muscle-mentor",
  storageBucket: "muscle-mentor.appspot.com",
  messagingSenderId: "913616370097",
  appId: "1:913616370097:web:aedb3c0f8c6fbe942ba590",
  measurementId: "G-ZF6F4N0FBT"
};

if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig)
}

const Stack = createStackNavigator();

export class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: false,
    }
  }
  
  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if(!user){
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      }else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }

  render() {
    const { loggedIn, loaded } = this.state;
    if(!loaded){
      return(
        <View style = {{flex: 1, justifyContent: 'center'}}> 
          <Text>Loading</Text>
        </View>
      )
    }
    if(!loggedIn){
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName = "Landing">
            <Stack.Screen name = "Landing" component = {LandingScreen} options = {{ headerShown: false }}/>
            <Stack.Screen name = "Register" component = {RegisterScreen}/>
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    else{
      return(
        <Provider store = {store}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName = "Main">
              <Stack.Screen name = "Main" component = {MainScreen} options = {{ headerShown: false }}/>
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      )
    }
  }
}

export default App
