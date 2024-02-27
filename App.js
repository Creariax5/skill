import Program from "./app/src/pages/Program";
import Skills from "./app/src/pages/Skills";

import { useCallback, useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { View, BackHandler, Alert } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

SplashScreen.preventAutoHideAsync();

import { Color } from "./app/src/GlobalStyles";

function backListener(currentSkill) {
	useEffect(() => {
		const backAction = () => {
			currentSkill = 0;

			return true;
		};

		const backHandler = BackHandler.addEventListener(
			'hardwareBackPress',
			backAction,
		);

		return () => backHandler.remove();
	}, []);
}

function HomeScreen() {
	const insets = useSafeAreaInsets();

	const [currentSkill, setCurrentSkill] = useState(0);

	backListener(currentSkill)

	return (
		<View style={{ flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom, paddingRight: insets.right, paddingLeft: insets.left, backgroundColor: Color.black }}>
			{
				currentSkill == 0
					?
					Skills(currentSkill, setCurrentSkill)
					:
					Program(currentSkill, setCurrentSkill)
			}
		</View>
	);
}

export default function App() {

	//load fonts
	const [fontsLoaded, fontError] = useFonts({
		'Coiny-Regular': require('./app/assets/fonts/Coiny-Regular.ttf'),
		'Poppins-Regular': require('./app/assets/fonts/Poppins-Regular.ttf')
	});

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded || fontError) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded, fontError]);

	useEffect(() => {
		onLayoutRootView();
	}, [onLayoutRootView]);

	if (!fontsLoaded && !fontError) {
		return null;
	}

	return (
		<SafeAreaProvider>
			<HomeScreen />
		</SafeAreaProvider>
	);
}
