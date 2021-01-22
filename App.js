import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import middleware from './middleware';
import TabNav from './components/TabNav';
import DeckList from './components/DeckList';
import StackNav from './components/StackNav';
import NestedNavigation from './components/NestedNavigation';

const store = createStore(reducer, middleware)

export default class App extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    {/* <NestedNavigation /> */}
                    {/* <TabNav/> */}
                    <StackNav />
                </View>
            </Provider>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center'
    }
})