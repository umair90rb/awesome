import { StyleSheet, Text, TextInput, View } from "react-native"

export interface InputProps {
    onChangeText: (text: string) => void;
    value: string
}

const Input = (props: InputProps) => {
    return (
        <View style={styles.container}>
        <Text>Enter Todo</Text>
        <TextInput style={styles.input} {...props} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        width: '50%'
    },
    input: {
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 5,
        width: '100%',
        height: 30
    }
})

export default Input;

