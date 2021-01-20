import React, { Component } from 'react';
import { KeyboardAvoidingView, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { black, white } from '../utils/color';
import {saveDeck, getAllDecks} from '../utils/api';
import {connect} from 'react-redux';

class NewDeck extends Component {

    constructor(props) {
        super(props);
        this.state = {
            input: ''
        }
    }

    componentDidMount() {

        console.log('Props', JSON.stringify(this.props));
        console.log('dispatch', JSON.stringify(this.props.dispatch));
        getAllDecks();
    }

    handleInput = (input) => {
        this.setState(() => ({
            input,
        }))
    }

    handleSubmit = () => {

        saveDeck(this.state.input)

        // Set State
        this.setState(() => ({
            input: ''
        }))
        console.log('Submit');
    }

    render() {
        return (
            <KeyboardAvoidingView
                behavior='padding'
                style={styles.container}>
                <Text
                    style={styles.title}>
                    What is the title of your new deck?
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder='Deck title'
                    value={this.state.input}
                    onChangeText={this.handleInput}
                />
                <TouchableOpacity
                    style={styles.submitBtn}
                    onPress={this.handleSubmit}
                    disabled={this.state.input.trim().length === 0}
                    >
                    <Text style={styles.submitBtnText}
                    >Submit
                    </Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 28
    },
    input: {
        borderWidth: 1,
        alignSelf: 'stretch',
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
    },
    submitBtn: {
        backgroundColor: black,
        alignSelf: 'stretch',
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
    },
    submitBtnText: {
        color: white,
        textAlign: 'center',
        fontSize: 18
    }
})

export default connect()(NewDeck);