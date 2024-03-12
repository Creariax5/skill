import React from "react";

import { TouchableOpacity, Text, View, Alert } from "react-native";
import { router } from 'expo-router';
import { useState, useEffect } from 'react';
import { Image } from "expo-image";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from "expo-status-bar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import { validationSchema } from "./form/validation";
import FormField from "./form/formField";
import { formStyles } from "./addSkill";


const imgSrc = "../../assets/";

const AddSkills = () => {
    function onSubmitHandler(values) {
        console.log(values)
        // https://reactnative.dev/docs/alert

        Alert.alert("Skill created Successfully!", "Now it's time to train!", [
            { text: 'OK', onPress: () => router.replace('./Skills') },
        ]);

        const key = skillsData.length + 1;

        skillsData.push(
            {
                id: key,
                name: values.exoName,
                text: "Difficulty : " + values.difficulty,
            })

        storeData(skillsData);
    }

    function isFormValid(isValid, touched) {
        return isValid && Object.keys(touched).length !== 0;
    }

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

    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('skills', jsonValue);

        } catch (e) {
            // saving error
            console.error("saving error");

        }
    };

    return (
        <>
            <StatusBar style="light" />

            <View style={formStyles.header}>
                <Text style={formStyles.headerText}>Create exo</Text>
            </View>

            {/* https://github.com/APSL/react-native-keyboard-aware-scroll-view */}
            <KeyboardAwareScrollView
                style={formStyles.content}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                extraScrollHeight={150}
            >
                {/* https://formik.org/docs/overview */}
                <Formik
                    initialValues={{
                        exoName: "",
                        difficulty: "",
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
                                field="exoName"
                                label="Exo Name"
                                autoCapitalize="words"
                                values={values}
                                touched={touched}
                                errors={errors}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                            />

                            <FormField
                                field="difficulty"
                                label="Difficulty"
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
        </>
    );
};



export default AddSkills;
