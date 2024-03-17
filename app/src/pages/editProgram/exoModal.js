import { modalStyle } from "../program";
import { Text, View, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useState, useEffect } from 'react';
import { Image } from "expo-image";
import { styles, boxStyle } from "../skills";
import { formStyles } from "../addSkill";
import AsyncStorage from '@react-native-async-storage/async-storage';
import FormField from "../form/formField";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import { validationSchema } from "../form/validRep";

const imgSrc = "../../../assets/";

const exoStatu = {
    IN_PROGRESS: 0,
    SELECTED: 1,
    TO_DO: 2,
    FINISH: 3,
}

let trainStep = 1;

function Choosed(key, setStep) {
    setStep(1);
    return;
}

function Box(key, skillsData, setSkillsData, setStep) {
    var mySkill = skillsData.find(item => item.id === key);

    return (
        <TouchableOpacity
            key={key}
            style={boxStyle.box}
            onPress={() => { Choosed(key, setStep) }}
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

function RenderSkills({ skillsData, setSkillsData, setStep }) {
    var items = [];
    for (let i = 0; i < skillsData.length; i++) {
        items.push(Box(i + 1, skillsData, setSkillsData, setStep));

    }
    return items;
}

const ExoModal = ({ closeModal, id, numExo, loadData, trainingStep }) => {

    const [skillsData, setSkillsData] = useState([]);
    const [exosData, setExosData] = useState([]);
    const [step, setStep] = useState(0);
    trainStep = trainingStep;

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

            try {
                savedData = await AsyncStorage.getItem('exo_' + id);
                if (savedData !== null) {
                    setExosData(JSON.parse(savedData));
                }
            } catch (error) {
                console.error("Error loading data: ", error);
            }
        };
        loadData();
    }, []);

    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('exo_' + id, jsonValue);
            //await AsyncStorage.removeItem('exo_' + id)

        } catch (e) {
            // saving error
            console.error("saving error");

        }
        loadData();
    };

    if (step == 0) {
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
                            <RenderSkills skillsData={skillsData} setSkillsData={setSkillsData} setStep={setStep} />
                            :
                            <View></View>
                        }

                    </View>
                </ScrollView>
            </View>
        );
    } else {
        function onSubmitHandler(values) {
            closeModal();

            var num = numExo % 3;
            var rang = (numExo - num) / 3;
            console.log("numExo : " + numExo);

            var dataToStore = exosData;
            try {
                console.log("rang : " + rang);
                console.log("num : " + num);

                if (trainStep == rang + 1) {
                    dataToStore[rang].exo[num] = { id: num, statu: exoStatu.IN_PROGRESS, text: values.exoReps, img: 0 };
                } else {
                    dataToStore[rang].exo[num] = { id: num, statu: exoStatu.TO_DO, text: values.exoReps, img: 0 };
                }


            } catch (error) {
                dataToStore.push({
                    id: dataToStore.length + 1,
                    exo: [
                        {},
                        {},
                        {},
                    ],
                });
                if (trainStep == rang + 1) {
                    dataToStore[rang].exo[num] = { id: num, statu: exoStatu.IN_PROGRESS, text: values.exoReps, img: 0 };
                } else {
                    dataToStore[rang].exo[num] = { id: num, statu: exoStatu.TO_DO, text: values.exoReps, img: 0 };
                }

            }

            console.log("4 : " + JSON.stringify(dataToStore));
            storeData(dataToStore);

        }

        function isFormValid(isValid, touched) {
            return isValid && Object.keys(touched).length !== 0;
        }

        return (
            <View style={{ paddingTop: 20, paddingBottom: 20 }}>
                <KeyboardAwareScrollView
                    style={formStyles.content}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    extraScrollHeight={150}
                >
                    {/* https://formik.org/docs/overview */}
                    <Formik
                        initialValues={{
                            exoReps: "",
                        }}
                        onSubmit={onSubmitHandler}
                        validationSchema={validationSchema}
                    >
                        {({
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            values,
                            errors,
                            touched,
                            isValid,
                        }) => (
                            <>
                                <FormField
                                    field="exoReps"
                                    label="Exo Repetitions / time"
                                    autoCapitalize="words"
                                    values={values}
                                    touched={touched}
                                    errors={errors}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                />

                                <TouchableOpacity
                                    onPress={handleSubmit}
                                >
                                    <View
                                        style={[
                                            formStyles.button,
                                            {
                                                opacity: isFormValid(isValid, touched) ? 1 : 0.5,
                                            },
                                        ]}
                                    >
                                        <Text style={formStyles.buttonText}>SUBMIT</Text>
                                    </View>
                                </TouchableOpacity>
                            </>
                        )}
                    </Formik>
                </KeyboardAwareScrollView>
            </View >
        );

    }


};


export default ExoModal;
