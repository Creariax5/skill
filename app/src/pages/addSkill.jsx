import { StyleSheet, Platform } from "react-native";
import { FontFamily, FontSize, Color, Border, Padding } from "../GlobalStyles";
import Constants from "expo-constants";

export const styles = StyleSheet.create({
    skills: {
        flex: 1,
        justifyContent: "flex",
        paddingTop: Padding.p_lgi,

        overflow: "hidden",
        backgroundColor: Color.black,
        width: "100%",
    },

    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor:
            Platform.OS === "ios" ? Color.black : Color.black,
    },
    header: {
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Color.gray,
    },
    headerText: {
        color: "#fff",
        fontSize: 18,
    },
    content: {
        padding: 20,
        backgroundColor: Color.black,
    },
    formGroup: {
        marginBottom: 10,
    },
    label: {
        color: Color.gray,
        fontSize: 16,
        lineHeight: 30,
    },
    input: {
        height: 50,
        paddingHorizontal: 20,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#e3e3e3",
        backgroundColor: "#fff",
    },
    errorContainer: {
        marginVertical: 5,
    },
    errorText: {
        color: "#ff7675",
    },
    button: {
        marginTop: 20,
        backgroundColor: Color.yellow,
        padding: 15,
        borderRadius: 15,
    },
    buttonText: {
        color: "#000",
        fontWeight: "bold",
        fontSize: 18,
        textAlign: "center",
    },

});