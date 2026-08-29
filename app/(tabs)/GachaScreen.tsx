import {  FlatList, View, Text, Pressable, ScrollView, Image, Modal, KeyboardAvoidingView, TextInput, Keyboard, TouchableOpacity } from "react-native";
import {useState, useEffect, useCallback} from "react";

import AsyncStorage from '@react-native-async-storage/async-storage';

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";


import {GSS} from '@/components/customs/Styles';
import {BannerPlate, Source, SourceColors, Base_Currencies} from "@/components/customs/GSConstants"
import {Source_SaveData_Address, Currency_SaveData_Address} from "@/components/customs/GSConstants"
import {AddSourceModal, SourceDetailsModal, EnterCurrencyModal} from "@/components/customs/GSConstants"

import {LinearGradient} from "expo-linear-gradient"

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
            retrievalType: "Gift",
            obtained: false,
            preset: false
}
    ]);

    const[Currency_SaveData, setCurrency_SaveData] = useState(0);

    const storeSource = async(
        S : Source
    ) => {
        try{
            const S_Mirror = [S, ...Source_SaveData];
            setSource_SaveData(S_Mirror);
            //Try to clear all the text input boxes before hide menu
            setModalVisible("");

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

    const setCCSData = async () => {
        try{
                        
        } catch(error){ console.log(error)}
    }

    const getCCSData = async () => {
        try{
            const CSD = await AsyncStorage.getItem(Currency_SaveData_Address)
            if(CSD !== null){
                setCurrCurrency(JSON.parse(CSD));
            }

        } catch(error){ console.log(error)}
    }

    useEffect(() => {
        //AsyncStorage.removeItem(Source_SaveData_Address);
        getSources(setSource_SaveData);
        getCCSData();
    }, [])

    useEffect(() => {
        let sum = 0;
        for(let i = 0; i < Source_SaveData.length; i++){
            let currSource = Source_SaveData[i];

            //Polychrome Calculation
            if(currSource.CurrencyType.CurrencyName == Base_Currencies[0].CurrencyName)
                sum += Source_SaveData[i].amount

            //Encrypted Master Tape Calculation
            else if(currSource.CurrencyType.CurrencyName == Base_Currencies[1].CurrencyName)
                sum += Source_SaveData[i].amount * 160
        }
        setObtainable(sum);

    }, [Source_SaveData])
    
    const [ModalVisible, setModalVisible] = useState("");
    const [currSource, setCurrSource] = useState<Source>(Source_SaveData[0]);

    const [currCurrency, setCurrCurrency] = useState(0);
    const [obtainable, setObtainable] = useState(0);

    const updateCurrentCurrency = async (C : number) => {
        try{
            setCurrCurrency(C);
            await AsyncStorage.setItem(Currency_SaveData_Address,JSON.stringify(C))
            console.log("Storing Currency: " + C)
        }
        catch(error) {console.log(error)}
        //console.log("Currency: " + currCurrency)
    }


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

                                <Pressable 
                                style={GSS.currentView}
                                onPress={() => setModalVisible("EnterCurrency")}>
                                    <Text>Current </Text>
                                    <Text>{currCurrency} </Text>
                                </Pressable>

                                <Pressable style={GSS.obtainableView}>
                                    <Text> Obtainable </Text>
                                    <Text> {obtainable} </Text>
                                </Pressable>

                        </View>

                        {/*Sources*/}
                        <View style={GSS.SourcesWindow}>
                            <Pressable 
                                style={GSS.AddSource} 
                                onPress={() => setModalVisible("AddSource")}>
                                <Text style={{
                                    color:"#ffffff",
                                    fontSize: 20,
                                    paddingHorizontal: 10
                                }}>
                                    + Add Source
                                </Text>
                            </Pressable>
                            <View style={GSS.SourceList}>
                                {/*}
                                <Text style={{fontSize:20, backgroundColor:"#00ff00", width: "100%"}}>
                                    FREE.............
                                </Text>
                                */}
                                <FlatList
                                style={{
                                    //gap: 4,
                                    //flexDirection:"column",
                                    //backgroundColor: "#ff0000",
                                    width: "100%",
                                    //justifyContent: "flex-start",
                                    //alignItems: "center",
                                    flex: 1,
                                    marginVertical: 12
                                    //alignSelf: "stretch"
                                }}
                                contentContainerStyle={{
                                    //justifyContent:"center",
                                    //alignItems: "center"
                                    gap: 12
                                }}

                                data={Source_SaveData}
                                renderItem={
                                    ({item}) => 
                                    <TouchableOpacity
                                    onPress={() => {
                                        setCurrSource(item);
                                        setModalVisible("SourceDetails")
                                        }
                                    }>
                                    <LinearGradient
                                    colors={["#92dffe00", SourceColors[item.retrievalType], "#440e5000"]}
                                    start={{"x": 0.0, "y": 0.5}}
                                    end={{"x":1.0, "y":0.5}}

                                    style={{
                                        
                                        flexDirection: "row",
                                        //backgroundColor: LinearGradient,
                                        borderRadius: 5,
                                        width: "90%",
                                        //height: "50%",
                                        alignSelf: "center",
                                        padding: 15,
                                        
                                        justifyContent:"flex-start", //move items to the left
                                        alignItems: "center", //center the background image
                                        overflow:"hidden", //crop the image in the background


                                    }}>
                                        <Image 
                                        source={item.CurrencyType.visualLink} 
                                        style={{
                                            //width: "40%",
                                            //height: "40%",
                                            position: "absolute", //make the image go behind the text AND be cropped
                                            //resizeMode: "cover",
                                            //backgroundColor:"#ffffff4d",
                                            opacity:0.3
                                        }}/>
                                        <View style={{
                                            flexDirection:"row",
                                            width:"100%",
                                            justifyContent:"flex-end",
                                            //backgroundColor: "red"
                                        }}>
                                            <Text style={{
                                                color: "#000000",
                                                fontSize: 20,
                                                fontWeight: "bold"
                                            }}>{item.name} x{item.amount}</Text>
                                        </View>
                                    </LinearGradient>
                                    </TouchableOpacity>
                                    
                                }
                                keyExtractor={item => item.id}
                                />

                                {/*}
                                <Text style={{fontSize:20}}>
                                    GIFT.............
                                </Text>

                                <Text style={{fontSize:20}}>
                                    PAID.............
                                </Text>
                                */}
                            </View>

                        </View>


                        <View>                
                            <Text> GachaScreen </Text>
                        </View>
                    </View>
                </View>                
                
                <AddSourceModal 
                visible={ModalVisible == "AddSource"} 
                addSource={storeSource}
                onClose={() => setModalVisible("")}/> 

                <SourceDetailsModal 
                visible={ModalVisible == "SourceDetails"} 
                SDetails={currSource}
                onClose={() => setModalVisible("")}/> 

                <EnterCurrencyModal 
                visible={ModalVisible == "EnterCurrency"} 
                calculation={updateCurrentCurrency}
                onClose={() => setModalVisible("")}/> 

                                    
        

            </SafeAreaView>
        </SafeAreaProvider>
    );
}