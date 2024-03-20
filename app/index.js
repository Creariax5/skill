import { createContext, useCallback, useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { router } from 'expo-router';
import { ViewComponent } from 'react-native';

SplashScreen.preventAutoHideAsync();

const storeData = async (value) => {
	try {
		const jsonValue = JSON.stringify(value);
		await AsyncStorage.setItem('skills', jsonValue);

	} catch (e) {
		// saving error
		console.error("saving error");

	}
};

function resetAppData() {
	AsyncStorage.clear();

	storeData(
		[
			{
				id: 1,
				name: "Human flag",
				text: "Difficulty : easy",
			},
			{
				id: 2,
				name: "Front lever",
				text: "Difficulty : hard"
			},
			{
				id: 3,
				name: "Pompes sur 1 doigt",
				text: "Difficulty : medium"
			},
		]
	);
}

export default function App() {
	//load fonts
	const [fontsLoaded, fontError] = useFonts({
		'Coiny-Regular': require('./assets/fonts/Coiny-Regular.ttf'),
		'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf')
	});

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded || fontError) {
			await SplashScreen.hideAsync();
			router.replace('/src/pages/Skills');
		}
	}, [fontsLoaded, fontError]);

	useEffect(() => {
		onLayoutRootView();
	}, [onLayoutRootView]);

	if (!fontsLoaded && !fontError) {
		return null;
	}

	//resetAppData()

}
