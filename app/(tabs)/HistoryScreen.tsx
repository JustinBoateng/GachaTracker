import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import React, {useCallback, useState} from 'react'

import DateTimePicker, { DateTimePickerChangeEvent } from "@react-native-community/datetimepicker"

export default function HistoryScreen(){
    
    const [date, setDate] = useState<Date>();
    const [showPicker, setShowPicker] = useState(false);

    const handleDateChange = useCallback(
        (event: DateTimePickerChangeEvent, selectedDate : Date) => {
                const currentDate = selectedDate || date;
                console.log(currentDate)
                setDate(currentDate)

            setShowPicker(false);
            //pressing cancel does not automatically set the variable to false of course
            //you'll need to specify that yourself.
        },[date]
    );
    return (
        <SafeAreaView style={{flex: 1, justifyContent: "center", alignItems:"center"}}>

            <Text> HistoryScreen </Text>

            <TouchableOpacity
            onPress={() => setShowPicker(true)}
            style={{
                //flex: 1,
                backgroundColor: "#00ffff"

            }}>
                <Text style={{
                    fontSize:16,
                    marginHorizontal: 10
                }}> Open Date Picker</Text> 
            </TouchableOpacity>

            { showPicker ?
                
                <DateTimePicker
                mode={'date'}
                value={date || new Date()} //choose from the date constant or the current date
                onValueChange={handleDateChange}
                />
                :
                null
            }
        </SafeAreaView>
    );
}