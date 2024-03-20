import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, Pressable, TouchableOpacity, ToastAndroid } from "react-native";
import { useLocalSearchParams } from 'expo-router';
import { Image } from "expo-image";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Modalize } from 'react-native-modalize';
import ExoModal from './exoModal';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { styleExo, styleStep, styles, modalStyle } from "../program";

const imgSrc = "../../../assets/";

const exoStatu = {
    IN_PROGRESS: 0,
    SELECTED: 1,
    TO_DO: 2,
    FINISH: 3,
}

var images = [
    require(imgSrc + "pushup.gif"),
];

function Exo(stepData, id, key, openModal) {
    exoData = stepData.exo[id];

    if (exoData.id != undefined) {
        const elNumExo = key * 3 + parseInt(id) - 3;

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
                    onPress={() => openModal(elNumExo)}
                    onLongPress={() => openModal(elNumExo)}
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
        return Adder(id, key, openModal);
    }

}

function Adder(id, key, openModal) {
    const elNumExo = key * 3 + parseInt(id) - 3;

    return (
        <View style={styleExo.exo}>

            <TouchableOpacity
                style={[styleExo.exoItem]}
                onPress={() => openModal(elNumExo)}
            >
                <Image
                    style={styleExo.exoAdder}
                    contentFit="cover"
                    source={require(imgSrc + "add.png")}
                />
            </TouchableOpacity>
        </View>
    );
}

function Step(key, data, setData, openModal) {
    newData = data;

    var stepData;

    try {
        stepData = newData.find(item => item.id === key);

        return (
            <View key={key} style={[styleStep.stepSpaceBlock]}>
                <View style={[styleStep.childLayout]} />

                <View style={[styleStep.buttons]} >
                    <Text style={[styleStep.label]}>Step {key}</Text>
                </View>

                <View style={[styleStep.exos]}>
                    {Exo(stepData, '0', key, openModal)}
                    {Exo(stepData, '1', key, openModal)}
                    {Exo(stepData, '2', key, openModal)}
                </View>
            </View>
        );

    } catch (error) {
        return (
            <View key={key} style={[styleStep.stepSpaceBlock]}>
                <View style={[styleStep.childLayout]} />

                <View style={[styleStep.buttons]} >
                    <Text style={[styleStep.label]}>Step {key}</Text>
                </View>

                <View style={[styleStep.exos]}>
                    {Adder('0', key, openModal)}
                    {Adder('1', key, openModal)}
                    {Adder('2', key, openModal)}
                </View>
            </View>
        );
    }


}

function renderStep(data, setData, openModal) {
    var items = [];

    items.push(Step(data.length + 1, data, setData, openModal));

    for (let i = 0; i < data.length; i++) {

        items.push(Step(data.length - i, data, setData, openModal));
    }

    return items;
}

const Program = () => {
    const scrollViewRef = React.useRef(null);

    const { progId } = useLocalSearchParams();

    const [data, setData] = useState([]);
    const [numExo, setNumExo] = useState(0);


    const modalRef = React.useRef(null);
    const openModal = (elNumExo) => {
        setNumExo(elNumExo);
        modalRef?.current?.open();
    }
    const closeModal = () => modalRef?.current?.close();

    const [exosData, setExosData] = useState([]);
    const [step, setstep] = useState(1);

    const loadData = async () => {
        try {
            const savedData = await AsyncStorage.getItem('exo_' + progId);
            if (savedData !== null) {
                setExosData(JSON.parse(savedData));
            }

        } catch (error) {
            console.error("Error loading data: ", error);
        }
    };

    useEffect(() => {
        // Déplacer la ScrollView vers le bas lors du chargement de la page
        scrollViewRef.current.scrollToEnd({ animated: false });


        loadData();
    }, []);

    const exoCreated = () => {
        closeModal();

    };

    return (
        <GestureHandlerRootView style={styles.spe}>
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

                {renderStep(exosData, setExosData, openModal)}

            </ScrollView>
            <Modalize
                ref={modalRef}
                scrollViewProps={{ showsVerticalScrollIndicator: false }}
                snapPoint={400}
                modalStyle={modalStyle.main}
            >

                <ExoModal closeModal={exoCreated} id={progId} numExo={numExo} loadData={loadData} trainingStep={step} />

            </Modalize>
        </GestureHandlerRootView>
    );
};


export default Program;
