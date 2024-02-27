import { useCallback, useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { router } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function App() {

  //load fonts
  const [fontsLoaded, fontError] = useFonts({
    'Coiny-Regular': require('./assets/fonts/Coiny-Regular.ttf'),
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf')
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
      router.replace('/src/pages/Program');
    }
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    onLayoutRootView();
  }, [onLayoutRootView]);

  if (!fontsLoaded && !fontError) {
    return null;
  }
}
