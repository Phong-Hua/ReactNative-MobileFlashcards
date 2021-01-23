import React, { Component } from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import middleware from './middleware';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Deck from './components/Deck';
import DeckList from './components/DeckList';
import NewDeck from './components/NewDeck';
import NewQuestion from './components/NewQuestion';
import Quiz from './components/Quiz';
import Score from './components/Score';
import { blue, white } from './utils/color';
import { setLocalNotification } from './utils/notifications';

const store = createStore(reducer, middleware);
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function AppStatusBar({backgroundColor, ... props}) {
    const height = Constants.statusBarHeight;
    return (
        <View style={{backgroundColor, height }}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    )
}

export default class App extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        setLocalNotification();
    }

    renderTabIcon = (name, color, size) => {
        return (
            <Ionicons name={name} size={size} color={color} />
        )
    }

    HomeTab = () => {
        return (
            <Tab.Navigator>
                <Tab.Screen
                    name='Decks'
                    component={DeckList}
                    options={{
                        tabBarIcon: ({ color, size }) => this.renderTabIcon('home', color, size)
                    }}
                />
                <Tab.Screen
                    name='New Deck'
                    component={NewDeck}
                    options={{
                        tabBarIcon: ({ color, size }) => this.renderTabIcon('create', color, size)
                    }}
                />
            </Tab.Navigator>
        )
    }

    render() {
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <AppStatusBar backgroundColor={blue} barStyle='light-content'/>
                    <NavigationContainer>
                        <Stack.Navigator>
                            <Stack.Screen name='Home' component={this.HomeTab} options={{ headerShown: false }} />
                            <Stack.Screen name='Deck' component={Deck} options={headerStyles, {title: 'TTTTTTTT'}} />
                            <Stack.Screen name='Add Card' component={NewQuestion} options={headerStyles} />
                            <Stack.Screen name='Quiz' component={Quiz} options={headerStyles} />
                            <Stack.Screen name='Score' component={Score} options={{ headerShown: false }} />
                        </Stack.Navigator>
                    </NavigationContainer>
                </View>
            </Provider>
        )
    }
}

const headerStyles = {
    headerStyle: { backgroundColor: blue },
    headerTintColor: white
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})