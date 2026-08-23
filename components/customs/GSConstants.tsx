import {  FlatList, View, Text, Pressable, ScrollView, Image, Modal, KeyboardAvoidingView, TextInput, Keyboard, TouchableOpacity } from "react-native";
import {useState, useEffect, useCallback} from "react";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import {Checkbox} from "expo-checkbox"

import {GSS} from '@/components/customs/Styles';
//import { FlatList } from "react-native-reanimated/lib/typescript/Animated";

import DateTimePicker, {DateTimePickerChangeEvent} from "@react-native-community/datetimepicker"

    //Variables------------------------------

    export const [isAddSourceModalVisible, setIsAddSourceModalVisible] = useState(false);
    
    //use these to show/hide lists
    export const [showTimeFrameList, setShowTimeFrameList] = useState(false);
    export const [showSourceTypeList, setShowSourceTypeList] = useState(false);
    export const [showCurrencyList, setShowCurrencyList] = useState(false);

    //use these to store the values in the AddSource Menu
    export const [storedTimeFrame, setStoredTimeFrame] = useState(null);
    export const [storedSourceType, setStoredSourceType] = useState(null);
    export const [storedCurrency, setStoredCurrency] = useState(null);
    
    export const [sourceName, setSourceName] = useState('');

    export const [storedAmount, setStoredAmount] = useState('');
    export const [wasObtained, setWasObtained] = useState(false);
    export const [isPreset, setIsPreset] = useState(false);
    
    export const [currList, setCurrList] = useState('');
    export const [currStore, setCurrStore] = useState('');


    export const [fromDate, setFromDate] = useState<Date>();
    export const [toDate, setToDate] = useState<Date>();
    export const [showFromDatePicker, setShowFromDatePicker] = useState(false);
    export const [showToDatePicker, setShowToDatePicker] = useState(false);
    

    //Types------------------------------

    export type Source={
        name: "",
        timeframe: "",
        from?: Date,
        to?: Date,
        CurrencyType: Currency,
        amount: 0,
        ObtainType: string,
        obtained: boolean,
        preset: boolean 
    }

    export type Currency={
        name: "",
        visual: Image,
        value: 1, 
        isBatch: false,
        realWorldValue: 0
    }

    //60 Polychrome for $0.99
    //1 Polychrome for $0.0165
    export type Banner={
        name: string, 
        visual?: Image,
        visualLink?: ""
        Ranks: string,
        hasPity: boolean,
        pityPoint: number,
        AcceptableCurrency: Currency
    }

    export type Rank={
        name: String
        visual?: Image
    }

    //Arrays------------------------------

    export const Base_Currencies=[
        {
            name:"Polychromes",
            visualLink: "@/components/TestImages/Zzz-polychrome.webp",
            value: 1,
            isBatch: false,
            realWorldValue: 0.0165
        },

        {
            name:"Encrypted Master Tape",
            visualLink: "@/components/TestImages/Item_Encrypted_Master_Tape.webp",
            value: 160,
            isBatch: true,
            realWorldValue: 2.64
        }
    ]

    export const DefaultRankList=[
        {name: "S", visual: null},
        {name: "A", visual: null},
        {name: "B", visual: null},
    ]

    export const TimeFrame_Selection=[
        "Daily",
        "Weekly",
        "BiWeekly",
        "Custom"
    ]
    export const SourceType_Selection=[
        "Gift",
        "Free",
        "Paid",
    ]

    //Functionss------------------------------


    export const handleDateChange = useCallback(
        (event: DateTimePickerChangeEvent, selectedDate : Date, type: string) => {
                
            var currentDate = new Date();
            console.log(event)

            switch(type){
                case "from":
                currentDate = selectedDate || fromDate;
                console.log("From:" + currentDate)
                setFromDate(currentDate)
                setShowFromDatePicker(false);
                break;

                case "to":
                currentDate = selectedDate || toDate;
                console.log("To:" + currentDate)
                setToDate(currentDate)
                setShowToDatePicker(false);
                break;
            }
            //pressing cancel does not automatically set the variable to false of course
            //you'll need to specify that yourself.
        },[fromDate, toDate]
    );

    //function to hide list and store variable
    export const hideList = useCallback(
        (item: any, which_list: string) => {
            Keyboard.dismiss();
            
            switch(which_list){
                case "TimeFrame":
                    setStoredTimeFrame(item);
                    setShowTimeFrameList(false);
                    setCurrList('ShowTimeFrameList');
                    setCurrStore('storedTimeFrame');
                    
                    break; 
                case "SourceType":
                    setStoredSourceType(item);
                    setShowSourceTypeList(false);
                    setCurrList('ShowSourceTypeList');
                    setCurrStore('storedSourceType');
                    
                    break; 
                case "CurrencyType":
                    setStoredCurrency(item);
                    setShowCurrencyList(false);
                    setCurrList('ShowCurrencyList');
                    setCurrStore('storedCurrency');

                    break; 

                default:
                    break;
            }

        }, [currList, currStore]
    );

    const handleAddSource = async () => {
        const trimSourceName = sourceName.trim();
        
        if(!trimSourceName) return;

        setSourceName('');
        setIsAddSourceModalVisible(false)
    }
    

