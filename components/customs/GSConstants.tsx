import {  FlatList, View, Text, Pressable, ScrollView, Modal, KeyboardAvoidingView, TextInput, Keyboard, TouchableOpacity } from "react-native";
import {useState, useEffect, useCallback} from "react";

import {Image} from "expo-image"

import {Checkbox} from "expo-checkbox"

import {GSS} from '@/components/customs/Styles';

import DateTimePicker, {DateTimePickerEvent} from "@react-native-community/datetimepicker"


//Types------------------------------

export const Source_SaveData_Address = "SourceList"
export const Currency_SaveData_Address = "Currency"

export type RetrievalType = "Gift" | "Free" | "Paid";

export const SourceColors : Record <RetrievalType, string>= {
    "Gift" : "#5d98fc",
    "Free" : "#1dc03b",
    "Paid" : "#e8495e",
}


export type Source={
    id: string,
    name: string,
    timeframe: string,
    from?: string,
    to?: string,
    CurrencyType: Currency,
    amount: number,
    retrievalType: RetrievalType,
    obtained: boolean,
    preset: boolean 
}

export type Currency={
    CurrencyName: string,
    //visual?: Image,
    visualLink: number,
    value: number, 
    isBatch: boolean,
    realWorldValue: number
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
    name: string
    visual?: Image
}

//visibility flag for AddSourceModal
type ASMProps = {
    visible: boolean; //boolean variable
    addSource: (S : Source) => void // function that takes in a source and returns void
    onClose: () => void; //function that returns void
}

type SDMProps = {
    visible: boolean; //boolean variable
    SDetails: Source // Source Reference
    onClose: () => void; //function that returns void
}

type ECMProps = {
    visible: boolean; //boolean variable
    calculation: (C : number) => void // a function that takes in a number
    onClose: () => void; //function that returns void
}

//Arrays------------------------------

/*
const desiredNumberOfObjects = 20;
let markers = [];

for(let i = 0; i < desiredNumberOfObjects; i++) {
  markers.push({
    location: 'some location for index',
    key: 'some key for index',
    contactName: 'some contactName for index'
  });
}
*/

//Map of images
const appImages = {
    "Norma" : require("@/components/TestImages/Norma_TestImg.png"),

    "Polychromes": require("@/components/TestImages/Zzz-polychrome.webp"),
    "Encrypted_Master_Tapes" : require("@/components/TestImages/Item_Encrypted_Master_Tape.webp")
}


