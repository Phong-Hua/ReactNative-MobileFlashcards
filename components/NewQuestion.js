import React, { Component } from 'react';
import { KeyboardAvoidingView, View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { blue, red, white } from '../utils/color';
import { connect } from 'react-redux';
import { borderWidth, borderRadius, buttonHeight, titleBigSize, buttonTextSize } from '../utils/style';
import { handleAddNewQuestion } from '../actions';
class NewQuestion extends Component {

    constructor(props) {
        super(props);

        this.state = {
            question: '',
            answer: '',
            showQuestionError: false,
            showAnswerError: false,
            showSuccess: false,
        }
    }

    handleQuestionInput = (input) => {
        this.setState(() => ({
            question: input,
            showQuestionError: false,
            showAnswerError: false,
            showSuccess: false,
        }))
    }

    handleAnswerInput = (input) => {
        this.setState(() => ({
            answer: input,
            showQuestionError: false,
            showAnswerError: false,
            showSuccess: false,
        }))
    }

    handleSubmit = () => {
        const { addQuestion } = this.props;
        const question = this.state.question.trim();
        const answer = this.state.answer.trim();

        if (question.length > 0 && answer.length > 0) {
            addQuestion(question, answer);
            this.setState(() => ({
                question: '',
                answer: '',
            }))
        }

        this.setState(() => ({
            showQuestionError: question.length === 0,
            showAnswerError: answer.length === 0,
            showSuccess: question.length > 0 && answer.length > 0,
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

                    {this.state.showQuestionError ? <Text style={[styles.errorText, styles.shareMargin]}>Question cannot be empty</Text> : null}
                    {this.state.showAnswerError ? <Text style={[styles.errorText, styles.shareMargin]}>Answer cannot be empty</Text> : null}
                    {this.state.showSuccess ? <Text style={[styles.successText, styles.shareMargin]}>A new card is created</Text> : null}
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.submitBtn, { borderRadius: borderRadius }, styles.shareHeight, styles.shareMargin]}
                        onPress={this.handleSubmit}
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
    },
    successText: {
        color: blue,
        textAlign: 'center',
    },
    errorText: {
        color: red,
        textAlign: 'center',
    },
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