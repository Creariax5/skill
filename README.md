# skill






# modif
go to "node_modules/react-native/Libraries/Components/Keyboard/KeyboardAvoidingView.js"

where is:
if (this.props.onLayout) {
this.props.onLayout(event);
}

replaces to:
if (this.props.onLayout) {
event.persist();
//this.props.onLayout(event);
}

# commands
git add .
git commit -m "link skill to exo"
git push -u origin main

cd app/src
find . -type f -print0 | xargs -0 cat | wc -l
cd ../../


# To Do

-> img system (upload ...)
-> skill description and shox it on exo modal
-> skill search sys
-> skill editing sys