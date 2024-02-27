import React, { useState } from 'react';
import { ScrollView, Text, View, Pressable, TouchableOpacity, ToastAndroid } from "react-native";
import { Image } from "expo-image";

import { styleExo, styleStep, styles } from "./program";

import Wrapper from "../Wrapper";

const imgSrc = "../../assets/";
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

function updateExo(exoData, key, data, setData) {
    if (exoData.statu == exoStatu.IN_PROGRESS) {
        exoData.statu = exoStatu.SELECTED;
    } else if (exoData.statu = exoStatu.SELECTED) {
        exoData.statu = exoStatu.IN_PROGRESS;
    }

    const exoToUpdate = data.find(item => item.id === key).exo.find(exoItem => exoItem.id === exoData.id);
    Object.assign(exoToUpdate, exoData);

    setData([...data]);

}

function validate(data, setData, step, setstep) {
    var stepToUpdate = data.find(item => item.id === step).exo;
    if (stepToUpdate[0].statu == exoStatu.SELECTED && stepToUpdate[1].statu == exoStatu.SELECTED && stepToUpdate[2].statu == exoStatu.SELECTED) {
        //set exo to finished
        for (let i = 0; i < 3; i++) {
            stepToUpdate[i].statu = exoStatu.FINISH;

        }
        setstep(step + 1);
        try {
            stepToUpdate = data.find(item => item.id === step + 1).exo;
            for (let i = 0; i < 3; i++) {
                stepToUpdate[i].statu = exoStatu.IN_PROGRESS;
            }
            setData([...data]);

        } catch (error) {
            ToastAndroid.show("You're finished !!!", ToastAndroid.SHORT);
        }

    } else {
        ToastAndroid.show("You didn't finished all exos", ToastAndroid.SHORT);
    }
}

function Exo(exoData, key, data, setData) {
    if (exoData.statu == exoStatu.IN_PROGRESS) {
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
                    onPress={() => updateExo(exoData, key, data, setData)}
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
    } else if (exoData.statu == exoStatu.SELECTED) {
        return (
            <View style={styleExo.exo}>
                <Image
                    style={styleExo.exoChild}
                    contentFit="cover"
                    source={images[exoData.img]}
                />
                <Text style={[styleExo.pushUp]}>PUSH UP</Text>
                <Pressable
                    style={[styleExo.exoItem, styleExo.exoItemSELECTED]}
                    onPress={() => updateExo(exoData, key, data, setData)}
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
    } else if (exoData.statu == exoStatu.TO_DO || exoData.statu == exoStatu.FINISH) {
        return (
            <View style={styleExo.exo}>
                <Image
                    style={styleExo.exoChild}
                    contentFit="cover"
                    source={images[exoData.img]}
                />
                <Text style={[styleExo.pushUp]}>PUSH UP</Text>
                <Pressable
                    style={[styleExo.exoItem, styleExo.exoItemTO_DO]}
                />
                {/*<View style={styleExo.exoPosition}>
                    <Image
                        style={styleExo.notifPosition}
                        contentFit="cover"
                        source={require(imgSrc + "notifGray.png")}
                    />
                    <Text style={[styleExo.textNotif, { color: "rgba(255, 255, 255, 0.6)" }]}>{exoData.text}</Text>
                </View>*/}
            </View>
        );
    } else if (exoData.statu == exoStatu.FINISH) {
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
                    onPress={() => updateExo(exoData, key, data, setData)}
                />
                <Image
                    style={styleExo.exoPosition}
                    contentFit="cover"
                    source={require(imgSrc + "check.png")}
                />
            </View>
        );
    }

}

function Step(key, data, setData, step, setstep) {
    newData = data;

    var stepData = newData.find(item => item.id === key);
    return (
        <View key={key} style={[styleStep.stepSpaceBlock]}>
            <View style={[styleStep.childLayout]} />


            {step == key ?
                <TouchableOpacity
                    style={[styleStep.buttons, styleStep.buttonsValidate]}
                    onPress={() => validate(data, setData, step, setstep)}
                >
                    <Text style={[styleStep.label, styleStep.labelValidate]}>Validate</Text>
                </TouchableOpacity>
                :
                <View style={[styleStep.buttons]} >
                    <Text style={[styleStep.label]}>Step {key}</Text>
                </View>}


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

const ProgPage = ({ skillData }) => {
    const scrollViewRef = React.useRef(null);

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
            <Text>{skillData}</Text>
            {nbStep < step ?
                <Image
                    style={[styles.trophy, styles.trophyFinish]}
                    contentFit="contain"
                    source={require(imgSrc + "trophy.png")}
                />
                :
                <Image
                    style={[styles.trophy]}
                    contentFit="contain"
                    source={require(imgSrc + "trophy.png")}
                />
            }

            {renderStep(nbStep, data, setData, step, setstep)}

        </ScrollView>
    );
}

const Program = ({ skillData }) => {
    return (
        <Wrapper>
            <ProgPage skillData={skillData} />
        </Wrapper>
    );
};


export default Program;
