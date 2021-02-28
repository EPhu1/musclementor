import React, {useState, useEffect} from 'react'
import { View, Text, Dimensions} from 'react-native';
import { LineChart } from "react-native-chart-kit";
import { WathanRPMFormula } from "../functions/calculations";

const DataChart = ({workoutData}) => {
    if(workoutData.length <= 2){
        return (
            <View>
                <Text>Enter at least three workouts to view One Rep Max data.</Text>
            </View>
        )
    }
    else{
        const [oneRM_Week, setOneRM_Week] = useState([0]); //a list of one rep maxes for the past 7 workouts
        const [dates, setDates] = useState([0]); 
        const [highest1RM, setHighest1RM] = useState(["", ""]) // an array of length 2 containing the highest 1RM of all time and the date

        const initializeData = () => { //calculates 1RM and dates for the past 7 workouts and saves them to oneRM and dates.
            let oneRM_list = [];
            let dates_list = [];
            if(workoutData.length > 7){
                workoutData = workoutData.slice(0,7); //we only use the 7 latest workout data
            }
            for(let i = workoutData.length - 1; i >= 0; i--){ //we need to iterate backwards since the workout data is in descending order
                let month = (new Date(workoutData[i].timestamp)).getMonth() + 1; //months from 1-12
                let day = (new Date(workoutData[i].timestamp)).getDate();
                let year = (new Date(workoutData[i].timestamp)).getFullYear();
                oneRM_list.push(parseInt(WathanRPMFormula(workoutData[i].weight, workoutData[i].reps)));
                dates_list.push((month + "/" + day + "/" + parseInt(year)%2000).toString());

            }
            setOneRM_Week(oneRM_list);
            setDates(dates_list);
        }

        const findMaximum1RM = () => { //finds the maximum one rep max and saves it to max1RM
            let max = 0;
            let maxSeconds = 0;
            for(let i = 0; i < workoutData.length; i++){
                max = (Math.max(max, WathanRPMFormula(workoutData[i].weight, workoutData[i].reps)));
                maxSeconds = workoutData[i].timestamp;
            }
            let month = (new Date(maxSeconds)).getMonth() + 1; //months from 1-12
            let day = (new Date(maxSeconds)).getDate();
            let year = (new Date(maxSeconds)).getFullYear();
            setHighest1RM([max, month + "/" + day + "/" + year]);
        }

        useEffect(() => {
            initializeData();
            findMaximum1RM();
        }, [workoutData])
    
        const chartConfig = {
            backgroundGradientFrom: "#193088",
            backgroundGradientFromOpacity: 1,
            backgroundGradientTo: "#3d5ddb",
            backgroundGradientToOpacity: 1,
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`, //color of the text
            strokeWidth: 2, // optional, default 3
            barPercentage: 1,
            useShadowColorFromDataset: false // optional
        };
    
        const data = {
            labels: dates,
            datasets: [{
                    data: oneRM_Week,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // optional, color of the lines
                    strokeWidth: 2 // width of the lines
            }],
            legend: ["One Rep Max (Past 7 Workouts)"] // optional
        };
        return (
            <View style = {{marginTop: 15}}>
                <Text>Your highest 1RM is {highest1RM[0]} lbs on {highest1RM[1]}.</Text>
                <LineChart
                    data={data}
                    width={Dimensions.get("window").width}
                    height={200}
                    chartConfig={chartConfig}
                    style = {{marginRight: 15}} //issue with modifying marginHorizontal and marginRight.
                />
            </View>
        )
    }
};

export default DataChart;