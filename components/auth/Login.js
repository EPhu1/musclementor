import React, { Component } from 'react'
import { View, Button, TextInput } from 'react-native'
import firebase from 'firebase'


    onSignIn(){
        firebase.auth().signInWithEmailAndPassword(email, password)
        })
        .catch((error) => {
            console.log(error)
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
