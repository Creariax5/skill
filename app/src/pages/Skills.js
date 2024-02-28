import { TouchableOpacity, ScrollView, Text, View } from "react-native";
import { router } from 'expo-router';
import { useState, useEffect } from 'react'; import { Image } from "expo-image";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { styles, boxStyle } from "./skills";

const imgSrc = "../../assets/";

function Box(key, skillsData, setSkillsData, toEdit, setToEdit) {
    var mySkill = skillsData.find(item => item.id === key);

    return (
        <TouchableOpacity
            key={key}
            style={boxStyle.box}
            onPress={() => { toEdit == key ? router.push('./editProgram/' + key) : router.push('./program/' + key) }}
            onLongPress={() => toEdit == key ? setToEdit(0) : setToEdit(key)}
        >
            <View style={toEdit == key ? boxStyle.buttonSelect : boxStyle.buttons} />
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
            {toEdit == key ?
                <TouchableOpacity
                    style={[boxStyle.edit]}
                    onPress={() => router.push('./editProgram/' + key)}
                >
                    <View style={[boxStyle.editColor]} />
                    <Image
                        style={[boxStyle.pencilIcon, boxStyle.groupChildPosition]}
                        contentFit="cover"
                        source={require(imgSrc + "edit.png")}
                    />
                </TouchableOpacity>
                :
                null
            }
        </TouchableOpacity>
    );
}

function RenderSkills({ skillsData, setSkillsData, toEdit, setToEdit }) {
    var items = [];
    for (let i = 0; i < skillsData.length; i++) {
        items.push(Box(i + 1, skillsData, setSkillsData, toEdit, setToEdit));

    }
    return items;
}

const Skills = () => {
    const [skillsData, setSkillsData] = useState([]);
    const [toEdit, setToEdit] = useState(0);

    useEffect(() => {
        const loadData = async () => {
            try {
                const savedData = await AsyncStorage.getItem("skills");
                if (savedData !== null) {
                    setSkillsData(JSON.parse(savedData));
                }
            } catch (error) {
                console.error("Error loading data: ", error);
            }
        };
        loadData();
    }, []);

    return (
        <View style={styles.skills}>
            <View style={styles.info}>
                <View style={styles.frame}>
                    <Text style={styles.callistenic}>Callistenic</Text>
                    {skillsData ?
                        <Text style={[styles.skillsCount]}>{skillsData.length} skills</Text>
                        :
                        <Text style={[styles.skillsCount]}>0 skills</Text>
                    }
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
                    {skillsData ?
                        <RenderSkills skillsData={skillsData} setSkillsData={setSkillsData} toEdit={toEdit} setToEdit={setToEdit} />
                        :
                        <View></View>
                    }

                </View>
            </ScrollView>
        </View>
    );
};



export default Skills;
