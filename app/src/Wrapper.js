import { View } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Color } from "./GlobalStyles";

function Wrapper({ Page }) {
    const insets = useSafeAreaInsets();
    return (
        <SafeAreaProvider>
            <View style={{ flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom, paddingRight: insets.right, paddingLeft: insets.left, backgroundColor: Color.black }}>
                <Page />
            </View>
        </SafeAreaProvider>
    );
}

export default Wrapper;