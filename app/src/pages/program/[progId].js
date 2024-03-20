import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, Pressable, TouchableOpacity, ToastAndroid } from "react-native";
import { useLocalSearchParams } from 'expo-router';
import { Image } from "expo-image";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Modalize } from 'react-native-modalize';
import ExoModal from './exoModal';


import { styleExo, styleStep, styles, modalStyle } from "../program";

const imgSrc = "../../../assets/";
const nbStep = 0;
let id = 0;
let canValid = false;

const exoStatu = {
    IN_PROGRESS: 0,
    SELECTED: 1,
    TO_DO: 2,
    FINISH: 3,
}

var images = [
    require(imgSrc + "pushup.gif"),
];

function stepExoSelected(currentStep) {
    /*all exo of this step are selected*/

    let nbUndef = [];
    for (let i = 0; i < currentStep.length; i++) {
        if (currentStep[i].id != undefined) {
            nbUndef.push(i);
        }

    }

    if (nbUndef.length == 3) {
        if (currentStep[0].statu == exoStatu.SELECTED && currentStep[1].statu == exoStatu.SELECTED && currentStep[2].statu == exoStatu.SELECTED) {
            return true;

        } else {
            return false;
        }
    } else if (nbUndef.length == 2) {
        if (currentStep[nbUndef[0]].statu == exoStatu.SELECTED && currentStep[nbUndef[1]].statu) {
            return true;

        } else {
            return false;
        }
    } else {
        if (currentStep[nbUndef[0]].statu == exoStatu.SELECTED) {
            return true;

        } else {
            return false;
        }
    }
}

function updateExo(exoData, key, data, setData) {
    if (exoData.statu == exoStatu.IN_PROGRESS) {
        exoData.statu = exoStatu.SELECTED;

    } else if (exoData.statu = exoStatu.SELECTED) {
        exoData.statu = exoStatu.IN_PROGRESS;

    }

    const stepToUpdate = data.find(item => item.id === key).exo
    canValid = stepExoSelected(stepToUpdate);

    const exoToUpdate = stepToUpdate.find(exoItem => exoItem.id === exoData.id);
    Object.assign(exoToUpdate, exoData);

    setData([...data]);

}

const storeData = async (value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem('exo_' + id, jsonValue);

    } catch (e) {
        // saving error
        console.error("saving error");

    }
};

function validate(data, setData, step, setstep) {
    var stepToUpdate = data.find(item => item.id === step).exo;
    if (stepExoSelected(stepToUpdate)) {
        //set exo to finished
        for (let i = 0; i < 3; i++) {
            stepToUpdate[i].statu = exoStatu.FINISH;

        }
        setstep(step + 1);
        setData([...data]);
        storeData(data);
        try {
            stepToUpdate = data.find(item => item.id === step + 1).exo;
            for (let i = 0; i < 3; i++) {
                stepToUpdate[i].statu = exoStatu.IN_PROGRESS;

            }
            setData([...data]);
            storeData(data);
            canValid = false;

        } catch (error) {
            ToastAndroid.show("You're finished !!!", ToastAndroid.SHORT);
        }

    } else {
        ToastAndroid.show("You didn't finished all exos", ToastAndroid.SHORT);

    }
}

