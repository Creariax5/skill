import React, { useState } from 'react';
import { ScrollView, Text, View, Pressable, TouchableOpacity, ToastAndroid } from "react-native";
import { Image } from "expo-image";

import { styleScroll } from "../GlobalStyles";
import { styles } from "./skills";

const imgSrc = "../../assets/";

const Skills = () => {

    return (
        <ScrollView
            style={styleScroll.spe}
            showsVerticalScrollIndicator={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styleScroll.speScrollViewContent}
        >
            <View style={styles.skills}>
                <View style={styles.info}>
                    <View style={styles.frame}>
                        <Text style={styles.callistenic}>Callistenic</Text>
                        <Text style={[styles.skills1, styles.skills1Typo]}>15 skills</Text>
                    </View>
                    <Image
                        style={styles.vectorIcon}
                        contentFit="cover"
                        source={require(imgSrc + "search.png")}
                    />
                </View>
                <View style={styles.items}>
                    <View style={styles.componentLayout}>
                        <Pressable
                            style={[styles.buttons, styles.buttonsLayout]}
                            onPress={() => navigation.navigate("Spe")}
                        >
                            <Text style={[styles.label, styles.editPosition]}>Validate</Text>
                        </Pressable>
                        <View style={styles.rectangleParent}>
                            <Image
                                style={[styles.groupChild, styles.groupChildPosition]}
                                contentFit="cover"
                                source={require(imgSrc + "pushup.gif")}
                            />
                            <View style={styles.humanFlagParent}>
                                <Text style={styles.humanFlag}>Human flag</Text>
                                <Text style={[styles.difficultyHard, styles.skills1Typo]}>
                                    Difficulty : Medium
                                </Text>
                            </View>
                        </View>
                        <View style={[styles.edit, styles.editPosition]}>
                            <View style={[styles.editChild, styles.buttonsLayout]} />
                            <Image
                                style={[styles.pencilIcon, styles.groupChildPosition]}
                                contentFit="cover"
                                source={require(imgSrc + "edit.png")}
                            />
                        </View>
                    </View>
                    <View style={[styles.component3, styles.componentLayout]}>
                        <View style={[styles.buttons, styles.buttonsLayout]}>
                            <Text style={[styles.label, styles.editPosition]}>Validate</Text>
                        </View>
                        <View style={styles.rectangleParent}>
                            <Image
                                style={[styles.groupChild, styles.groupChildPosition]}
                                contentFit="cover"
                                source={require(imgSrc + "pushup.gif")}
                            />
                            <View style={styles.humanFlagParent}>
                                <Text style={styles.humanFlag}>Back lever</Text>
                                <Text style={[styles.difficultyHard, styles.skills1Typo]}>
                                    Difficulty : Hard
                                </Text>
                            </View>
                        </View>
                        <View style={[styles.edit, styles.editPosition]}>
                            <View style={[styles.editChild, styles.buttonsLayout]} />
                            <Image
                                style={[styles.pencilIcon, styles.groupChildPosition]}
                                contentFit="cover"
                                source={require(imgSrc + "edit.png")}
                            />
                        </View>
                    </View>
                    <View style={[styles.component3, styles.componentLayout]}>
                        <View style={[styles.buttons, styles.buttonsLayout]}>
                            <Text style={[styles.label, styles.editPosition]}>Validate</Text>
                        </View>
                        <View style={styles.rectangleParent}>
                            <Image
                                style={[styles.groupChild, styles.groupChildPosition]}
                                contentFit="cover"
                                source={require(imgSrc + "pushup.gif")}
                            />
                            <View style={styles.humanFlagParent}>
                                <Text style={styles.humanFlag}>Human flag</Text>
                                <Text style={[styles.difficultyHard, styles.skills1Typo]}>
                                    Difficulty : Hard
                                </Text>
                            </View>
                        </View>
                        <View style={[styles.edit, styles.editPosition]}>
                            <View style={[styles.editChild, styles.buttonsLayout]} />
                            <Image
                                style={[styles.pencilIcon, styles.groupChildPosition]}
                                contentFit="cover"
                                source={require(imgSrc + "edit.png")}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView >
    );
};



export default Skills;
