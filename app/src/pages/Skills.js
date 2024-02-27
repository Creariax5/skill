import { TouchableOpacity, ScrollView, Text, View } from "react-native";
import { Link, router } from 'expo-router';
import { Image } from "expo-image";

import { styles, boxStyle } from "./skills";

const imgSrc = "../../assets/";

const nbSkills = 3;

function progSrc() { }

function Box(key) {
    return (
        <TouchableOpacity
            key={key}
            style={[boxStyle.box]}
            onPress={() => progSrc()}
        >
            <View style={[boxStyle.buttons]} />
            <View style={boxStyle.contentContainer}>
                <Image
                    style={[boxStyle.img, boxStyle.groupChildPosition]}
                    contentFit="cover"
                    source={require(imgSrc + "pushup.gif")}
                />
                <View style={boxStyle.textContainer}>
                    <Text style={boxStyle.skillName}>Human flag</Text>
                    <Text style={[boxStyle.skillDesc]}>
                        Difficulty : Hard
                    </Text>
                </View>
            </View>
            <TouchableOpacity style={[boxStyle.edit]}>
                <View style={[boxStyle.editColor]} />
                <Image
                    style={[boxStyle.pencilIcon, boxStyle.groupChildPosition]}
                    contentFit="cover"
                    source={require(imgSrc + "edit.png")}
                />
            </TouchableOpacity>
        </TouchableOpacity>
    );
}

function renderSkills(nb) {
    var items = [];

    for (let i = 0; i < nb; i++) {
        items.push(Box(nb - i));
    }

    return items;
}

const Skills = () => {

    return (

        <View style={styles.skills}>
            <View style={styles.info}>
                <View style={styles.frame}>
                    <Text style={styles.callistenic}>Callistenic</Text>
                    <Text style={[styles.skillsCount]}>15 skills</Text>
                </View>
                <TouchableOpacity>
                    <Image
                        style={styles.vectorIcon}
                        contentFit="cover"
                        source={require(imgSrc + "search.png")}
                    />
                </TouchableOpacity>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={true}
                showsHorizontalScrollIndicator={false}
            >
                <View style={styles.items}>
                    {renderSkills(nbSkills)}
                </View>
            </ScrollView>
        </View>
    );
};



export default Skills;
