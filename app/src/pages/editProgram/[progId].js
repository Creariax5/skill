import React, { useState } from 'react';
import { ScrollView, Text, View, Pressable, TouchableOpacity, ToastAndroid } from "react-native";
import { useLocalSearchParams } from 'expo-router';
import { Image } from "expo-image";

import { styleExo, styleStep, styles } from "../program";

const imgSrc = "../../../assets/";
const nbStep = 3;

const exoStatu = {
    IN_PROGRESS: 0,
    SELECTED: 1,
    TO_DO: 2,
    FINISH: 3,
}

var images = [
    require(imgSrc + "pushup.gif"),
];

function Exo(exoData, key, data, setData) {
    return (
        <View style={styleExo.exo}>
            <Image
                style={styleExo.exoChild}
                contentFit="cover"
                source={images[exoData.img]}
            />
            <Text style={[styleExo.pushUp]}>PUSH UP</Text>
            <Pressable
                style={[styleExo.exoItem]}
            />
            <View style={styleExo.exoPosition}>
                <Image
                    style={styleExo.notifPosition}
                    contentFit="cover"
                    source={require(imgSrc + "notif.png")}
                />
                <Text style={[styleExo.textNotif]}>{exoData.text}</Text>
            </View>
        </View>
    );
}

function Step(key, data, setData, step, setstep) {
    newData = data;

    var stepData = newData.find(item => item.id === key);
    return (
        <View key={key} style={[styleStep.stepSpaceBlock]}>
            <View style={[styleStep.childLayout]} />

            <View style={[styleStep.buttons]} >
                <Text style={[styleStep.label]}>Step {key}</Text>
            </View>

            <View style={[styleStep.exos]}>
                {Exo(stepData.exo.find(exoItem => exoItem.id === '0'), key, newData, setData)}
                {Exo(stepData.exo.find(exoItem => exoItem.id === '1'), key, newData, setData)}
                {Exo(stepData.exo.find(exoItem => exoItem.id === '2'), key, newData, setData)}
            </View>
        </View>
    );
}

function renderStep(nb, data, setData, step, setstep) {
    var items = [];

    for (let i = 0; i < nb; i++) {
        if (step == nb - i) {
            data.push({
                id: nb - i,
                exo: [
                    { id: '0', statu: exoStatu.IN_PROGRESS, text: "8", img: 0 },
                    { id: '1', statu: exoStatu.IN_PROGRESS, text: "30", img: 0 },
                    { id: '2', statu: exoStatu.IN_PROGRESS, text: "1'30", img: 0 },
                ],
            });
        } else {
            data.push({
                id: nb - i,
                exo: [
                    { id: '0', statu: exoStatu.TO_DO, text: "8", img: 0 },
                    { id: '1', statu: exoStatu.TO_DO, text: "30", img: 0 },
                    { id: '2', statu: exoStatu.TO_DO, text: "1'30", img: 0 },
                ],
            });
        }

        items.push(Step(nb - i, data, setData, step, setstep));
    }

    return items;
}

const Program = () => {
    const scrollViewRef = React.useRef(null);

    const { progId } = useLocalSearchParams();

    const [data, setData] = useState([]);
    const [step, setstep] = useState(1);

    React.useEffect(() => {
        // Déplacer la ScrollView vers le bas lors du chargement de la page
        scrollViewRef.current.scrollToEnd({ animated: false });

    }, []);
    return (
        <ScrollView
            style={styles.spe}
            showsVerticalScrollIndicator={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.speScrollViewContent}
            ref={scrollViewRef}
        >
            <Image
                style={[styles.trophy, styles.trophyFinish]}
                contentFit="contain"
                source={require(imgSrc + "trophy.png")}
            />

            {renderStep(nbStep, data, setData, step, setstep)}

        </ScrollView>
    );
};


export default Program;
