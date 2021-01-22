import React, { Component } from 'react';
import { KeyboardAvoidingView, View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { white, blue } from '../utils/color';
import { connect } from 'react-redux';
import { borderWidth, borderRadius, buttonHeight, titleBigSize, buttonTextSize } from '../utils/style';
import { handleAddNewQuestion } from '../actions';
class NewQuestion extends Component {

    constructor(props) {
        super(props);

        this.state = {
            question: '',
            answer: '',
        }
    }

    handleQuestionInput = (input) => {
        this.setState(() => ({
            question: input,
        }))
    }

    handleAnswerInput = (input) => {
        this.setState(() => ({
            answer: input,
        }))
    }

    handleSubmit = () => {
        const { addQuestion } = this.props;
        addQuestion(this.state.question, this.state.answer)

        this.setState(() => ({
            question: '',
            answer: ''
        }))
    }

    render() {
        return (
            <KeyboardAvoidingView
                behavior='padding'
                style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={[styles.input, styles.shareBorder, styles.shareHeight, styles.shareMargin]}
                        placeholder='Question'
                        value={this.state.question}
                        onChangeText={this.handleQuestionInput}
                    />

                    <TextInput
                        style={[styles.input, styles.shareBorder, styles.shareHeight, styles.shareMargin]}
                        placeholder='Answer'
                        value={this.state.answer}
                        onChangeText={this.handleAnswerInput}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.submitBtn, { borderRadius: borderRadius }, styles.shareHeight, styles.shareMargin]}
                        onPress={this.handleSubmit}
                        disabled={this.state.question.trim().length === 0 || this.state.answer.trim().length === 0}
                    >
                        <Text style={styles.submitBtnText}
                        >Submit
                    </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
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
    inputContainer: {
        flex: 2,
        justifyContent: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: titleBigSize,
        textAlign: 'center',
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
    input: {
        alignSelf: 'stretch',
        borderColor: blue,
        padding: 10,
    },
    submitBtn: {
        backgroundColor: blue,
        alignSelf: 'stretch',
        padding: 10,
    },
    submitBtnText: {
        color: white,
        textAlign: 'center',
        fontSize: buttonTextSize
    }
})

function mapStateToProps(props, { route }) {
    const { deckTitle } = route.params;
    return {
        deckTitle,
    }
}

function mapDispatchToProps(dispatch, { route }) {
    const { deckTitle } = route.params;
    return {
        addQuestion: (question, answer) => dispatch(handleAddNewQuestion(deckTitle, question, answer))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewQuestion);