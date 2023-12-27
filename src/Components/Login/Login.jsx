import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const Login = () => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={() => { console.log("Demo"); }}
                placeholder='Useless Placeholder'
            />
            <TextInput
                style={styles.input}
                onChangeText={() => { console.log("Demo"); }}
                placeholder="useless placeholder"
                keyboardType="numeric"
            />
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        justifyContent: "center",
    },
    input: {
        height: 60,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});

export default Login;
