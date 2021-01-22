import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { green, red, white } from '../utils/color';
import { connect } from 'react-redux';
import { borderWidth, borderRadius, buttonHeight, buttonTextSize, titleMediumSize } from '../utils/style';
import { NavigationActions } from 'react-navigation';

class Quiz extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showQuestion: true
        }
    }

    showAnswerClick = () => {
        this.setState((currentState) => ({
            showQuestion: !currentState.showQuestion
        }))
    }

    handleBtnClick = (clickCorrect) => {
        const { numberOfCorrect } = this.props;
        if (clickCorrect)
            this.goToNextScreen(numberOfCorrect + 1);
        else
            this.goToNextScreen(numberOfCorrect);
    }

    goToNextScreen = (numberOfCorrect) => {
        const { navigation, isLastQuestion, deckTitle, nextQuestion, totalQuestion } = this.props;

        if (!isLastQuestion) {
            navigation.navigate('Quiz', {
                // props go here
                question: nextQuestion,
                deckTitle,
                numberOfCorrect,
            });
        }
        // Route to the Score screen, and we don't want user go back from there.
        // So, we reset the navigation.
        else {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Score', params: { deckTitle, numberOfCorrect, totalQuestion } }],
            });
        }
    }

    render() {

        const { currentQuestionIndex, totalQuestion, currentQuestion } = this.props;

        return (
            <View style={styles.container}>
                <Text style={[styles.shareMargin, { alignSelf: 'flex-start' }]}>{currentQuestionIndex + 1}/{totalQuestion}</Text>

                <View style={styles.questionContainer}>
                    <Text
                        style={styles.title}>
                        {this.state.showQuestion ? currentQuestion.question : currentQuestion.answer}
                    </Text>
                    <TouchableOpacity onPress={this.showAnswerClick}>
                        <Text style={{ color: red}}>
                            {this.state.showQuestion ? 'View Answer' : 'View Question'}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.correctBtn,
                        styles.shareBorder,
                        styles.shareHeight,
                        styles.shareMargin
                        ]}
                        onPress={() => this.handleBtnClick(true)}>
                        <Text
                            style={styles.btnText}>
                            Correct
                    </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.incorrectBtn,
                        styles.shareBorder,
                        styles.shareHeight,
                        styles.shareMargin
                        ]}
                        onPress={() => this.handleBtnClick(false)}>
                        <Text
                            style={styles.btnText}>
                            Incorrect
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
    questionContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontWeight: 'bold',
        fontSize: titleMediumSize,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    shareBorder: {
        borderRadius: borderRadius,
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
    correctBtn: {
        backgroundColor: green,
        alignSelf: 'stretch',
        padding: 10,
    },
    btnText: {
        color: white,
        textAlign: 'center',
        fontSize: buttonTextSize
    },
    incorrectBtn: {
        backgroundColor: red,
        alignSelf: 'stretch',
        padding: 10,
    },
})

function mapStateToProps({ decks }, { route }) {

    const { question, deckTitle, numberOfCorrect } = route.params;
    const allQuestions = decks[deckTitle].questions;
    const currentQuestion = question === undefined ? allQuestions[0] : question;
    const currentQuestionIndex = allQuestions.indexOf(currentQuestion);
    const totalQuestion = allQuestions.length;
    const isLastQuestion = currentQuestionIndex === totalQuestion - 1;
    const nextQuestion = (isLastQuestion) ? undefined : allQuestions[currentQuestionIndex + 1];

    return {
        currentQuestion,
        deckTitle,
        currentQuestionIndex,
        totalQuestion,
        isLastQuestion,
        nextQuestion,
        numberOfCorrect,
    }
}

export default connect(mapStateToProps)(Quiz);