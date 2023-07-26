import { StyleSheet, Dimensions, StatusBar } from "react-native";
import { normalize } from "react-native-elements";
import { ActionBarImage } from "../components/ActionBarImage ";

export const colors = {
    blue: "#0A35C0",
    blue: "#0A35C0",
    light: "#3F88EF",
    violet: "#7B57B9",
    darkRed:'#8B0000',
    lightBlue:'#1F69F0',
    base: '#D6ECF5',
    green:'#A2C06A',
    lightViolet:'#9A6EE5',
    //button: '#5C94F9'
};
    

export const commonStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.pumpkin,

    },
    containerButton: {
        justifyContent: 'center',
        alignItems: 'center'

    },
    buttonStyle: {
        backgroundColor: colors.richBlack,
        borderRadius: 15,

    },
    superheader: {
        marginBottom: 20,
        height: 180
    },
    marginTitles: {
        marginHorizontal: Dimensions.get("window").height * 1 / 25,
        marginTop: 40,
    },
    marginTitles1: {
        marginHorizontal: Dimensions.get("window").height * 1 / 25,
        marginTop: 10,
    },
    fontTitles: {
        color: colors.white,
        fontSize: 28,
        fontWeight: 600,
    },
    header: {
        flexDirection: 'row',
    },
    logo: {
        flex: 1,
        marginLeft: Dimensions.get("window").height * 1 / 25,
        marginTop: Dimensions.get("window").height * 1 / 20
    },
    logoImage: {
        width: 54,
        height: 57
    },
    subtitleCont: {
        justifyContent: 'flex-start',
    },
    subtitle: {
        color: colors.white,
        fontSize: normalize(15),
        width: 250
    },
    content: {
        bottom: 0,
        height: Dimensions.get("screen").height / 1.48,
        backgroundColor: colors.white,
        borderTopLeftRadius: normalize(50),
        borderTopRightRadius: normalize(50),
        flexDirection: "column",
        justifyContent: "center",
        paddingHorizontal: 10
    },
    introButton: {
        width: 158,
        marginHorizontal: 80,
        marginTop: 20,
        borderRadius: 17,
    },
    fontButton: {
        fontWeight: 600, fontSize: 16, marginTop: 5, marginBottom: 5
    },
    titleInput: {
        color: colors.gray,
        fontSize: 14,
        marginLeft: 10,
        fontWeight: 400
    },
    placeholderInput: {
        color: colors.gray,
        fontSize: 14,
        marginLeft: 10,
    },
    messageAux: {
        fontSize: 12,
        fontStyle: 'italic',
        color: colors.gray,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleStyle: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    meterLogo: {
        width: Dimensions.get('window').width * 0.1583,
        height: Dimensions.get('window').height * 0.0675
    },
    containerLogo: {
        marginLeft: 100,
    },

    textTitle: {
        color: '#F8F1FF',
        fontSize: 28,
        fontWeight: 'bold',
        alignItems: 'center',
        paddingTop: 20,
    },
    principalContainer: {
        width: Dimensions.get('window').width,
        justifyContent: 'center',
    },
    headerContainer: {
        backgroundColor: colors.pumpkin,
        alignItems: 'center',
        height: Dimensions.get('window').height / 4,
    },
    bodyContainer: {
        alignItems: 'flex-start',
        backgroundColor: colors.white,
        height: Dimensions.get('window').height,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        overflow: 'visible',
        position: 'relative',
        top: -45,
        left: 0,
        paddingTop: 22,
        paddingLeft: 30,
    },
    textDialog: {
        fontSize: 16,
        color: "#475E68",
        textAlign: 'center',
        width: 200

    },
    errorMessage: {
        fontSize: 12,
        color: 'red',
        marginLeft: 15,
    },
    buttonPickerDate: {
        backgroundColor: colors.whiteMedium,
        borderColor: colors.gray,
        borderWidth: 1

    },
    fontTitlesInApp: {
        color: colors.white,
        fontSize: 28,
        fontWeight: 600,
        paddingVertical: 25,
        textAlign: 'center'
    },
    contentInApp: {
        flex: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: colors.white,
        paddingTop: 30,
        paddingHorizontal: 18,
        backgroundColor: colors.white
    },
    target: {
        height: 150,
        width: 130,
        backgroundColor: colors.platinum,
        padding: 15,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    dateUpdate: {
        fontSize: 14, color: colors.richBlack, fontWeight: 300, fontStyle: 'italic', textAlign: 'center', paddingBottom: 10
    },
    nameTeam: { fontSize: 16, fontWeight: 700, color: colors.richBlack, paddingVertical: 5, textAlign: 'center' },
    result: { fontSize: 14, fontWeight: 700, color: colors.pumpkin, textAlign: 'center', marginTop: 5, marginBottom: 5 },

    /// Screen ActionBarImage 
    containerNavigateImg: {
        width: Dimensions.get("window").width * (1583 / 10000),
        height: Dimensions.get("window").height * (555 / 10000) + StatusBar.currentHeight,
    },
    ///
    /// Screen ButtonLogOut
    contai: {
        width: Dimensions.get("window").width / 6.3,
        height: Dimensions.get("window").height / 14.8 + StatusBar.currentHeight,
    },
    ///
    ///////// -------------------------Screen MenuUserImage
    dataUserImg: {
        marginVertical: 11,
        alignItems: "center",
    },
    nameUser: {
        marginVertical: 2,
        fontSize: 12,
        fontStyle: "italic",
    },
    containerImgUser: {
        marginBottom: 16,
        alignItems: "center",
        paddingVertical: 5,

    },
    ///////////////////////////////////////////////////////
    /////////////////// ------------------Screen MenuButtons
    containerMenuItems: {
        headerStyle: {
            backgroundColor: colors.light,
        },
        title: " ",
        headerShown: true,
        headerRight: () => <ActionBarImage />,
    },

    dropDownSelect: {
        width: 130,
        marginLeft: 175,
        top: -7,
        backgroundColor: colors.white,
    },
    dropDownTextSelect: {
        fontSize: 14,
        color: colors.blackInputSelectList,
    },
    ////////////////////////////////////////
    ///////////////////// Container Primary
    containerPrimaryListTeams: {
        flex: 1,
        backgroundColor: colors.pumpkin,
        justifyContent: "center",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "stretch",
        position: "relative",
    },
    titleArea: {
        flex: 1,
        alignContent: "stretch",
        backgroundColor: colors.pumpkin,
        alignItems: "center",
        justifyContent: "center",
    },
    titles: {
        color: "white",
        fontSize: 28,
        fontWeight: "bold",
    },
    tableArea: {
        flex: 6,
        backgroundColor: colors.white,
        padding: 20,
        borderTopRightRadius: 27,
        borderTopLeftRadius: 27,
    },
    selected: {
        marginTop: 18,
        marginLeft: 35,
        position: "absolute",
        zIndex: 999,
    },
    listTeam: {
        flex: 6,
        marginTop: 55,
        position: "relative",
    },
    //////////////////////////////////////////////////////////////////////////////
    ////////////////////////Large Top Basic Body component


});
