import {  FlatList, View, Text, Pressable, ScrollView, Image, Modal, KeyboardAvoidingView, TextInput, Keyboard, TouchableOpacity } from "react-native";
import {useState, useEffect, useCallback} from "react";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";


import {GSS} from '@/components/customs/Styles';
import {AddSourceModal, BannerPlate} from "@/components/customs/GSConstants"



export default function GachaScreen(){


    
    const [isAddSourceModalVisible, setIsAddSourceModalVisible] = useState(false);

    return (
        <SafeAreaProvider>
            <SafeAreaView style={GSS.container}>
                <ScrollView>
                {/*<ScrollView contentContainerStyle={GSS.ScView_Cont}>*/}
                    <View style={GSS.ScView_Cont}>
                        {/*Top Row*/}
                        <View style={GSS.top_row}>
                            <Pressable style={GSS.SwitchButton} onPress={() => alert("A Button")}>
                                <Text> S</Text>
                            </Pressable>
                            <Pressable style={GSS.GameInfo_Button} onPress={() => alert("B Button")}>
                                <Text> /Name of Game </Text>
                            </Pressable>
                        </View>

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
                                    fontSize: 20
                                }}>
                                    Add Source
                                </Text>
                            </Pressable>
                            <View style={GSS.SourceList}>
                                <Text style={{fontSize:20}}>
                                    FREE.............
                                </Text>

                                <FlatList
                                style={{
                                    gap: 2
                                }}
                                data={[]}
                                renderItem={
                                    ({item}) => 
                                    <TouchableOpacity
                                    style={{
                                        flexDirection: "row",
                                        backgroundColor: "#0099dd",
                                        borderRadius: 5,
                                    }}>

                                        <Text>item.name</Text>
                                    </TouchableOpacity>
                                    
                                }
                                keyExtractor={(item) => item}
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
                </ScrollView>                
                
                <AddSourceModal visible={isAddSourceModalVisible} onClose={() => setIsAddSourceModalVisible(false)}/> 
            
            </SafeAreaView>
        </SafeAreaProvider>
    );
}