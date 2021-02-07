import React from 'react'
import { View, Text, FlatList, StyleSheet} from 'react-native';

const DataTable = ({data}) => {
    const colors = ['#FFF8E5', '#FFFFFF']
    return(
        <View style = {{flex: 1}}>
            <View style = {styles.data_table_container}>
                <View style = {{flexDirection: 'row'}}>
                    <View style = {{width: '55%'}}>
                        <Text>Date</Text>
                    </View>
                    <View style = {{width: '25%'}}>
                        <Text>Weight (lbs)</Text>
                    </View>
                    <View style = {{width: '25%'}}>
                        <Text>Repititions</Text>
                    </View>
                </View> 
                <FlatList
                    data = {data}
                    renderItem = {({item, index}) => (
                        <View style = {[styles.data_table_entry, {backgroundColor: colors[index % colors.length]}]}>
                            <View style = {{width: '55%'}}>
                                <Text>{(new Date(item.timestamp)).toLocaleString()}</Text>
                            </View>
                            <View style = {{width: '25%'}}>
                                <Text>{item.weight}</Text>
                            </View>
                            <View style = {{width: '25%'}}>
                                <Text>{item.reps}</Text>
                            </View>
                        </View>
                    )}
                />
            </View> 
        </View>
    )
}

const styles = StyleSheet.create({
    data_table_container: {
        borderWidth: 1,
        borderColor: 'gray',
        backgroundColor: 'white',
        marginVertical: '5%'
    },
    data_table_entry: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: 'gray',
    },

})

export default DataTable;
