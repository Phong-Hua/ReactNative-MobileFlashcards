import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { blue, white, gray, red } from '../utils/color';
import { connect } from 'react-redux';
import { borderWidth, borderRadius, buttonHeight, titleBigSize, buttonTextSize, disableOpacity } from '../utils/style';
import {handleDeleteADeck} from '../actions';

class Deck extends Component {

    componentDidMount() {
        // Change the title of the route
        const {navigation, deckTitle} = this.props;
        navigation.setOptions({
            title: deckTitle,
        });
    }

    goToAddCard = () => {
        const { navigation, deckTitle } = this.props;
        navigation.navigate('Add Card', {
            // props go here
            deckTitle,
        });
    }

    goToStartQuiz = () => {
        const { navigation, deckTitle } = this.props;
        navigation.navigate('Quiz', {
            // props go here
            deckTitle,
            numberOfCorrect: 0,
        });
    }

    deleteDeck = () => {
        const {deckTitle, removeDeck, navigation} = this.props;
        
        // navigate to Decks
        navigation.navigate('Decks');

        removeDeck(deckTitle);
    }

    render() {
        const { deckTitle, cards } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text
                        style={styles.title}>
                        {deckTitle}
                    </Text>
                    <Text style={styles.card}>
                        {cards === 0 ? '0 card' : cards + ' cards'}
                    </Text>
                </View>
                <View style={styles.buttonContainer} >
                    <TouchableOpacity
                        style={[styles.addCardBtn,
                        styles.shareBorder,
                        styles.shareHeight,
                        styles.shareMargin
                        ]}
                        onPress={this.goToAddCard}>
                        <Text
                            style={[styles.shareText, {color: blue}]}>
                            Add Card
                    </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.startQuizBtn,
                        styles.shareBorder,
                        styles.shareHeight,
                        styles.shareMargin,
                        { opacity: (cards === 0) ? disableOpacity : 1 }
                        ]}
                        disabled={cards === 0}
                        onPress={this.goToStartQuiz}>
                        <Text
                            style={[styles.shareText, {color: white}]}>
                            Start Quiz
                    </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.deleteBtn,
                        styles.shareBorder,
                        styles.shareHeight,
                        styles.shareMargin,
                        ]}
                        onPress={this.deleteDeck}>
                        <Text
                            style={[styles.shareText, {color: white}]}>
                            Delete deck
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
    shareText: {
        textAlign: 'center',
        fontSize: buttonTextSize,
    },
    card: {
        color: gray,
        textAlign: 'center',
    },
    deleteBtn: {
        backgroundColor: red,
        borderColor: red,
        padding: 10,
    },
    startQuizBtn: {
        backgroundColor: blue,
        borderColor: blue,
        alignSelf: 'stretch',
        padding: 10,
    },
    addCardBtn: {
        backgroundColor: white,
        borderColor: blue,
        alignSelf: 'stretch',
        padding: 10,
    },
})

function mapStateToProps({ decks }, { route, navigation }) {

    const { deckTitle } = route.params;
    const cards = (decks[deckTitle] === undefined) ? 0 : decks[deckTitle].questions.length;
    return {
        deckTitle,
        cards,
    }
}

function mapDispatchToProps(dispatch, { route }) {

    const { deckTitle } = route.params;
    return {
        removeDeck: () => dispatch(handleDeleteADeck(deckTitle)),
        dispatch,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Deck);