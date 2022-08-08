import React from'react';
import {View, StyleSheet} from 'react-native';
import Colors from '../constans/Colors';

const Card = props => {
    return (
        <View style={{...styles.card, ...props.style}}>{props.children}</View>
    );
};

const styles = StyleSheet.create({
    card: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.26,
        backgroundColor: Colors.cardBackground,
        elevation: 15,
        padding: 15,
        borderRadius: 15
    }
});

export default Card;