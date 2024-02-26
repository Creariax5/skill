import { StyleSheet } from "react-native";
import { FontFamily, FontSize, Color, Border, Padding } from "../GlobalStyles";


export const styles = StyleSheet.create({
    skills1Typo: {
        display: "flex",
        fontFamily: FontFamily.poppinsRegular,
        alignItems: "center",
        textAlign: "left",
        color: Color.white,
        letterSpacing: 0,
    },
    buttonsLayout: {
        borderRadius: Border.br_xs,
        position: "absolute",
    },
    editPosition: {
        top: "50%",
        position: "absolute",
    },
    groupChildPosition: {
        maxHeight: "100%",
        maxWidth: "100%",
        left: "0%",
        bottom: "0%",
        top: "0%",
        height: "100%",
        position: "absolute",
        overflow: "hidden",
    },
    componentLayout: {
        height: 84,
        alignSelf: "stretch",
    },
    callistenic: {
        textAlign: "left",
        letterSpacing: 0,
        color: Color.white,
        fontFamily: FontFamily.coinyRegular,
        fontSize: FontSize.size_5xl,
        width: 131,
    },
    skills1: {
        width: 57,
        alignItems: "center",
        fontSize: FontSize.size_base,
        display: "flex",
        fontFamily: FontFamily.poppinsRegular,
    },
    frame: {
        width: 131,
        overflow: "hidden",
    },
    vectorIcon: {
        width: 29,
        height: 28,
    },
    info: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignSelf: "stretch",
    },
    label: {
        marginTop: -12,
        marginLeft: -51.5,
        left: "50%",
        lineHeight: 24,
        textAlign: "center",
        display: "none",
        color: Color.white,
        fontFamily: FontFamily.coinyRegular,
        fontSize: FontSize.size_5xl,
        top: "50%",
    },
    buttons: {
        borderStyle: "solid",
        borderColor: Color.gray,
        borderWidth: 1,
        left: "0%",
        bottom: "0%",
        height: "100%",
        borderRadius: Border.br_xs,
        right: "0%",
        top: "0%",
        width: "100%",
        backgroundColor: Color.black,
    },
    groupChild: {
        width: "25.05%",
        right: "74.95%",
        borderRadius: Border.br_5xs,
    },
    humanFlag: {
        height: "51.02%",
        width: "73.33%",
        left: "0%",
        top: "0%",
        position: "absolute",
        alignItems: "center",
        display: "flex",
        fontFamily: FontFamily.poppinsRegular,
        fontSize: FontSize.size_base,
        textAlign: "left",
        color: Color.white,
        letterSpacing: 0,
    },
    difficultyHard: {
        height: "38.78%",
        top: "61.22%",
        fontSize: FontSize.size_xs,
        left: "0%",
        position: "absolute",
        alignItems: "center",
        width: "100%",
    },
    humanFlagParent: {
        height: "80.46%",
        width: "68.83%",
        top: "8.87%",
        bottom: "10.67%",
        left: "31.17%",
        right: "0%",
        position: "absolute",
    },
    rectangleParent: {
        height: "72.5%",
        width: "69.36%",
        top: "15%",
        right: "27.06%",
        bottom: "12.5%",
        left: "3.58%",
        position: "absolute",
    },
    editChild: {
        top: -10,
        left: -10,
        backgroundColor: Color.yellow,
        width: 60,
        height: 60,
    },
    pencilIcon: {
        right: "0%",
        width: "100%",
    },
    edit: {
        marginTop: -20,
        right: 23,
        width: 40,
        height: 40,
    },
    component3: {
        marginTop: 24,
    },
    items: {
        height: 300,
        justifyContent: "center",
        marginTop: 41,
        alignItems: "center",
        alignSelf: "stretch",
    },
    skills: {
        flex: 1,
        justifyContent: "flex-end",
        paddingLeft: 18,
        paddingTop: Padding.p_lgi,
        paddingRight: Padding.p_lgi,
        paddingBottom: 486,
        overflow: "hidden",
        backgroundColor: Color.black,
        width: "100%",
    },
});