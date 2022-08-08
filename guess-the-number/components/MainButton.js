import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../constans/Colors";

const MainButton = props => {
    return <TouchableOpacity activeOpacity={.75} onPress={props.onPress}>
        <View style={{...styles.button, ...props.style}}>
            <Text style={styles.buttonText}>{props.children}</Text>
        </View>
    </TouchableOpacity>
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 20
    },
    buttonText: {
       color: 'white',
       fontFamily: 'open-sans',
       fontSize: 18
    }
});

export default MainButton;