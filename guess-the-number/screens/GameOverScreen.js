import React, {useState, useEffect} from "react";
import {View, Text, Dimensions, StyleSheet, ScrollView, Image} from 'react-native';
import BodyText from "../components/bodyText";
import TitleText from "../components/TitleText";
import Colors from "../constans/Colors";
import MainButton from "../components/MainButton";

const GameOverScreen = props => {
    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height);

    useEffect(() => {
        const updateLayout = () => {
            setAvailableDeviceWidth(Dimensions.get('window').width)
            setAvailableDeviceHeight(Dimensions.get('window').height)
        };
        Dimensions.addEventListener('change', updateLayout )
        return () => {
            Dimensions.removeEventListener('change', updateLayout);    
        };
    });

    return (
        <ScrollView>
            <View style={styles.screen}>
                <TitleText ><Text style={{fontSize: 30, color: Colors.primary}}>The Game is Over!</Text></TitleText>
                <View style={{...styles.imageContainer, ...{
                    width: availableDeviceWidth * 0.7,
                    height: availableDeviceWidth * 0.7,
                    borderRadius: (availableDeviceWidth * 0.7) / 2,
                    marginVertical: availableDeviceHeight / 30
                    }}}>
                    <Image 
                    //source={require('../assets/success.png')}
                    source={{uri: 'https://media.istockphoto.com/photos/ama-dablam-mount-in-the-nepal-himalaya-picture-id485966046?k=20&m=485966046&s=612x612&w=0&h=gxP8DAYg54epuymP-eLMvh4hmlIm-AchRMwwNjzBUwE='}}
                    style={styles.image}
                    />
                </View> 
                <View style={{...styles.resultContainer, ...{marginVertical: availableDeviceHeight / 60}}}>
                    <BodyText style={{...styles.resultText, ...{
                            fontSize: availableDeviceHeight < 400 ? 16 : 20}}}>
                        Your phone needed <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to guess the number <Text style={styles.highlight}>{props.userNumber}</Text> 
                    </BodyText>
                </View>
                <MainButton onPress={props.onRestart} >NEW GAME</MainButton>
            </View>
            </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '70%',
        padding: 10
    },
    imageContainer: {
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%',
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold'
    },
    resultContainer: {
        marginHorizontal: 30
    },
    resultText: {
        textAlign: 'center',
        marginVertical: 15
    }
});

export default GameOverScreen;