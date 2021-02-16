import React, { Component } from 'react'
import { View, Button, TextInput } from 'react-native'
import firebase from 'firebase'


export default class Login extends Component {
    onSignIn(){
        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log(userCredential)
        })
        .catch((error) => {
            console.log(error)
            alert(error)
        })
    }

    render() {
        return (
            <View>
                <TextInput
                    placeholder = "email"
                    onChangeText = {(email) => this.setState({email})}
                />
                <TextInput
                    placeholder = "password"
                    secureTextEntry = {true}
                    onChangeText = {(password) => this.setState({password})}
                />
                <Button
                    title = "Sign In"
                    onPress = {() => this.onSignIn()}
                />
            </View>
        )
    }
}
