import React, { Component } from 'react'
import { View, Button, TextInput } from 'react-native'
import firebase from 'firebase'

export default class Register extends Component {

    // const [x, repError] = useState("")


    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            name: ''
        }

        this.onSignUp = this.onSignUp.bind(this)
    }

    onSignUp(){
        const { email, password, name } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((result) => {
            //STORING ONTO FIRESTORE (1:02:14 timestamp)
            firebase.firestore().collection("users")
            .doc(firebase.auth().currentUser.uid)
            .set({
                //saves name and email
                name,
                email
            })
            console.log(result)
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
                    placeholder = "name"
                    onChangeText = {(name) => this.setState({name})}
                />
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
                    title = "Sign Up"
                    onPress = {() => this.onSignUp()}
                />
            </View>
        )
    }
}
