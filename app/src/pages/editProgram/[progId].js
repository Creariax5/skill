import React, { useState } from 'react';
import { ScrollView, Text, View, Pressable, TouchableOpacity, ToastAndroid } from "react-native";
import { useLocalSearchParams } from 'expo-router';
import { Image } from "expo-image";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Modalize } from 'react-native-modalize';
import ExoModal from './exoModal';

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

function Exo(stepData, id, key, data, setData) {
    try {
        exoData = stepData.exo.find(exoItem => exoItem.id === id);
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
    } catch (error) {
        return Adder(id, key, openModal);
    }

}

function Adder(id, key, openModal) {
    return (
        <View style={styleExo.exo}>

            <TouchableOpacity
                style={[styleExo.exoItem]}
                onPress={() => openModal()}
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
                    {Exo(stepData, '0', key, newData, setData)}
                    {Exo(stepData, '1', key, newData, setData)}
                    {Exo(stepData, '2', key, newData, setData)}
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

    for (let i = 0; i < data.length; i++) {

        items.push(Step(data.length - i, data, setData, openModal));
    }
    items.push(Step(data.length, data, setData, openModal));

    return items;
}

const Program = () => {
    const scrollViewRef = React.useRef(null);

    const { progId } = useLocalSearchParams();

    const [data, setData] = useState([]);

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
                <Image
                    style={[styles.trophy, styles.trophyFinish]}
                    contentFit="contain"
                    source={require(imgSrc + "trophy.png")}
                />

                {renderStep(data, setData, openModal)}

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
