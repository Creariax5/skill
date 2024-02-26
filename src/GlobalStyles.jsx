//import { useFonts } from 'expo-font';
import { StyleSheet } from "react-native";

/* fonts */
export const FontFamily = {
    coinyRegular: "Coiny-Regular",
    poppinsRegular: "Poppins-Regular",
    primaryH618: "Gilroy",
};
/* font sizes */
export const FontSize = {
    size_5xl: 24,
    size_base: 16,
    primaryH618_size: 18,
    size_xs: 12,
};
/* Colors */
export const Color = {
    black: "#272727",
    colorGray_100: "rgba(39, 39, 39, 0)",
    colorGray_200: "rgba(39, 39, 39, 0.4)",
    white: "#fff",
    gray: "#4a4a4a",
    colorBlack: "#000",
    yellow: "#fed215",
};
/* border radiuses */
export const Border = {
    br_base: 16,
    br_xs: 12,
    br_5xs: 8,
};

export const Padding = {
    p_lgi: 19,
};

export const styleScroll = StyleSheet.create({
    spe: {
        flex: 1,
        overflow: "hidden",
        width: "100%",
        backgroundColor: Color.black,
    },
    speScrollViewContent: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
    },
});