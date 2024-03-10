import { modalStyle } from "../program";
import { Text, View } from "react-native";

function Part(key) {
    return (
        <View key={key}>
            <Text style={modalStyle.subTitle}>
                {'This is a modal'}
            </Text>
            <Text style={modalStyle.text}>
                {
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et euismod nisl. Nulla facilisi. Aenean et mi volutpat, iaculis libero non, luctus quam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Curabitur euismod dapibus metus, eget egestas quam ullamcorper eu.'
                }
            </Text>
        </View>

    );
}

function renderPart(nb) {
    var items = [];

    for (let i = 0; i < nb; i++) {
        items.push(Part(i));
    }

    return items;
}

const ExoModal = () => {
    return (
        <View style={{ padding: 20 }}>
            <Text style={modalStyle.title}>
                {'exo'}
            </Text>
            {renderPart(3)}
        </View>
    );
};


export default ExoModal;
