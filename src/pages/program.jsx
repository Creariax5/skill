import { StyleSheet } from "react-native";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";


//Exo StyleSheet
export const styleExo = StyleSheet.create({
    exo: {
        width: 100,
        height: 100,
    },
    exoChild: {
        height: "80%",
        borderTopLeftRadius: Border.br_xs,
        borderTopRightRadius: Border.br_xs,
        position: "absolute",
        overflow: "hidden",
        width: "100%",
    },
    pushUp: {
        top: "78%",
        textAlign: "center",
        color: Color.white,
        position: "absolute",
        left: "2%",
        width: "96%",
        height: "19%",
        display: "flex",
        fontFamily: FontFamily.poppinsRegular,
        letterSpacing: 0,
        fontSize: FontSize.size_base,

        justifyContent: "center",
        alignItems: "center",
    },
    exoItem: {
        backgroundColor: Color.colorGray_100,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: Color.gray,
        borderRadius: Border.br_xs,
        bottom: "0%",
        height: "100%",
        left: "0%",
        right: "0%",
        top: "0%",
        position: "absolute",
        width: "100%",
    },
    exoItemSELECTED: {
        borderWidth: 4,
        borderColor: Color.yellow,
    },
    exoItemTO_DO: {
        backgroundColor: Color.colorGray_200,
    },
    exoPosition: {
        height: 32,
        width: 32,
        left: 77,
        top: -9,
        position: "absolute",
    },
    notifPosition: {
        height: 32,
        width: 32,
        position: "absolute",
    },
    textNotif: {
        textAlign: "center",
        top: 5,
    },
});


//Step StyleSheet
export const styleStep = StyleSheet.create({
    stepSpaceBlock: {
        height: 178 + 44,
        marginTop: 44,
        alignSelf: "stretch",
    },
    childLayout: {
        top: -44,
        height: 1,
        width: 348,
        borderTopWidth: 1,
        borderColor: Color.gray,
        left: "50%",
        marginLeft: -174,
        borderStyle: "solid",
        position: "absolute",
    },
    buttons: {
        top: 0,
        borderWidth: 1,
        borderColor: Color.gray,
        borderStyle: "solid",
        backgroundColor: Color.black,
        height: 56,
        borderRadius: Border.br_base,

        height: 56,
        borderRadius: Border.br_base,
        width: 348,
        left: "50%",
        marginLeft: -174,
        position: "absolute",
    },
    buttonsValidate: {
        backgroundColor: Color.yellow,
    },
    label: {
        marginLeft: -37,
        textAlign: "center",
        color: Color.white,
        position: "absolute",
        fontFamily: FontFamily.coinyRegular,
        lineHeight: 24,
        fontSize: FontSize.size_5xl,
        top: "50%",
        marginTop: -12,
        left: "50%",
    },
    labelValidate: {
        textAlign: "center",
        color: Color.colorBlack,
    },
    exos: {
        top: 78,
        left: "50%",
        marginLeft: -174,

        top: 78,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        width: 348,
        position: "absolute",
    },
});


//Main StyleSheet
export const styles = StyleSheet.create({
    trophy: {
        height: 300,
        margin: 33,
        alignSelf: "stretch",
        maxWidth: "100%",
        overflow: "hidden",
        width: "80%",
        opacity: 0.4,
    },
    trophyFinish: {
        opacity: 1,
    },
});