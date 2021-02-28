import React, {useState} from 'react'
import { View, Text, Dimensions, Button} from 'react-native';
import { WORKOUT_GROUPS } from '../constants/workouts';

function Home() {
    console.log(WORKOUT_GROUPS['benchpress']);
    return (
        <View>
            <Text>Home</Text>
        </View>
    )
}

export default Home;