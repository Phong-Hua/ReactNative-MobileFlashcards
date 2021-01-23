import React, { Component } from 'react';
import { KeyboardAvoidingView, View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { blue, red, white } from '../utils/color';
import { handleAddNewDeck } from '../actions';
import { connect } from 'react-redux';
import { borderWidth, borderRadius, buttonHeight, titleBigSize, buttonTextSize} from '../utils/style';

class NewDeck extends Component {

    constructor(props) {
        super(props);

        this.state = {
            input: '',
            showError: false,
            showSuccess: false,
        }
    }


    handleInput = (input) => {
        this.setState(() => ({
            input,
            showError: false,
            showSuccess: false,
        }))
    }

    handleSubmit = () => {
        const { saveDeck } = this.props;
        const title = this.state.input.trim();

        if (title.length > 0)
            saveDeck(title)

        // Set State
        this.setState(() => ({
            input: '',
            showError: title.length === 0,
            showSuccess: title.length > 0,
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
                    {this.state.showError ? <Text style={[styles.errorText, styles.shareMargin]}>Title cannot be empty</Text> : null}
                    {this.state.showSuccess ? <Text style={[styles.successText, styles.shareMargin]}>A new deck is created</Text> : null}
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.submitBtn, styles.shareBorder, styles.shareHeight, styles.shareMargin]}
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
    },
    successText : {
        color: blue,
        textAlign: 'center',
    },
    errorText : {
        color: red,
        textAlign: 'center',
    },
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