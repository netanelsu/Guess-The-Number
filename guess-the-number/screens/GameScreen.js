import React, {useState, useRef, useEffect} from 'react';
import {View, Text, Dimensions, StyleSheet, Alert, ScrollView, FlatList} from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';
import { Ionicons } from '@expo/vector-icons';
import BodyText from '../components/bodyText';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.ceil(max);
    const rndNum = Math.floor(Math.random() * (max-min)) + min;
    if(rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    }
    else{
        return rndNum;
    }
};

const renderListItem = (listLength, itemData) => (
    <View style={styles.listItem}>
        <BodyText>#{listLength-itemData.index}</BodyText>
        <BodyText>{itemData.item}</BodyText>
    </View>
);

const GameScreen = props => {
    const initialGuess = generateRandomBetween(1, 100, props.userChoise);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);
    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height);

    const {userChoise, onGameOver} = props;

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

    useEffect(() => {
        if(currentGuess === userChoise){
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoise, onGameOver ]);
    
    const nextGuessHandler = direction => {
        if((direction === 'lower' && currentGuess < props.userChoise) || (direction === 'greater' && currentGuess > props.userChoise)){
            Alert.alert('don\'t lie!', 'You know that this wrong...', [{text: 'Sorry!', style: 'cancel'}])
            return;
        }
        if(direction === 'lower') {
            currentHigh.current = currentGuess;
        } else{
            currentLow.current = currentGuess + 1;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        setPastGuesses(curPastGuess => [nextNumber.toString(), ...curPastGuess])
    };

    let listContainerStyle = styles.listContainer;

    if (availableDeviceWidth < 350) {
        listContainerStyle = styles.listContainerBig;
    }

    let gameControls = (
        <React.Fragment>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={{...styles.buttonContainer, ...{marginTop: availableDeviceHeight > 600 ? 20 : 5}}}>
                <MainButton style={styles.lower} onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons name="md-arrow-down-circle" size={35} color="white"/>
                </MainButton>
                <MainButton style={styles.greater} onPress={nextGuessHandler.bind(this, 'greater')}>
                    <Ionicons name="md-arrow-up-circle" size={35} color="white"/>
                </MainButton>
            </Card>
        </React.Fragment>
    );
     
    if (availableDeviceHeight < 500) {
        gameControls =  (
            <View style={styles.control}>
                <MainButton style={styles.lower} onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons name="md-arrow-down-circle" size={35} color="white"/>
                </MainButton>
                <NumberContainer>{currentGuess}</NumberContainer>
                <MainButton style={styles.greater} onPress={nextGuessHandler.bind(this, 'greater')}>
                    <Ionicons name="md-arrow-up-circle" size={35} color="white"/>
                </MainButton>
            </View>
        );
    }

    return (
        <View style={styles.screen}>
            <TitleText >Opponent's Guess:</TitleText>
            {gameControls}
            <View style={listContainerStyle}>
            {/* <ScrollView contentContainerStyle={styles.list}>
                {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length-index))}
            </ScrollView> */}
                <FlatList 
                    keyExtractor={(item) => item} 
                    data={pastGuesses} 
                    renderItem={renderListItem.bind(this, pastGuesses.length)}
                    contentContainerStyle={styles.list}
                />
            </View>
            
        </View>
    );
};


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        width: 300,
        justifyContent: 'space-around',
        maxWidth: '90%'
    },
    control: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: "80%"
    },
    lower: {
        backgroundColor: "#ff0000",
        borderWidth: 2
    },
    greater: {
        backgroundColor: "#008000",
        borderWidth: 2
    },
    listItem: {
       borderColor: "black",
       borderWidth: 2,
       padding: 15,
       marginVertical:  10,
       backgroundColor: 'white',
       flexDirection: 'row',
       justifyContent: 'space-around',
       width: '100%'
    },
    list: {
       flexGrow: 1,
       justifyContent: 'flex-end'
    },
    listContainer: {
        width: '60%',
        flex: 1
    },
    listContainerBig: {
        flex: 1,
        width: '80%'
    }
});

export default GameScreen;