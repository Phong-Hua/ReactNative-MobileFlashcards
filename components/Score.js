import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { white, gray, gold, red, blue } from '../utils/color';
import { borderWidth, borderRadius, buttonHeight, titleBigSize, buttonTextSize } from '../utils/style';
import {setLocalNotification, clearLocalNotification} from '../utils/notifications';

class Score extends Component {

    // Up to this screen, users already did what we want, so we clear notification for today and set notification for tommorrow.
    componentDidMount() {
        clearLocalNotification()
        .then(setLocalNotification)
    }

    renderTrophy = () => {
        return <Ionicons name='trophy' color={gold} size={24} />
    }

    renderThumbsUp = () => {
        return <Entypo name='thumbs-up' color={gold} size={24} />
    }

    goToHomeScreen = () => {
        const { navigation } = this.props;
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home', }],
        });
    }

    startQuizAgain = () => {
        const { navigation, deckTitle } = this.props;
        navigation.reset({
            index: 0,
            routes: [{ name: 'Quiz', params: { deckTitle, numberOfCorrect: 0 } }],
        });
    }

    render() {
        const { percentage } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text
                        style={[styles.title, { color: red }]}>
                        Your Score is {percentage}%
                    </Text>
                    {percentage === 100 ? this.renderTrophy() : percentage >= 50 ? this.renderThumbsUp() : null}
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.tryAgainBtn,
                        styles.shareBorder,
                        styles.shareHeight,
                        styles.shareMargin]}
                        onPress={this.startQuizAgain}
                    >
                        <Text
                            style={styles.tryAgainBtnText}>
                            Try again
                    </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.homeBtn,
                        styles.shareBorder,
                        styles.shareHeight,
                        styles.shareMargin]}
                        onPress={this.goToHomeScreen}
                    >
                        <Text
                            style={styles.homeBtnText}>
                            Home
                    </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    textContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontWeight: 'bold',
        fontSize: titleBigSize,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    shareBorder: {
        borderRadius: borderRadius,
        borderWidth: borderWidth,
    },
    shareMargin: {
        marginLeft: 40,
        marginRight: 40,
        marginTop: 10,
        marginBottom: 10,
    },
    shareHeight: {
        height: buttonHeight,
    },
    card: {
        color: gray,
        textAlign: 'center',
    },
    homeBtn: {
        backgroundColor: blue,
        borderColor: blue,
        alignSelf: 'stretch',
        padding: 10,
    },
    homeBtnText: {
        color: white,
        textAlign: 'center',
        fontSize: buttonTextSize
    },
    tryAgainBtn: {
        backgroundColor: white,
        borderColor: blue,
        alignSelf: 'stretch',
        padding: 10,
    },
    tryAgainBtnText: {
        color: blue,
        textAlign: 'center',
        fontSize: buttonTextSize
    },
})

function mapStateToProps(props, { route, navigation }) {

    const { numberOfCorrect, totalQuestion, deckTitle } = route.params;
    const percentage = Math.round(numberOfCorrect * 100 / totalQuestion);
    return {
        percentage,
        deckTitle,
    }
}

export default connect(mapStateToProps)(Score);