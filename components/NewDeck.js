import React, { Component } from 'react';
import { KeyboardAvoidingView, View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { blue, white } from '../utils/color';
import { handleAddNewDeck } from '../actions';
import { connect } from 'react-redux';
import { borderWidth, borderRadius, buttonHeight, titleBigSize, buttonTextSize } from '../utils/style';

class NewDeck extends Component {

    constructor(props) {
        super(props);

        this.state = {
            input: ''
        }
    }


    handleInput = (input) => {
        this.setState(() => ({
            input,
        }))
    }

    handleSubmit = () => {
        const { saveDeck } = this.props;

        saveDeck(this.state.input)

        // Set State
        this.setState(() => ({
            input: ''
        }))
    }

    render() {
        return (
            <KeyboardAvoidingView
                behavior='padding'
                style={styles.container}>
                <View style={styles.textContainer}>
                    <Text
                        style={styles.title}>
                        What is the title of your new deck?
                    </Text>

                    <TextInput
                        style={[styles.input, styles.shareBorder, styles.shareHeight, styles.shareMargin]}
                        placeholder='Deck title'
                        value={this.state.input}
                        onChangeText={this.handleInput}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.submitBtn, styles.shareBorder, styles.shareHeight, styles.shareMargin]}
                        onPress={this.handleSubmit}
                        disabled={this.state.input.trim().length === 0}
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
    textContainer: {
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
        borderColor: blue,
        alignSelf: 'stretch',
        padding: 10,
    },
    submitBtnText: {
        color: white,
        textAlign: 'center',
        fontSize: buttonTextSize
    }
})

function mapStateToProps(props) {
    return props;
}

function mapDispatchToProps(dispatch) {
    return {
        saveDeck: (deckTitle) => dispatch(handleAddNewDeck(deckTitle))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDeck);