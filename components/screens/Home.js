import React from 'react'
import { View, Text, Button} from 'react-native';

export default function Home(props) {
    return (
        <View>
            <Text>Home</Text>
            <Button
                title = "go to add"
                onPress = {() => props.navigation.navigate("Add")}
            />
        </View>
    )
}
