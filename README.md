# skill






# modif
I'm using Expo.
I went to "node_modules/react-native/Libraries/Components/Keyboard/KeyboardAvoidingView.js"

where is:
if (this.props.onLayout) {
this.props.onLayout(event);
}

replaces to:
if (this.props.onLayout) {
event.persist();
//this.props.onLayout(event);
}

It worked here!!