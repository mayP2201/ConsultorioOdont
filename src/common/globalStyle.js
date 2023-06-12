import { StyleSheet } from "react-native";

export const colors = {
    blue: "#0A35C0",
    light: "#3F88EF",
    violet: "#7B57B9",
    darkRed:'#8B0000',
    lightBlue:'#1F69F0'

}

export const commonStyles = StyleSheet.create({

    containerButton: {
        justifyContent:'center',
        alignItems:'center',
        //backgroundColor:'blue'
    },
    buttonStyle: {
        backgroundColor: colors.blue,
        borderRadius: 15,
    },
    titleStyle:{
        fontSize: 20, 
        fontWeight: 'bold' 
    },
    titleInput: {
        color: colors.blue,
        fontSize: 14,
        marginLeft: 10,
        fontWeight: 'bold',
        opacity: 0.5,
    },
    introButton: {
        width: 158,
        marginHorizontal: 80,
        marginTop: 20,
        borderRadius: 17,
    },
    fontButton: {
        fontWeight: 600, fontSize: 20, marginTop: 5, marginBottom: 5
    },

    errorStyle:{
        fontSize:11
    }
  
});