import {  FlatList, View, Text, Pressable, ScrollView, Image, Modal, KeyboardAvoidingView, TextInput, Keyboard, TouchableOpacity } from "react-native";
import {useState, useEffect, useCallback} from "react";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import {Checkbox} from "expo-checkbox"

import {GSS} from '@/components/customs/Styles';
import * as GSC from "@/components/customs/GSConstants"


//import { FlatList } from "react-native-reanimated/lib/typescript/Animated";

import DateTimePicker, {DateTimePickerChangeEvent} from "@react-native-community/datetimepicker"


export default function GachaScreen(){

    /*
    const [isAddSourceModalVisible, setIsAddSourceModalVisible] = useState(false);
    
    //use these to show/hide lists
    const [showTimeFrameList, setShowTimeFrameList] = useState(false);
    const [showSourceTypeList, setShowSourceTypeList] = useState(false);
    const [showCurrencyList, setShowCurrencyList] = useState(false);

    //use these to store the values in the AddSource Menu
    const [storedTimeFrame, setStoredTimeFrame] = useState(null);
    const [storedSourceType, setStoredSourceType] = useState(null);
    const [storedCurrency, setStoredCurrency] = useState(null);
    
    const [sourceName, setSourceName] = useState('');
    //const [storedFromTime, setStoredFromTime] = useState('');
    //const [storedToTime, setStoredToTime] = useState('');
    const [storedAmount, setStoredAmount] = useState('');
    const [wasObtained, setWasObtained] = useState(false);
    const [isPreset, setIsPreset] = useState(false);
    
    const [currList, setCurrList] = useState('');
    const [currStore, setCurrStore] = useState('');


    const [fromDate, setFromDate] = useState<Date>();
    const [toDate, setToDate] = useState<Date>();
    const [showFromDatePicker, setShowFromDatePicker] = useState(false);
    const [showToDatePicker, setShowToDatePicker] = useState(false);
    
    const handleDateChange = useCallback(
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
            
                //const currentDate = selectedDate || fromDate;
                
            
            //pressing cancel does not automatically set the variable to false of course
            //you'll need to specify that yourself.
        },[fromDate, toDate]
    );

    //function to hide list and store variable
    const hideList = useCallback(
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

    type Source={
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

    type Currency={
        name: "",
        visual: Image,
        value: 1, 
        isBatch: false,
        realWorldValue: 0
    }

    const Base_Currencies=[
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

    //60 Polychrome for $0.99
    //1 Polychrome for $0.0165
    type Banner={
        name: string, 
        visual?: Image,
        visualLink?: ""
        Ranks: string,
        hasPity: boolean,
        pityPoint: number,
        AcceptableCurrency: Currency
    }

    type Rank={
        name: String
        visual?: Image
    }

    const DefaultRankList=[
        {name: "S", visual: null},
        {name: "A", visual: null},
        {name: "B", visual: null},
    ]

    const TimeFrame_Selection=[
        "Daily",
        "Weekly",
        "BiWeekly",
        "Custom"
    ]
    const SourceType_Selection=[
        "Gift",
        "Free",
        "Paid",
    ]

    */
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
                            <Pressable style={GSS.AddSource} onPress={() => GSC.setIsAddSourceModalVisible(true)}>
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
                visible={GSC.isAddSourceModalVisible}
                transparent animationType="slide"
                onRequestClose={() => GSC.setIsAddSourceModalVisible(false)}>

                    {/*Background Opacity*/}
                    <Pressable
                        style={{
                            flex: 1,
                            justifyContent: 'flex-end',
                            backgroundColor:"rgba(14, 48, 108, 0.79)"
                        }}
                        onPress={()=> GSC.setIsAddSourceModalVisible(false)}>

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
                                    //marginBottom: 10,
                                    justifyContent: 'flex-end'
                                }}>
                                    <Text style={{
                                        fontSize: 30,
                                        fontWeight:"bold",
                                        paddingHorizontal: 5
                                    }}>ADD SOURCE</Text>
                                </View>

                                {/*Adding padding to everything below "Add Source*/}
                                <View 
                                style={{
                                    flex: 1,
                                    paddingHorizontal: 20,
                                    backgroundColor:"#0e1859b2",
                                    height:"90%",
                                    width:"100%",
                                    //justifyContent:"space-between",
                                    gap: 5

                                }}>
                                    {/*Name Textbox Input*/}
                                    <View 
                                    style={{
                                        height: "12%",
                                        marginTop: 10,
                                        //flex:1,
                                        //backgroundColor:"#abcdab"
                                    }}>
                                        <Text style={{
                                            paddingHorizontal: 8,
                                            fontSize: 15,
                                            color:"white"
                                        }}>NAME</Text>
                                        <TextInput
                                            value={GSC.sourceName}
                                            onChangeText={GSC.setSourceName}
                                            placeholder="Set the Name of the Source of Currency"
                                            returnKeyType="done" //Symbol for return keys on mobile
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
                                        height: "18%",
                                        //flex:1,
                                        //backgroundColor:"#2ba12b"
                                    }}>
                                        <Text style={{
                                            paddingHorizontal: 8,
                                            fontSize: 15,
                                            color:"white"
                                        }}>Timeframe</Text>

                                        {
                                            GSC.showTimeFrameList ?
                                            (
                                                <View 
                                                style={{

                                                    elevation: 2,
                                                    shadowRadius: 2,
                                                    shadowOpacity: 0.5,
                                                    shadowOffset:{width:0, height: 2},
                                                    shadowColor: "#000000"
                                                }}>
                                                    <FlatList
                                                    data={GSC.TimeFrame_Selection}
                                                    renderItem={ ({item}) => 
                                                            <TouchableOpacity
                                                            style={{
                                                                backgroundColor:"#f495d1",
                                                                borderColor:"#000000",
                                                                borderWidth:1,
                                                                borderRadius: 5,
                                                            }}
                                                            onPress={() => GSC.hideList(item, "TimeFrame")}>
                                                                <Text>
                                                                    {item}
                                                                </Text>

                                                            </TouchableOpacity>
                                                    }
                                                    keyExtractor={item => item}
                                                    />
                                                </View>
                                            ) : (
                                                <View 
                                                style={{
                                                    backgroundColor:"#FFFFFF",
                                                    borderColor:"#000000",
                                                    borderWidth: 2,
                                                    borderRadius: 5,
                                                    height: 40,

                                                    
                                                }}>
                                                    <Pressable 
                                                    style={{
                                                        flexDirection: "row",
                                                        flex: 1,
                                                        justifyContent: "flex-end",
                                                        alignItems: "center",
                                                        padding: 7
                                                    }}
                                                    onPress={() => GSC.setShowTimeFrameList(true)}>
                                                        <Text>
                                                            {GSC.storedTimeFrame}
                                                        </Text>
                                                    </Pressable>
                                                </View>
                                            )
                                        }

                                    </View>


                                    {/*From-To Custom TimeFrame*/}
                                    <View style={{
                                        //backgroundColor:"#6cc23e",
                                        height: "10%",
                                        //flex:1, 
                                        flexDirection: "row",
                                        justifyContent: "space-between"

                                        }}>
                                        {/*From*/}
                                        <View 
                                        style={{
                                            flex: 1
                                        }}>
                                            <Text style={{
                                            paddingHorizontal: 8,
                                            fontSize: 15,
                                            alignSelf: "flex-start",
                                            color:"white"
                                            }}>From</Text>
                                            
                                            {/*Button Frame*/}
                                            <Pressable
                                            style={{
                                                backgroundColor:"#FFFFFF",
                                                borderColor:"#000000",
                                                borderWidth: 2,
                                                borderRadius: 5,
                                                flexDirection:"row",
                                                flex: 1,
                                                justifyContent: "center",
                                                //width: "100%",
                                                //height: "40%"

                                            }}
                                            onPress={() => GSC.setShowFromDatePicker(true)}
                                            >
                                                {/*Text in Button*/}
                                                <Text style={{fontSize:16, backgroundColor: "green"}}>
                                                    {GSC.fromDate?.toDateString()}
                                                </Text>

                                                {/*Calendar Visual*/}
                                                {
                                                    GSC.showFromDatePicker ?

                                                    <DateTimePicker
                                                    mode={'date'}
                                                    value={GSC.fromDate || new Date()} //choose from the date constant or the current date
                                                    onValueChange={
                                                        (event, selectedDate) =>
                                                        {GSC.handleDateChange(event, selectedDate, "from")}}
                                                    /> 
                                                    :
                                                    (null)
                                                }
                                            </Pressable>    
                                        </View>

                                        {/*To*/}
                                        <View 
                                        style={{
                                            flex: 1
                                        }}>
                                            <Text style={{
                                            paddingHorizontal: 8,
                                            fontSize: 15,
                                            alignSelf:"flex-end",
                                            color:"white"
                                            }}>To</Text>


                                            {/*Button Frame*/}
                                            <Pressable
                                            style={{
                                                backgroundColor:"#FFFFFF",
                                                borderColor:"#000000",
                                                borderWidth: 2,
                                                borderRadius: 5,
                                                flexDirection:"row",
                                                flex: 1,
                                                justifyContent: "center"
                                                //width: "100%",

                                            }}
                                            onPress={() => GSC.setShowToDatePicker(true)}
                                            >
                                                {/*Text in Button*/}
                                                <Text style={{fontSize:16, backgroundColor: "red"}}>
                                                    {GSC.toDate?.toDateString()}
                                                </Text>

                                                {/*Calendar Visual*/}
                                                {
                                                    GSC.showToDatePicker ?

                                                    <DateTimePicker
                                                    mode={'date'}
                                                    value={GSC.toDate || new Date()} //choose from the date constant or the current date
                                                    onValueChange={(event, selectedDate) => {GSC.handleDateChange(event,selectedDate, "to")}}
                                                    /> 
                                                    :
                                                    (null)
                                                }
                                            </Pressable>    

                                        </View>

                                    </View>


                                    {/*Type-Amount Sector*/}
                                    <View 
                                    style={{
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
                                            color:"white"
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
                                            onPress={() => {
                                                alert("Select Type"); 
                                                GSC.setShowCurrencyList(true);
                                            }}
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

                                                {
                                                    GSC.showCurrencyList ?
                                                    (<View
                                                    style={{
                                                        elevation: 2, 
                                                        shadowRadius: 2,
                                                        shadowOpacity: 0.5,
                                                        shadowOffset:{width:0, height: 2},
                                                        shadowColor: "#000000"
                                                    }}>
                                                        <FlatList
                                                        data={GSC.Base_Currencies}
                                                        renderItem={ ({item} ) => 
                                                            <TouchableOpacity
                                                            style={{

                                                            }}
                                                            onPress={() => GSC.hideList(item, "CurrencyType")}
                                                            >
                                                                <Image
                                                                source={require(item.visualLink)}/>
                                                                <Text>
                                                                    {item.name}
                                                                </Text>
                                                            </TouchableOpacity>
                                                        }
                                                        keyExtractor={item => item.name}
                                                        />
                                                            
                                                        
                                                    </View>) : null

                                                }

                                            </Pressable>
                                        </View>{/*Type*/}


                                        {/*Amount, Obtained, Preset*/}
                                        <View 
                                        style={{
                                            flex:1,
                                            //backgroundColor:"#0fff87"
                                        }}>

                                            {/*Amount*/}
                                            <Text style={{
                                            paddingHorizontal: 8,
                                            fontSize: 15,
                                            alignSelf: "flex-end",
                                            //backgroundColor:"#dddddd"
                                            color:"white"
                                            }}>AMOUNT</Text>

                                            {/*Box Boundaries*/}
                                            <View 
                                            style={{
                                                backgroundColor:"#FFFFFF",
                                                borderColor:"#000000",
                                                borderWidth: 2,
                                                borderRadius: 5,
                                                flexDirection: "row"
                                            }}>

                                                {/*Box Inner Area*/}
                                                <View style={{
                                                    flexDirection: "row",
                                                    flex: 1,
                                                    //backgroundColor:"pink",
                                                }}>

                                                    {/*Text Area within boundary*/}
                                                    <TextInput
                                                        value={GSC.storedAmount}
                                                        onChangeText={GSC.setStoredAmount}
                                                        placeholder="0"
                                                        returnKeyType="done" //What does this mean?
                                                        onSubmitEditing={()=>alert("Amount Set")}
                                                        style={{
                                                        flex: 1,
                                                        //width: "100%",
                                                        //alignSelf:"flex-start"
                                                        fontSize: 12,
                                                        color: "black",
                                                        //width:"100%",
                                                        textAlign: "right",
                                                        //backgroundColor:"red",
                                                        //flexDirection:"row",
                                                        //justifyContent:"center",
                                                        //alignItems:"center"
                                                        //alignContent:"center"
                                                        // flexDirection: "row",
                                                        // //flex: 1,
                                                        // justifyContent:"flex-start",
                                                        // alignItems:"center",
                                                        paddingHorizontal: 7,
                                                        
                                                    }}/>
                                                    
                                                </View>
                                            </View>

                                            {/*Source Type*/}
                                            <Text style={{
                                            paddingHorizontal: 8,
                                            fontSize: 15,
                                            alignSelf: "flex-end",
                                            color:"white"
                                            //backgroundColor:"#dddddd"
                                            }}>TYPE</Text>
                                        
                                            {
                                                GSC.showSourceTypeList ?
                                                (
                                                    <View 
                                                    style={{
                                                        elevation: 2,
                                                        shadowRadius: 2,
                                                        shadowOpacity: 0.5,
                                                        shadowOffset:{width:0, height: 2},
                                                        shadowColor: "#000000"
                                                    }}>
                                                        <FlatList
                                                        data={GSC.SourceType_Selection}
                                                        renderItem={ ({item}) => 
                                                                <TouchableOpacity
                                                                style={{
                                                                    backgroundColor:"#f495d1",
                                                                    borderColor:"#000000",
                                                                    borderWidth:1,
                                                                    borderRadius: 5,
                                                                }}
                                                                onPress={() => GSC.hideList(item, "SourceType")}>
                                                                    <Text>
                                                                        {item}
                                                                    </Text>

                                                                </TouchableOpacity>
                                                        }
                                                        keyExtractor={item => item}
                                                        />
                                                    </View>
                                                ) : (
                                                    <View 
                                                    style={{
                                                        backgroundColor:"#FFFFFF",
                                                        borderColor:"#000000",
                                                        borderWidth: 2,
                                                        borderRadius: 5,
                                                        height: 40,
                                                    }}>
                                                        <Pressable 
                                                        style={{
                                                            flexDirection: "row",
                                                            flex: 1,
                                                            justifyContent: "flex-end",
                                                            alignItems: "center",
                                                            padding: 7
                                                        }}
                                                        onPress={() => GSC.setShowSourceTypeList(true)}>
                                                            <Text>
                                                                {GSC.storedSourceType}
                                                            </Text>
                                                        </Pressable>
                                                    </View>
                                                )
                                            }



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
                                                color:"white"
                                                }}>OBTAINED</Text>
                                                <Checkbox
                                                style={{
                                                    //margin:8,
                                                    backgroundColor:"#FFFFFF",
                                                    borderColor:"#000000",
                                                    borderWidth: 2,
                                                    borderRadius: 5
                                                }}
                                                value={GSC.wasObtained}
                                                onValueChange={GSC.setWasObtained}/>
                                            </View>

                                            {/*Preset*/}
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
                                                color:"white"
                                                //backgroundColor:"#00ff00"
                                                }}>PRESET</Text>

                                                <Checkbox
                                                style={{
                                                    backgroundColor:"#FFFFFF",
                                                    borderColor:"#000000",
                                                    borderWidth: 2,
                                                    borderRadius: 5
                                                }}
                                                value={GSC.isPreset}
                                                onValueChange={GSC.setIsPreset}/>

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
                                            padding: 5,
                                            alignItems:"center",
                                            justifyContent:"center"
                                        }}
                                        onPress={()=> GSC.setIsAddSourceModalVisible(false)}>
                                            <Text style={{
                                                fontSize: 20
                                            }}> BACK </Text>
                                        </Pressable>
                                        <Pressable 
                                        style={{
                                            backgroundColor:"#FFFFFF",
                                            borderColor:"#000000",
                                            borderWidth: 2,
                                            borderRadius: 5,
                                            padding: 5,
                                            alignItems:"center",
                                            justifyContent:"center"
                                        }}
                                        onPress={()=> alert("Next")}>
                                            <Text style={{
                                                fontSize: 20
                                            }}> ENTER </Text>
                                        </Pressable>

                                    </View>

                                </View>
                            </Pressable>{/*Actual Modal Menu*/}


                        </KeyboardAvoidingView>{/*View to host the Modal Information*/}
                    
                    </Pressable>{/*Background Opacity*/}
                </Modal>{/*Modal Menu*/}



            </SafeAreaView>
        </SafeAreaProvider>
    );
}