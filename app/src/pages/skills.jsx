import { StyleSheet } from "react-native";
import { FontFamily, FontSize, Color, Border, Padding } from "../GlobalStyles";


export const boxStyle = StyleSheet.create({
    box: {
        marginTop: 24,
        height: 84,
        alignSelf: "stretch",
    },
    buttons: {
        borderColor: Color.gray,
        borderWidth: 1,
        height: "100%",
        width: "100%",
        borderRadius: Border.br_xs,
        backgroundColor: Color.black,
    },
    buttonSelect: {
        borderColor: Color.yellow,
        borderWidth: 4,
        height: "100%",
        width: "100%",
        borderRadius: Border.br_xs,
        backgroundColor: Color.black,
    },
    editColor: {
        top: -10,
        left: -10,
        backgroundColor: Color.yellow,
        width: 60,
        height: 60,

        borderRadius: Border.br_xs,
        position: "absolute",
    },
    edit: {
        marginTop: -20,
        right: 23,
        width: 40,
        height: 40,

        top: "50%",
        position: "absolute",
    },
    contentContainer: {
        height: "72.5%",
        width: "69.36%",
        top: "15%",
        right: "27.06%",
        bottom: "12.5%",
        left: "3.58%",
        position: "absolute",
    },
    textContainer: {
        height: "80.46%",
        width: "68.83%",
        top: "8.87%",
        bottom: "10.67%",
        left: "31.17%",
        position: "absolute",
    },
    skillName: {
        height: "51.02%",
        width: "90%",
        position: "absolute",
        alignItems: "center",
        display: "flex",
        fontFamily: FontFamily.poppinsRegular,
        fontSize: FontSize.size_base,
        textAlign: "left",
        color: Color.white,
    },
    skillDesc: {
        height: "38.78%",
        top: "61.22%",
        fontSize: FontSize.size_xs,
        position: "absolute",
        alignItems: "center",
        width: "100%",
        display: "flex",
        fontFamily: FontFamily.poppinsRegular,
        textAlign: "left",
        color: Color.white,
    },
    img: {
        width: "25.05%",
        right: "74.95%",
        borderRadius: Border.br_5xs,
    },
    pencilIcon: {
        width: "100%"
    },
    groupChildPosition: {
        height: "100%",
        position: "absolute",
    },
});

export const styles = StyleSheet.create({
    callistenic: {
        textAlign: "left",
        color: Color.white,
        fontFamily: FontFamily.coinyRegular,
        fontSize: FontSize.size_5xl,
        width: 160,
    },
    skillsCount: {
        width: 57,
        alignItems: "center",
        fontSize: FontSize.size_base,
        display: "flex",
        fontFamily: FontFamily.poppinsRegular,
        color: Color.white,
        right: -2,
        top: -5,
    },
    frame: {
        width: 200,
        overflow: "hidden",
    },
    vectorIcon: {
        width: 28,
        height: 28,
        top: 10,
        left: -5,

    },
    info: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignSelf: "stretch",
        paddingRight: Padding.p_lgi,
        paddingLeft: Padding.p_lgi,
    },
    items: {
        justifyContent: "flex",
        marginTop: 12,
        alignItems: "center",
        alignSelf: "stretch",
        paddingRight: Padding.p_lgi,
        paddingLeft: Padding.p_lgi,

    },
    skills: {
        flex: 1,
        justifyContent: "flex",
        paddingTop: Padding.p_lgi,

        overflow: "hidden",
        backgroundColor: Color.black,
        width: "100%",
    },
});