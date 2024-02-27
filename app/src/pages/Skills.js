import { TouchableOpacity, ScrollView, Text, View, ToastAndroid } from "react-native";
import { useState } from 'react'; import { Image } from "expo-image";

import { styles, boxStyle } from "./skills";

const imgSrc = "../../assets/";

const nbSkills = 3;

function progSrc(key, currentSkill) {
    currentSkill = key;

}

function Box(key, currentSkill, skillsData, setSkillsData) {

    var mySkill = skillsData.find(item => item.id === key);

    return (
        <TouchableOpacity
            key={key}
            style={[boxStyle.box]}
            onPress={() => progSrc(key, currentSkill)}
        >
            <View style={[boxStyle.buttons]} />
            <View style={boxStyle.contentContainer}>
                <Image
                    style={[boxStyle.img, boxStyle.groupChildPosition]}
                    contentFit="cover"
                    source={require(imgSrc + "pushup.gif")}
                />
                <View style={boxStyle.textContainer}>
                    <Text style={boxStyle.skillName}>{mySkill.name}</Text>
                    <Text style={[boxStyle.skillDesc]}>
                        {mySkill.text}
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

function renderSkills(nb, currentSkill, skillsData, setSkillsData) {
    var items = [];

    for (let i = 0; i < nb; i++) {
        skillsData.push({
            id: i + 1,
            name: "Human flag",
            text: "Difficulty : hard",
        });

        items.push(Box(i + 1, currentSkill, skillsData, setSkillsData));
    }

    return items;
}

const Skills = (currentSkill) => {
    const [skillsData, setSkillsData] = useState([]);

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
                    {renderSkills(nbSkills, currentSkill, skillsData, setSkillsData)}
                </View>
            </ScrollView>
        </View>
    );
};



export default Skills;
