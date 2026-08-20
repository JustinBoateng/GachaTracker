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
                            backgroundColor:"rgba(14, 48, 108, 0.79)"
                        }}
                        onPress={()=> setIsAddSourceModalVisible(false)}>

                        {/*View to host the Modal Information*/}
                        <KeyboardAvoidingView
                        behavior="padding"
                        style={{
                            //flex: 0.6,
                            height:"80%",
                            maxHeight:"80%",
                            //backgroundColor:"#0000ff"
                            //paddingHorizontal: 16, paddingBottom: 24
                        }}>

                            {/*Actual Modal Menu*/}
                            <Pressable
                            onPress={(event) => event.stopPropagation()}
                            style={{

                                //backgroundColor: "#ffff00",
                                flex:1,
                                //borderTopLeftRadius: 20,
                                //borderTopRightRadius: 20,
                                //padding: 20,
                                //gap: 12,
                                //height: "55%"


                            }}>
                                {/*Title of the Menu*/}
                                <View style={{
                                    backgroundColor: "#ffffff",
                                    borderColor: "#000000",
                                    borderTopWidth: 10,
                                    borderBottomWidth: 10,
                                    height:"10%",
                                    //flex: 1,
                                    width: "100%",
                                    marginBottom: 10,
                                    justifyContent: 'flex-end'
                                }}>
                                    <Text style={{
                                        fontSize: 30,
                                        fontWeight:"bold",
                                        paddingHorizontal: 5
                                    }}>ADD SOURCE</Text>
                                </View>

                                {/*Adding padding to everything below "Add Source*/}
                                <ScrollView contentContainerStyle={{
                                    flex: 1,
                                    paddingHorizontal: 20,
                                    //backgroundColor:"#FF00fF",
                                    height:"90%",
                                    width:"100%",
                                    //justifyContent:"space-between",
                                    gap: 5

                                }}>
                                    {/*Name Textbox Input*/}
                                    <View style={{
                                        height: "12%",
                                        //flex:1,
                                        //backgroundColor:"#abcdab"
                                    }}>
                                        <Text style={{
                                            paddingHorizontal: 8,
                                            fontSize: 15
                                        }}>NAME</Text>
                                        <TextInput
                                            value={sourceName}
                                            onChangeText={setSourceName}
                                            placeholder="Set the Name of the Source of Currency"
                                            returnKeyType="done" //What does this mean?
                                            onSubmitEditing={()=>alert("Name Set")}
                                            style={{
                                                backgroundColor:"#FFFFFF",
                                                borderColor:"#000000",
                                                borderWidth: 2,
                                                borderRadius: 5
                                            }}
                                        />
                                    </View>

                                    {/*TimeFrame Textbox Input*/}
                                    <View style={{
                                        height: "12%",
                                        //flex:1,
                                        //backgroundColor:"#2ba12b"
                                    }}>
                                        <Text style={{
                                            paddingHorizontal: 8,
                                            fontSize: 15
                                        }}>Timeframe</Text>
                                        <TextInput
                                            value={sourceName}
                                            onChangeText={setSourceName}
                                            placeholder="Set the TimeFrame"
                                            returnKeyType="done" //What does this mean?
                                            onSubmitEditing={()=>alert("TimeFrame Set")}
                                            style={{
                                                backgroundColor:"#FFFFFF",
                                                borderColor:"#000000",
                                                borderWidth: 2,
                                                borderRadius: 5
                                            }}

                                        />
                                    </View>


                                    {/*From-To Custom TimeFrame*/}
                                    <View style={{
                                        //backgroundColor:"#6cc23e",
                                        height: "12%",
                                        //flex:1, 
                                        flexDirection: "row",
                                        justifyContent: "space-between"

                                        }}>
                                        {/*From*/}
                                        <View>
                                            <Text style={{
                                            paddingHorizontal: 8,
                                            fontSize: 15
                                            }}>From</Text>
                                            <TextInput
                                                value={sourceName}
                                                onChangeText={setSourceName}
                                                placeholder="Set the TimeFrame"
                                                returnKeyType="done" //What does this mean?
                                                onSubmitEditing={()=>alert("TimeFrame Set")}
                                                style={{
                                                backgroundColor:"#FFFFFF",
                                                borderColor:"#000000",
                                                borderWidth: 2,
                                                borderRadius: 5
                                            }}

                                            />
                                        </View>

                                        {/*To*/}
                                        <View>
                                            <Text style={{
                                            paddingHorizontal: 8,
                                            fontSize: 15,
                                            alignSelf:"flex-end"
                                            }}>To</Text>
                                            <TextInput
                                                value={sourceName}
                                                onChangeText={setSourceName}
                                                placeholder="Set the TimeFrame"
                                                returnKeyType="done" //What does this mean?
                                                onSubmitEditing={()=>alert("TimeFrame Set")}
                                                style={{
                                                backgroundColor:"#FFFFFF",
                                                borderColor:"#000000",
                                                borderWidth: 2,
                                                borderRadius: 5
                                            }}

                                            />
                                        </View>
                                    </View>


                                    {/*Type-Amount Sector*/}
                                    <View style={{
                                        height:"35%",
                                        //flex:2, 
                                        flexDirection: "row",
                                        justifyContent:"space-between",

                                        //backgroundColor:"#c2859c"
                                    }}>
                                        {/*Type*/}
                                        <View style={{
                                            flex: 1,
                                            //backgroundColor:"#ff9b0f"
                                        }}>
                                            <Text style={{
                                            paddingHorizontal: 8,
                                            fontSize: 15,
                                            alignSelf: "flex-start",
                                            //flex: 1,
                                            //backgroundColor:"#aaaaaa"

                                            }}>TYPE</Text>

                                            <Pressable style={{
                                                flexDirection: "column",
                                                backgroundColor: "#ffffff",
                                                //width:"90%",
                                                //height:"120%",
                                                //flex: 1,
                                                aspectRatio: 1,
                                                borderColor:"#000000",
                                                borderWidth: 2,
                                                borderRadius: 5,
                                                overflow:"hidden",
                                                alignItems: "center",
                                                justifyContent:"center"
                                            }}
                                            onPress={() => alert("Select Type")}
                                            >

                                                <Image 
                                                style={{
                                                    width:"80%",
                                                    height:"80%",
                                                    resizeMode: "contain",
                                                    
                                                    //backgroundColor:"#0000ff"
                                                }}
                                                source={require("@/components/TestImages/Zzz-polychrome.webp")}/>
                                                <Text style={{
                                                    fontSize: 20,
                                                    //paddingTop:5,
                                                    //backgroundColor:"#FF0000",
                                                    //alignItems:"center",
                                                    //justifyContent:"center",
                                                    alignSelf:"center"


                                                }}>PREMIUM CURR</Text>
                                            </Pressable>
                                        </View>{/*Type*/}


                                        {/*Amount, Obtained, Preset*/}
                                        <View style={{
                                            flex:1,
                                            //backgroundColor:"#2f0fff"

                                        }}>
                                            <Text style={{
                                            paddingHorizontal: 8,
                                            fontSize: 15,
                                            alignSelf: "flex-end",
                                            //backgroundColor:"#dddddd"
                                            }}>AMOUNT</Text>
                                            <TextInput
                                                value={sourceName}
                                                onChangeText={setSourceName}
                                                placeholder="0"
                                                returnKeyType="done" //What does this mean?
                                                onSubmitEditing={()=>alert("TimeFrame Set")}
                                                style={{
                                                backgroundColor:"#FFFFFF",
                                                borderColor:"#000000",
                                                borderWidth: 2,
                                                borderRadius: 5,
                                                alignContent:"flex-end"

                                            }}

                                            />

                                            {/*Obtained and Preset Checkboxes*/}

                                            {/*Obtained*/}
                                            <View style={{
                                                //flex:1, 
                                                flexDirection:"row",
                                                justifyContent:"flex-end",
                                                alignItems: "center",
                                                marginTop: 8
                                            }}>
                                                <Text style={{
                                                paddingHorizontal: 8,
                                                fontSize: 20,
                                                //backgroundColor:"#ff0000",
                                            
                                                }}>OBTAINED</Text>
                                                <Checkbox
                                                style={{
                                                    //margin:8,
                                                    backgroundColor:"#FFFFFF",
                                                    borderColor:"#000000",
                                                    borderWidth: 2,
                                                    borderRadius: 5
                                                }}
                                                value={wasObtained}
                                                onValueChange={setWasObtained}/>
                                            </View>

                                            <View style={{
                                                //flex:1, 
                                                flexDirection:"row",
                                                justifyContent: "flex-end",
                                                alignItems: "center",
                                                marginTop: 8
                                            }}>
                                                <Text style={{
                                                paddingHorizontal: 8,
                                                fontSize: 20,
                                                //backgroundColor:"#00ff00"
                                                }}>PRESET</Text>

                                                <Checkbox
                                                style={{
                                                    backgroundColor:"#FFFFFF",
                                                    borderColor:"#000000",
                                                    borderWidth: 2,
                                                    borderRadius: 5
                                                }}
                                                value={wasObtained}
                                                onValueChange={setWasObtained}/>

                                            </View>
                                        </View>{/*Amount Obtained Preset Mini Menu*/}

                                    </View>

                                    {/*Back / Enter Buttons*/}
                                    <View style={{
                                        //flex: 1,
                                        height: "7%",
                                        flexDirection:"row",
                                        justifyContent: "space-evenly",
                                        //backgroundColor: "#00ff00",
                                        marginBottom:20
                                    }}>
                                        <Pressable 
                                        style={{
                                            backgroundColor:"#FFFFFF",
                                            borderColor:"#000000",
                                            borderWidth: 2,
                                            borderRadius: 5,
                                            padding: 5
                                        }}
                                        onPress={()=> alert("Back")}>
                                            <Text style={{
                                                fontSize: 20
                                            }}> BACK </Text>
                                        </Pressable>
                                        <Pressable 
                                        style={{
                                            backgroundColor:"#FFFFFF",
                                            borderColor:"#000000",
                                            borderWidth: 2,
                                            borderRadius: 5
                                        }}
                                        onPress={()=> alert("Next")}>
                                            <Text style={{
                                                fontSize: 20
                                            }}> ENTER </Text>
                                        </Pressable>

                                    </View>

                                </ScrollView>
                            </Pressable>{/*Actual Modal Menu*/}


                        </KeyboardAvoidingView>{/*View to host the Modal Information*/}
                    
                    </Pressable>{/*Background Opacity*/}
                </Modal>{/*Modal Menu*/}



            </SafeAreaView>
        </SafeAreaProvider>
    );
}