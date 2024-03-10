import React, { useState } from 'react';
import { ScrollView, Text, View, Pressable, TouchableOpacity, ToastAndroid } from "react-native";
import { useLocalSearchParams } from 'expo-router';
import { Image } from "expo-image";

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Modalize } from 'react-native-modalize';
import ExoModal from './exoModal';


import { styleExo, styleStep, styles, modalStyle } from "../program";

const imgSrc = "../../../assets/";
const nbStep = 0;

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

function Exo(exoData, key, data, setData, openModal) {
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
                    source={images[exoData.img]}
                />
                <Text style={[styleExo.pushUp]}>PUSH UP</Text>
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
                    source={images[exoData.img]}
                />
                <Text style={[styleExo.pushUp]}>PUSH UP</Text>
                <Pressable
                    style={[styleExo.exoItem, styleExo.exoItemTO_DO]}
                />
            </View>
        );
    }
}

function Step(key, data, setData, step, setstep, openModal) {
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
                {Exo(stepData.exo.find(exoItem => exoItem.id === '0'), key, newData, setData, openModal)}
                {Exo(stepData.exo.find(exoItem => exoItem.id === '1'), key, newData, setData, openModal)}
                {Exo(stepData.exo.find(exoItem => exoItem.id === '2'), key, newData, setData, openModal)}
            </View>
        </View>
    );
}

function renderStep(data, setData, step, setstep, openModal) {
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

        items.push(Step(data.length - i, data, setData, step, setstep, openModal));
    }

    return items;
}

const Program = () => {
    const scrollViewRef = React.useRef(null);

    const { progId } = useLocalSearchParams();

    const [data, setData] = useState([]);
    const [step, setstep] = useState(1);

    const modalRef = React.useRef(null);
    const openModal = () => modalRef?.current?.open();

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

                {renderStep(data, setData, step, setstep, openModal)}
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
