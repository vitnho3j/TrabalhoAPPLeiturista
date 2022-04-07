import { StyleSheet } from "react-native";
import { color } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

export const estilos = StyleSheet.create({
    image:{
        width: "100%",
        height: 300
    },
    form:{
        padding: 10,
        borderRadius: 10,
        backgroundColor:"black",
        marginTop: 20,
        width: "100%",  
        opacity:0.7 ,
        height:"100%",
 
          
    },
    title: {
        marginTop: 20,
       fontSize: 23,
       textAlign: "center",
       color: "black"
    
    },
    input:{
        backgroundColor: "#999",
        borderRadius: 9,
        height: 35

    },
    label:{
        fontSize: 18,
        lineHeight: 40,
    },
    button:{
        marginTop: 10,
        backgroundColor: "white",
        borderRadius: 9,
        height: 40
    },
    buttonText:{
      marginTop:6,
      marginLeft:"35%",
      fontSize: 20

    },
    result:{
        alignItems: "center"
    }

 
})