function Exo(exoData, key, data, setData, openModal, skillsData) {
    if (exoData.id == undefined) {
        return (
            <View style={styleExo.exo}>

            </View>
        );
    }
    var mySkill = skillsData.find(item => item.id === exoData.exoId);

    if (exoData.statu == exoStatu.IN_PROGRESS) {
        return (
            <View style={styleExo.exo}>
                <Image
                    style={styleExo.exoChild}
                    contentFit="cover"
                    source={images[0]}
                />
                <Text style={[styleExo.pushUp]}>{mySkill.name}</Text>
                <Pressable
                    style={[styleExo.exoItem]}
                    onPress={() => updateExo(exoData, key, data, setData)}
                    onLongPress={() => openModal()}
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
                    source={images[0]}
                />
                <Text style={[styleExo.pushUp]}>{mySkill.name}</Text>
                <Pressable
                    style={[styleExo.exoItem, styleExo.exoItemSELECTED]}
                    onPress={() => updateExo(exoData, key, data, setData)}
                    onLongPress={() => openModal()}
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
    } else {
        return (
            <View style={styleExo.exo}>
                <Image
                    style={styleExo.exoChild}
                    contentFit="cover"
                    source={images[0]}
                />
                <Text style={[styleExo.pushUp]}>{mySkill.name}</Text>
                <Pressable
                    style={[styleExo.exoItem, styleExo.exoItemTO_DO]}
                />
            </View>
        );
    }
}

function Step(key, data, setData, step, setstep, openModal, skillsData) {
    newData = data;

    try {
        var stepData = newData.find(item => item.id === key).exo;

        if (step == key) {

            return (
                <View key={key} style={[styleStep.stepSpaceBlock]}>
                    <View style={[styleStep.childLayout]} />

                    <TouchableOpacity
                        style={[styleStep.buttons, styleStep.buttonsValidate, { opacity: canValid ? 1 : 0.5, }]}
                        onPress={() => validate(data, setData, step, setstep)}
                    >
                        <Text style={[styleStep.label, styleStep.labelValidate]}>Validate</Text>
                    </TouchableOpacity>

                    <View style={[styleStep.exos]}>
                        {Exo(stepData[0], key, newData, setData, openModal, skillsData)}
                        {Exo(stepData[1], key, newData, setData, openModal, skillsData)}
                        {Exo(stepData[2], key, newData, setData, openModal, skillsData)}
                    </View>
                </View>
            );
        } else {
            return (
                <View key={key} style={[styleStep.stepSpaceBlock]}>
                    <View style={[styleStep.childLayout]} />

                    <View style={[styleStep.buttons]} >
                        <Text style={[styleStep.label]}>Step {key}</Text>
                    </View>

                    <View style={[styleStep.exos]}>
                        {Exo(stepData[0], key, newData, setData, openModal, skillsData)}
                        {Exo(stepData[1], key, newData, setData, openModal, skillsData)}
                        {Exo(stepData[2], key, newData, setData, openModal, skillsData)}
                    </View>
                </View>
            );
        }

    } catch (error) {
        //console.log("step error: " + error);
        return (
            <View key={key}>
            </View>
        );
    }


}

function renderStep(data, setData, step, setstep, openModal, skillsData) {
    var items = [];

    //create exo road
    for (let i = 0; i < data.length; i++) {
        /*
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
        }*/

        items.push(Step(data.length - i, data, setData, step, setstep, openModal, skillsData));
    }

    return items;
}

const Program = () => {
    const scrollViewRef = React.useRef(null);

    const { progId } = useLocalSearchParams();
    id = progId;

    const [skillsData, setSkillsData] = useState([]);
    const [step, setstep] = useState(1);

    const modalRef = React.useRef(null);
    const openModal = () => modalRef?.current?.open();

    const [exosData, setExosData] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const savedData = await AsyncStorage.getItem('exo_' + progId);
                if (savedData !== null) {
                    const parsedData = JSON.parse(savedData);

                    let tmpStep = -1;
                    let element = parsedData[parsedData.length - 1];

                    if (element.exo[0].statu == exoStatu.FINISH || element.exo[1].statu == exoStatu.FINISH || element.exo[2].statu == exoStatu.FINISH) {
                        setstep(-1);

                    } else {
                        for (let i = 0; i < parsedData.length; i++) {
                            element = parsedData[i];

                            if (element.exo[0].statu == exoStatu.IN_PROGRESS || element.exo[1].statu == exoStatu.IN_PROGRESS || element.exo[2].statu == exoStatu.IN_PROGRESS) {
                                setstep(i + 1);
                                tmpStep = i;
                            }

                        }
                    }

                    if (tmpStep >= 0) {
                        for (let i = 0; i < parsedData.length; i++) {
                            if (parsedData[tmpStep].exo[i] != undefined) {
                                parsedData[tmpStep].exo[i].statu = exoStatu.IN_PROGRESS;
                            }
                        }
                    }

                    setExosData(parsedData);

                }
            } catch (error) {
                console.error("Error loading data: ", error);
                //await AsyncStorage.removeItem('exo_' + progId)

            }

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

    React.useEffect(() => {
        // Déplacer la ScrollView vers le bas lors du chargement de la page
        scrollViewRef.current.scrollToEnd({ animated: false });

    }, []);

    return (
        <GestureHandlerRootView style={styles.spe}>
            <ScrollView
                style={styles.spe}
                showsVerticalScrollIndicator={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.speScrollViewContent}
                ref={scrollViewRef}
            >
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

                {renderStep(exosData, setExosData, step, setstep, openModal, skillsData)}
            </ScrollView>
            <Modalize
                ref={modalRef}
                scrollViewProps={{ showsVerticalScrollIndicator: false }}
                snapPoint={700}
                modalStyle={modalStyle.main}
            >
                <ExoModal />
            </Modalize>
        </GestureHandlerRootView>
    );
};


export default Program;
