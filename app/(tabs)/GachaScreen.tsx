import { View, Text, Pressable, ScrollView, Image, Modal, KeyboardAvoidingView, TextInput } from "react-native";
import {useState, useEffect} from "react";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import {Checkbox} from "expo-checkbox"

import {GSS} from '@/components/customs/Styles';


export default function GachaScreen(){

    const [isAddSourceModalVisible, setIsAddSourceModalVisible] = useState(false);
    const [sourceName, setSourceName] = useState('');

    const [wasObtained, setWasObtained] = useState(false);
    const [isPreset, setIsPreset] = useState(false);

    const handleAddSource = async () => {
        const trimSourceName = sourceName.trim();
        
        if(!trimSourceName) return;

        setSourceName('');
        setIsAddSourceModalVisible(false)

    }

    const TimeFrame=[
        "Daily",
        "Weekly",
        "BiWeekly",
        "Custom"
    ]

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
                        <View style={GSS.nameplate}>
                            <Pressable style= {{
                                flex: 1,
                                //alignSelf: "stretch",
                                //backgroundColor: "#08ff31",
                                position: "relative"
                            }} onPress={() => alert("Nameplate")}>

                                <View style={{
                                    //overflow: "hidden",
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    //backgroundColor: "#ff0000",
                                    flex: 1,
                                    flexDirection: "column"
                                }}>
                                    <Text style={{fontSize:30}}> GOAL </Text>
                                    <View style={{
                                    //backgroundColor:"#49edf3",
                                    flex: 1,
                                    flexDirection:"row"}}>
                                        <Text style={{
                                        fontSize:40, 
                                        overflow:"hidden", 
                                        flexWrap: "nowrap"    
                                        }}>NORMA HOLLOWELL </Text>

                                        <Text style={{
                                        fontSize:40,
                                        overflow:"hidden",
                                        flexWrap: "nowrap"
                                        }}>NORMA HOLLOWELL </Text>
                                    </View>
                                </View>
                                <Image style={{
                                  position:"absolute",
                                  width: "100%",
                                  height: "225%",
                                  top: -20,
                                  left: 100,
                                  //backgroundColor: "#0000ff",
                                  resizeMode: "cover"
                                }}source={require("@/components/TestImages/Norma_TestImg.png")}/>
                            </Pressable>
                        </View>

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

                {/*Modal Menu*/}
                <Modal
                visible={isAddSourceModalVisible}
                transparent animationType="slide"
                onRequestClose={() => setIsAddSourceModalVisible(false)}>

                    {/*Background Opacity*/}
                    <Pressable
                        style={{
                            flex: 1,
                            justifyContent: 'flex-end',
                            backgroundColor:"rgba(157, 78, 230, 0.35)"
                        }}
                        onPress={()=> setIsAddSourceModalVisible(false)}>

                        {/*View to host the Modal Information*/}
                        <KeyboardAvoidingView
                        behavior="padding"
                        style={{
                            paddingHorizontal: 16, paddingBottom: 24
                        }}>

                            {/*Actual Modal Menu*/}
                            <Pressable
                            onPress={(event) => event.stopPropagation()}
                            style={{
                                backgroundColor: "#ffff00",
                                borderTopLeftRadius: 20,
                                borderTopRightRadius: 20,
                                padding: 20,
                                gap: 12
                            }}>
                                {/*Title of the Menu*/}
                                <View><Text>Add Source</Text></View>

                                {/*Name Textbox Input*/}
                                <View>
                                    <Text>Name</Text>
                                    <TextInput
                                        value={sourceName}
                                        onChangeText={setSourceName}
                                        placeholder="Set the Name of the Source of Currency"
                                        returnKeyType="done" //What does this mean?
                                        onSubmitEditing={()=>alert("Name Set")}
                                    />
                                </View>

                                {/*TimeFrame Textbox Input*/}
                                <View>
                                    <Text>Timeframe</Text>
                                    <TextInput
                                        value={sourceName}
                                        onChangeText={setSourceName}
                                        placeholder="Set the TimeFrame"
                                        returnKeyType="done" //What does this mean?
                                        onSubmitEditing={()=>alert("TimeFrame Set")}
                                    />
                                </View>


                                {/*From-To Custom TimeFrame*/}
                                <View style={{flex:1, flexDirection: "row"}}>
                                    {/*From*/}
                                    <View>
                                        <Text>From</Text>
                                        <TextInput
                                            value={sourceName}
                                            onChangeText={setSourceName}
                                            placeholder="Set the TimeFrame"
                                            returnKeyType="done" //What does this mean?
                                            onSubmitEditing={()=>alert("TimeFrame Set")}
                                        />
                                    </View>

                                    {/*To*/}
                                    <View>
                                        <Text>To</Text>
                                        <TextInput
                                            value={sourceName}
                                            onChangeText={setSourceName}
                                            placeholder="Set the TimeFrame"
                                            returnKeyType="done" //What does this mean?
                                            onSubmitEditing={()=>alert("TimeFrame Set")}
                                        />
                                    </View>
                                </View>


                                {/*Type-Amount Sector*/}
                                <View style={{flex:1, flexDirection: "row"}}>
                                    {/*Type*/}
                                    <View>
                                        <Text>TYPE</Text>
                                        <Pressable style={{
                                            backgroundColor: "#ffffff",
                                            width:"90%",
                                            height:"10%"
                                        }}>

                                        </Pressable>
                                    </View>{/*Type*/}


                                    {/*Amount, Obtained, Preset*/}
                                    <View>
                                        <Text>AMOUNT</Text>
                                        <TextInput
                                            value={sourceName}
                                            onChangeText={setSourceName}
                                            placeholder="0"
                                            returnKeyType="done" //What does this mean?
                                            onSubmitEditing={()=>alert("TimeFrame Set")}
                                        />

                                        {/*Obtained and Preset Checkboxes*/}
                                        <View style={{flex:1, flexDirection:"row"}}>
                                            <Text>OBTAINED</Text>
                                            <Checkbox
                                            style={{margin:8}}
                                            value={wasObtained}
                                            onValueChange={setWasObtained}/>
                                        </View>
                                        <View style={{flex:1, flexDirection:"row"}}>
                                            <Text>PRESET</Text>
                                            <Checkbox
                                            style={{margin:8}}
                                            value={wasObtained}
                                            onValueChange={setWasObtained}/>

                                        </View>
                                    </View>{/*Amount Obtained Preset Mini Menu*/}

                                </View>

                                {/*Back / Enter Buttons*/}
                                <View style={{
                                    flex: 1,
                                    flexDirection:"row",
                                    justifyContent: "space-between",
                                    backgroundColor: "#00ff00"
                                }}>
                                    <Pressable onPress={()=> alert("Back")}>
                                        <Text> BACK </Text>
                                    </Pressable>
                                    <Pressable onPress={()=> alert("Next")}>
                                        <Text> NEXT </Text>
                                    </Pressable>

                                </View>

                            </Pressable>{/*Actual Modal Menu*/}


                        </KeyboardAvoidingView>{/*View to host the Modal Information*/}
                    </Pressable>{/*Background Opacity*/}
                </Modal>{/*Modal Menu*/}



            </SafeAreaView>
        </SafeAreaProvider>
    );
}