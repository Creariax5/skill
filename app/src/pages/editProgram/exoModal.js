import { modalStyle } from "../program";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { useState, useEffect } from 'react';
import { Image } from "expo-image";
import { styles, boxStyle } from "../skills";
import AsyncStorage from '@react-native-async-storage/async-storage';

const imgSrc = "../../../assets/";

function Choosed(key) {
    console.log(key);
    return;
}

function Box(key, skillsData, setSkillsData) {
    var mySkill = skillsData.find(item => item.id === key);

    return (
        <TouchableOpacity
            key={key}
            style={boxStyle.box}
            onPress={() => { Choosed(key) }}
        >
            <View style={boxStyle.buttons} />
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
        </TouchableOpacity>
    );
}

function RenderSkills({ skillsData, setSkillsData }) {
    var items = [];
    for (let i = 0; i < skillsData.length; i++) {
        items.push(Box(i + 1, skillsData, setSkillsData));

    }
    return items;
}

const ExoModal = () => {

    const [skillsData, setSkillsData] = useState([]);

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
        <View style={{ paddingTop: 20, paddingBottom: 20 }}>
            <Text style={modalStyle.title}>
                {'Choose an exo: '}
            </Text>

            <ScrollView
                showsVerticalScrollIndicator={true}
                showsHorizontalScrollIndicator={false}
            >
                <View style={styles.items}>
                    {skillsData ?
                        <RenderSkills skillsData={skillsData} setSkillsData={setSkillsData} />
                        :
                        <View></View>
                    }

                </View>
            </ScrollView>
        </View>
    );
};


export default ExoModal;
