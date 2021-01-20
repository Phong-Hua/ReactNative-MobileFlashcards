import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import NewDeck from './components/NewDeck';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import reducer from './reducers';
import {handleInitialData} from './actions';
import middleware from './middleware';

const store = createStore(reducer, middleware)

export default class App extends Component {

    constructor(props){
        super(props);
    }

    componentDidMount() {
        
        // this.props.dispatch(handleInitialData());
    }

    render() {
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <NewDeck />
                </View>
            </Provider>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
