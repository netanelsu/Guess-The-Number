import React, {useState, useEffect} from "react";
import { View, ScrollView, Dimensions, StyleSheet, Button, Alert, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from "react-native";
import Card from "../components/Card";
import BodyText from "../components/bodyText";
import Colors from "../constans/Colors";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";
import TitleText from "../components/TitleText";
import MainButton from "../components/MainButton";

const StartGameScreen = props => {
    const [eneteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4);

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    };
    useEffect(() => {
        const updateLayout = () => {
            setButtonWidth(Dimensions.get('window').width / 4);
        };

        Dimensions.addEventListener('change', updateLayout);
        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        };
    });

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(eneteredValue);
        if(isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99){
            Alert.alert('invalide number!', 'Number has to be a number between 1 and 99.',[{text: 'okay',style: 'destructive', onPress: resetInputHandler}]);
            return;
        }
        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        setEnteredValue('');
        Keyboard.dismiss();
    };

    let confirmedOutput;

    if(confirmed){
        confirmedOutput = (
           <Card style={styles.summaryContainer}>
               <BodyText>You selected:</BodyText>
               <NumberContainer>{selectedNumber}</NumberContainer>
               <MainButton onPress={() => props.onStartGame(selectedNumber)}>START GAME</MainButton>
            </Card>   
        );
    }

    return(
        <ScrollView>
            <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
                <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss();}}>
                    <View style = {styles.screen}>
                        <TitleText style={styles.title}>Start a New Game!</TitleText>
                        <Card style={styles.inputContainer}>
                            <BodyText>Select a Number:</BodyText>
                            <Input 
                                style={styles.input} 
                                blurOnSubmit 
                                autoCapitalize='none' 
                                autoCorrect={false} 
                                keyboardType="number-pad"
                                keyboa 
                                maxLength={2}
                                onChangeText={numberInputHandler}
                                value={eneteredValue}
                            />
                            <View style={styles.buttonContainer} >
                                <View style={{width: buttonWidth}}><Button title="Reset" onPress={resetInputHandler} color={Colors.accent} /></View>
                                <View style={{width: buttonWidth}}><Button title="confirm" onPress={confirmInputHandler} color={Colors.primary} /></View>
                            </View>
                        </Card>
                        {confirmedOutput}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>    
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginVertical: 10
    },
    inputContainer: {
        maxWidth: '95%',
        width: '80%',
        minWidth: 300,
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    // button: {
    //     //width: 100
    //     width: Dimensions.get('window').width / 4
    // },
    input: {
        width: 50,
        textAlign: 'center'
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center'
    }
});

export default StartGameScreen;