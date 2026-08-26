import {  FlatList, View, Text, Pressable, ScrollView, Image, Modal, KeyboardAvoidingView, TextInput, Keyboard, TouchableOpacity } from "react-native";
import {useState, useEffect, useCallback} from "react";

import AsyncStorage from '@react-native-async-storage/async-storage';

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";


import {GSS} from '@/components/customs/Styles';
import {AddSourceModal, BannerPlate, Source, Source_SaveData_Address} from "@/components/customs/GSConstants"

export const storedSources_SaveData : Source[] = []






export default function GachaScreen(){

    const[Source_SaveData, setSource_SaveData] = useState<Source[]>([
        {
            id: "0000+0000",
            name: "sourceName",
            timeframe: "storedTimeFrame",
            from: "fromDate.toLocaleDateString()",
            to: "toDate.toLocaleDateString()",
            CurrencyType:         
            {                    
                CurrencyName:"Polychromes",
                visualLink: require("@/components/TestImages/Zzz-polychrome.webp"),
                value: 1,
                isBatch: false,
                realWorldValue: 0.0165
            }
            ,
            amount: 10,
            retrievalType: "storedSourceType",
            obtained: false,
            preset: false
}
    ]);


    const storeSource = async(
        S : Source
    ) => {
        try{
            const S_Mirror = [S, ...Source_SaveData];
            setSource_SaveData(S_Mirror);
            //Try to clear all the text input boxes before hide menu
            setIsAddSourceModalVisible(false);

            //try to save the S_Mirror, 
            //NOT The Source_SaveData state, because, I assume, this is a try/catch, and the state hasn't been set yet.
            await AsyncStorage.setItem(Source_SaveData_Address, JSON.stringify(S_Mirror))
            Keyboard.dismiss();
            console.log("Stored Sources: " + Source_SaveData);
            


        }catch (error) {console.log(error)}
    }

    const getSources = async(
        setterFunction: (SourceList: Source[]) => void
    ) => {
        try{
            //try to retrieve the Source List from the Source SaveData Address
            const SL = await AsyncStorage.getItem(Source_SaveData_Address)


            //if source list exists, set that information as the source_save_data
            if(SL !== null){
                setterFunction(JSON.parse(SL))
            }
        }catch(error){console.log(error)}
    }

    useEffect(() => {
        //AsyncStorage.removeItem(Source_SaveData_Address);
        getSources(setSource_SaveData);
    }, [])

    
    const [isAddSourceModalVisible, setIsAddSourceModalVisible] = useState(false);

    return (
        <SafeAreaProvider>
            <SafeAreaView style={GSS.container}>
                <View>
                {/*<ScrollView contentContainerStyle={GSS.ScView_Cont}>*/}
                    <View style={GSS.ScView_Cont}>
                        {/*Top Row*/}
                        {/*
                        <View style={GSS.top_row}>
                            <Pressable style={GSS.SwitchButton} onPress={() => alert("A Button")}>
                                <Text> S</Text>
                            </Pressable>
                            <Pressable style={GSS.GameInfo_Button} onPress={() => alert("B Button")}>
                                <Text> /Name of Game </Text>
                            </Pressable>
                        </View>
                        */}

                        {/*Nameplate*/}
                        <BannerPlate/>

                        {/*Progress Info*/}
                        <View style={{
                            alignItems:"center",
                            flexDirection:"column",
                            width: "100%",
                            height: 70
                        }}>
                            <View style={GSS.progressBar}>
                                <View style={GSS.progressBar_current}>
                                <Text> Progress Bar A </Text>
                                </View>
                            </View>

                            <View style={{
                                width: "90%",
                                flexDirection:"row",
                                //backgroundColor:"#ffd000",
                                justifyContent:"flex-end",
                                alignContent: "flex-end"
                            }}>
                                <Text style={{
                                    color: "#ffffff",
                                    fontSize: 20,
                                }}>Progress: 99999/99999</Text>
                            </View>
                        </View>

                        {/*Current / Obtainable Counts*/}
                        <View style={GSS.currentObtainable}>

                                <Pressable style={GSS.currentView}>
                                    <Text>Current </Text>
                                    <Text>99999 </Text>
                                </Pressable>

                                <Pressable style={GSS.obtainableView}>
                                    <Text> Obtainable </Text>
                                    <Text> 99999 </Text>
                                </Pressable>

                        </View>

                        {/*Sources*/}
                        <View style={GSS.SourcesWindow}>
                            <Pressable style={GSS.AddSource} onPress={() => setIsAddSourceModalVisible(true)}>
                                <Text style={{
                                    color:"#ffffff",
                                    fontSize: 20,
                                    paddingHorizontal: 10
                                }}>
                                    + Add Source
                                </Text>
                            </Pressable>
                            <View style={GSS.SourceList}>
                                <Text style={{fontSize:20}}>
                                    FREE.............
                                </Text>

                                <FlatList
                                style={{
                                    gap: 2,
                                    flexDirection:"row"
                                }}
                                data={Source_SaveData}
                                renderItem={
                                    ({item}) => 
                                    <TouchableOpacity
                                    style={{
                                        flexDirection: "row",
                                        backgroundColor: "#0099dd",
                                        borderRadius: 5,
                                    }}>

                                        <Text>{item.name}</Text>
                                    </TouchableOpacity>
                                    
                                }
                                keyExtractor={item => item.id}
                                />

                                <Text style={{fontSize:20}}>
                                    GIFT.............
                                </Text>

                                <Text style={{fontSize:20}}>
                                    PAID.............
                                </Text>
                            </View>

                        </View>


                        <View>                
                            <Text> GachaScreen </Text>
                        </View>
                    </View>
                </View>                
                
                <AddSourceModal 
                visible={isAddSourceModalVisible} 
                addSource={storeSource}
                onClose={() => setIsAddSourceModalVisible(false)}/> 
            
            </SafeAreaView>
        </SafeAreaProvider>
    );
}