//Array of currencies
export const Base_Currencies : Currency[] = [
    {
        CurrencyName:"Polychromes",
        visualLink: appImages.Polychromes,
        value: 1,
        isBatch: false,
        realWorldValue: 0.0165
    },

    {
        CurrencyName:"Encrypted Master Tape",
        visualLink: appImages.Encrypted_Master_Tapes,
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
/*



const handleAddSource = async () => {
    const trimSourceName = sourceName.trim();
    
    if(!trimSourceName) return;

    setSourceName('');
    setIsAddSourceModalVisible(false)
}
*/


//Modal Menu Component-------------------------------------------------------------------------

//this component takes in a parameter that is 
//a batch of variables combined and casted as
//the type ASMProps

export function AddSourceModal( {visible, addSource, onClose} : ASMProps){
//export default function AddSourceModal( visible : boolean, onClose : () => void){

    //Variables------------------------------

    //use these to show/hide lists
    const [showTimeFrameList, setShowTimeFrameList] = useState(false);
    const [showSourceTypeList, setShowSourceTypeList] = useState(false);
    const [showCurrencyList, setShowCurrencyList] = useState(false);

    //use these to store the values in the AddSource Menu
    const [storedTimeFrame, setStoredTimeFrame] = useState("");
    const [storedSourceType, setStoredSourceType] = useState("");
    const [storedCurrency, setStoredCurrency] = useState<Currency>(
        {                    
            CurrencyName:"Polychromes",
            visualLink: require("@/components/TestImages/Zzz-polychrome.webp"),
            value: 1,
            isBatch: false,
            realWorldValue: 0.0165
        }
    );
    //const [storedImageLink, setStoredImageLink] = useState("");
    const [sourceName, setSourceName] = useState('');

    const [storedAmount, setStoredAmount] = useState("");
    const [wasObtained, setWasObtained] = useState(false);
    const [isPreset, setIsPreset] = useState(false);

    const [currList, setCurrList] = useState('');
    const [currStore, setCurrStore] = useState('');


    const [fromDate, setFromDate] = useState<Date>(new Date());
    const [toDate, setToDate] = useState<Date>(new Date());
    const [showFromDatePicker, setShowFromDatePicker] = useState(false);
    const [showToDatePicker, setShowToDatePicker] = useState(false);


    const handleDateChange = useCallback(
        (event: DateTimePickerEvent, type: string, selectedDate? : Date, ) => {
                
            let currentDate = new Date();
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
                    //setStoredImageLink(item.visualLink);
                    console.log(storedCurrency);
                    break; 

                default:
                    break;
            }

        }, [currList, currStore, storedCurrency]
    );

    const ClearModal = () => {
        setSourceName("");
        setStoredAmount("");
        setWasObtained(false);
        setIsPreset(false);
        setFromDate(new Date());
        setToDate(new Date());
        setStoredTimeFrame("");
        setStoredSourceType("");
    }

    const createSource = () => {

        let sA = Number( storedAmount.replace(/[^0-9]/g, '') )

        if(isNaN(sA)){
            alert("Enter a valid number for \"Amount\".")
        }
        
        if(sA < 0){
            alert("Enter a number greater than 0 for \"Amount\".")
        }

        const newSource = {
            id: new Date().toLocaleDateString() + new Date().toLocaleTimeString() + Math.random,
            name: sourceName,
            timeframe: storedTimeFrame,
            from: fromDate.toLocaleDateString(),
            to: toDate.toLocaleDateString(),
            CurrencyType: storedCurrency,
            amount: sA,
            retrievalType: storedSourceType,
            obtained: wasObtained,
            preset: isPreset
        } as Source;

        console.log(newSource)

        return newSource;


    }

    return(
                <Modal
                visible={visible}
                transparent animationType="slide"
                onRequestClose={onClose}>

                    {/*Background Opacity*/}
                    <Pressable
                        style={{
                            flex: 1,
                            justifyContent: 'flex-end',
                            backgroundColor:"rgba(14, 48, 108, 0.79)"
                        }}
                        onPress={onClose}>

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
                                            value={sourceName}
                                            onChangeText={setSourceName}
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
                                            showTimeFrameList ?
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
                                                    data={TimeFrame_Selection}
                                                    renderItem={ ({item}) => 
                                                            <TouchableOpacity
                                                            style={{
                                                                backgroundColor:"#f495d1",
                                                                borderColor:"#000000",
                                                                borderWidth:1,
                                                                borderRadius: 5,
                                                            }}
                                                            onPress={() => hideList(item, "TimeFrame")}>
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
                                                    onPress={() => setShowTimeFrameList(true)}>
                                                        <Text>
                                                            {storedTimeFrame}
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
                                            onPress={() => setShowFromDatePicker(true)}
                                            >
                                                {/*Text in Button*/}
                                                <Text style={{fontSize:16, backgroundColor: "green"}}>
                                                    {fromDate.toLocaleDateString()}
                                                </Text>

                                                {/*Calendar Visual*/}
                                                {
                                                    showFromDatePicker ?

                                                    <DateTimePicker
                                                    mode={'date'}
                                                    value={fromDate || new Date()} //choose from the date constant or the current date
                                                    onChange={
                                                        (event, selectedDate) =>
                                                        {handleDateChange(event,  "from", selectedDate)}}
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
                                            onPress={() => setShowToDatePicker(true)}
                                            >
                                                {/*Text in Button*/}
                                                <Text style={{fontSize:16, backgroundColor: "red"}}>
                                                    {toDate?.toDateString()}
                                                </Text>

                                                {/*Calendar Visual*/}
                                                {
                                                    showToDatePicker ?

                                                    <DateTimePicker
                                                    mode={'date'}
                                                    value={toDate || new Date()} //choose from the date constant or the current date
                                                    onChange={(event, selectedDate) => {handleDateChange(event, "to", selectedDate)}}
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
                                                //alert("Select Type"); 
                                                setShowCurrencyList(true);
                                            }}
                                            >

                                            <Image 
                                            style={{
                                                width:"80%",
                                                height:"80%",
                                                resizeMode: "contain",
                                                
                                                backgroundColor:"#0000ff"
                                            }}
                                            source={storedCurrency.visualLink}
                                            //source={{uri: "GachaTracker/components/TestImages/Item_Encrypted_Master_Tape.webp"}}
                                            />
                                            <Text style={{
                                                fontSize: 20,
                                                //paddingTop:5,
                                                //backgroundColor:"#FF0000",
                                                //alignItems:"center",
                                                //justifyContent:"center",
                                                alignSelf:"center"


                                            }}>{storedCurrency.CurrencyName}</Text>
                                                    
                                                    
                                                
                                                {
                                                    showCurrencyList ?
                                                    (<View
                                                    style={{
                                                        elevation: 2, 
                                                        shadowRadius: 2,
                                                        shadowOpacity: 0.5,
                                                        shadowOffset:{width:0, height: 2},
                                                        shadowColor: "#000000"
                                                    }}>
                                                        <FlatList
                                                        data={Base_Currencies}
                                                        renderItem={ ({item} ) => 
                                                            <TouchableOpacity
                                                            style={{

                                                            }}
                                                            onPress={() => hideList(item, "CurrencyType")}
                                                            >
                                                                {/*<Image source={require(item.visualLink)}/>*/}
                                                                <Text>
                                                                    {item.CurrencyName}
                                                                </Text>
                                                            </TouchableOpacity>
                                                        }
                                                        keyExtractor={item => item.CurrencyName}
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
                                                        value={storedAmount}
                                                        onChangeText={setStoredAmount}
                                                        placeholder="0"
                                                        returnKeyType="done" //What does this mean?
                                                        onSubmitEditing={()=>alert("Amount Set")}
                                                        keyboardType="number-pad"
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
                                                showSourceTypeList ?
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
                                                        data={SourceType_Selection}
                                                        renderItem={ ({item}) => 
                                                                <TouchableOpacity
                                                                style={{
                                                                    backgroundColor:"#f495d1",
                                                                    borderColor:"#000000",
                                                                    borderWidth:1,
                                                                    borderRadius: 5,
                                                                }}
                                                                onPress={() => hideList(item, "SourceType")}>
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
                                                        onPress={() => setShowSourceTypeList(true)}>
                                                            <Text>
                                                                {storedSourceType}
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
                                                value={wasObtained}
                                                onValueChange={setWasObtained}/>
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
                                                value={isPreset}
                                                onValueChange={setIsPreset}/>

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
                                        onPress={onClose}>
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
                                        onPress={()=> {
                                            alert("Entered");
                                            addSource(createSource());
                                            ClearModal();
                                            onClose();
                                            }}>
                                            <Text style={{
                                                fontSize: 20
                                            }}> ENTER </Text>
                                        </Pressable>

                                    </View>

                                </View>
                            </Pressable>{/*Actual Modal Menu*/}


                        </KeyboardAvoidingView>{/*View to host the Modal Information*/}
                    
                    </Pressable>{/*Background Opacity*/}
                </Modal>
    );
    



}

export function SourceDetailsModal ({visible, SDetails, onClose} : SDMProps){
    return(
        <Modal
        visible= {visible}
        transparent
        animationType="slide"
        onRequestClose={onClose}
        >
            {/*Transparent Background*/}
            <Pressable
            style={{
                flex: 1,
                justifyContent: 'flex-end',
                backgroundColor:"rgba(14, 48, 108, 0.79)"
            }}
            onPress={onClose}>

                {/*View to host the actual information*/}
                <KeyboardAvoidingView
                behavior="padding"
                style={{
                    height:"80%",
                    maxHeight:"80%",
                    backgroundColor:"#5ef7c1"

                }}>
                    {/*Actual Modal Menu*/}
                    <Pressable
                    onPress={(event) => event.stopPropagation()}
                    style={{
                        flex: 1
                    }}    
                    >

                        <Text>{SDetails.name}</Text>
                        <Text>{SDetails.timeframe}</Text>
                        <Text>{SDetails.from}</Text>
                        <Text>{SDetails.to}</Text>
                        <Text>{SDetails.CurrencyType.CurrencyName}</Text>
                        <Text>{SDetails.CurrencyType.value}</Text>
                        <Text>{SDetails.amount}</Text>
                        <Text>{SDetails.obtained}</Text>
                        <Text>{SDetails.preset}</Text>

                        <View
                        style={{
                            flexDirection: "row"
                        }}>
                            <Pressable
                            onPress={onClose}>
                                <Text> Back </Text>
                            </Pressable>
                            

                            <Pressable>
                                <Text> Obtained </Text>
                            </Pressable>
                        </View>

                    </Pressable>
                </KeyboardAvoidingView>
            </Pressable>

        </Modal>
    );
}

export function EnterCurrencyModal({visible, calculation, onClose} : ECMProps){
    
    const [currencyAmount, setCurrencyAmount] = useState("");
    const [pullAmount, setPullAmount] = useState("");

    return(
        <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={onClose}
        >
            <Pressable
            style={{
                flex: 1,
                justifyContent: 'flex-end',
                backgroundColor:"rgba(14, 48, 108, 0.79)"
            }}>
                
                <KeyboardAvoidingView
                style={{
                    height:"80%",
                    maxHeight:"80%"
                }}>
                    <Pressable
                    onPress={(event => event.stopPropagation())}
                    style={{ flex:1 }}>
                        
                        <View style={{flexDirection:"row"}}>
                            <Text>
                                Currency:
                            </Text>
                            <TextInput
                            value={currencyAmount}
                            onChangeText={setCurrencyAmount}
                            placeholder="Currency"
                            returnKeyType="done"
                            onSubmitEditing={() => alert("Currency Set")}
                            keyboardType="number-pad"
                            style={{
                                backgroundColor:"#FFFFFF",
                                borderColor:"#000000",
                                borderWidth: 2,
                                borderRadius: 5
                            }}
                            />
                        </View>

                        <View style={{flexDirection:"row"}}>
                            <Text>
                                Pulls:
                            </Text>
                            <TextInput
                            value={pullAmount}
                            onChangeText={setPullAmount}
                            placeholder="Pulls (Enter 0 if you do not purchase a different currency specifically for pulls"
                            returnKeyType="done"
                            onSubmitEditing={() => alert("Currency Set")}
                            keyboardType="number-pad"
                            style={{
                                backgroundColor:"#FFFFFF",
                                borderColor:"#000000",
                                borderWidth: 2,
                                borderRadius: 5
                            }}
                            />                                
                        </View>

                        <View style={{
                            flexDirection:"row"
                        }}>

                            <Pressable
                            onPress={onClose}>
                                <Text> Back </Text>
                            </Pressable>
                            

                            <Pressable
                            onPress={() => {
                                //Do the calculations for the currency and pulls
                                const cA = Number(pullAmount.replace(/[^0-9]/g, '')) * 160 + Number(currencyAmount.replace(/[^0-9]/g, ''));
                                //setCurrencyAmount(
                                //    (Number(pullAmount) * 160 + Number(currencyAmount)).toString()
                                //);

                                //convert the string into a number
                                //and return it back
                                calculation(cA);

                                //close the modal
                                onClose();
                            }}>
                                <Text> Submit </Text>
                            </Pressable>

                        </View>    

                    </Pressable>
                </KeyboardAvoidingView>
            </Pressable>
        </Modal>

    );
}

export function BannerPlate(){
    return(
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
    );
}



