import {StyleSheet} from "react-native"

export const universalStyles = StyleSheet.create({

    container:{
        flex:1,
        flexDirection: "column",
        backgroundColor: "#22486b"
    }

}
);

export const GSS = StyleSheet.create({

    container:{
        flex: 1, 
        //flexDirection:"column",
        backgroundColor: "#22486b",
        //justifyContent: "center",
        //alignItems:"center",

        //gap: 20

    },

    ScView_Cont:{
        //backgroundColor: "#e725e7",
        flex: 1, 
        flexDirection:"column",
        backgroundColor: "#22486b",
        //justifyContent: "center",
        alignItems:"center",
        
        

        gap: 20
    },

    top_row:{
        //backgroundColor: "#10ee1b",
        flexDirection: "row",
        height: 60,
        //gap: 15,
        //marginBottom: 10,
        //marginTop: 10,
        justifyContent:"space-between",

        width: "100%"
    },

    SwitchButton:{
        //flex: 1,
        backgroundColor: "#b89494",
        
        borderRadius: 10,
        alignItems:"center",
        justifyContent: "center",

        width:"15%",
       

    },
    GameInfo_Button:{
        //flex: 8,
        backgroundColor: "#85aadb",
        
        borderRadius: 10,
        alignItems:"center",
        justifyContent: "center",

        width: "65%"

    },

    nameplate:{
        flexDirection: "column",
        backgroundColor: "#ffffff",
        //backgroundColor: "#c13ce2",
        width: '90%',
        height: 250,
        borderRadius:30,

        justifyContent: "center",
        //alignItems: "center",
        
        //position:"relative",

        overflow: "hidden"
        //marginBottom: 10
    },

    progressBar:{
        backgroundColor: "#ffffff",

        flexDirection:"row",
        width:"90%",
        height: 40,
        justifyContent: "space-between",
        alignItems: "center",

        borderRadius: 30,
        overflow: "hidden",
        //marginBottom: 10,
    },

    progressBar_current:{
        backgroundColor: "#e08ae0",
        width: "40%",
        height: 84
    },



    currentObtainable:{
        //backgroundColor: "#10ee1b",

        flexDirection:"row",
        width:"90%",
        height: 80,

        justifyContent: "space-between",
        

        gap: 10
        //marginBottom: 10
    },

    currentView:{
        width: "42%",
        borderRadius: 20,
        backgroundColor: "#FFFFFF",
        alignItems:"center"
    },

    obtainableView:{
        width: "42%",
        borderRadius: 20,
        backgroundColor: "#FFFFFF",
        alignItems:"center"
    },

    SourcesWindow:{
        backgroundColor: "#10ee1b",

        flexDirection: "column",
        alignItems: "center",
        

        width:"90%",
        height: "120%",

        borderRadius: 30,
        overflow: "hidden"
        //marginBottom: 10
    },

    AddSource:{
        backgroundColor:"#000000",
        flex:1,
        justifyContent: "flex-end",
        
        alignItems: "flex-end",
        alignSelf: "stretch"
    },

    SourceList:{
        backgroundColor:"#ffffff",
        flex:12,
        justifyContent: "flex-start",
        
        alignItems: "center",
        alignSelf: "stretch"

    }
    


})