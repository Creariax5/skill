import { Text, View, TextInput } from "react-native";
import { formStyles } from "../addSkill";

function FormField({
    field,
    label,
    secureTextEntry,
    autoCapitalize,
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
}) {
    return (
        <View style={formStyles.formGroup}>
            <Text style={formStyles.label}>{label}</Text>

            <TextInput
                style={formStyles.input}
                value={values[field]}
                onChangeText={handleChange(field)}
                onBlur={handleBlur(field)}
                secureTextEntry={secureTextEntry}
                autoCapitalize={autoCapitalize || "none"}
            />

            {touched[field] && errors[field] ? (
                <View style={formStyles.errorContainer}>
                    <Text style={formStyles.errorText}>{errors[field]}</Text>
                </View>
            ) : null}
        </View>
    );
}

export default FormField;