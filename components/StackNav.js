import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Deck from './Deck';
import DeckList from './DeckList';
import NewQuestion from './NewQuestion';
import Quiz from './Quiz';
import Score from './Score';
import { blue, white } from '../utils/color';

const Stack = createStackNavigator();

export default function StackNav(props) {

    const headerStyles = {
        headerStyle: { backgroundColor: blue },
        headerTintColor: white
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Deck List' component={DeckList} options={{headerShown: false}}/>
                <Stack.Screen name='Deck' component={Deck} options={headerStyles} />
                <Stack.Screen name='Add Card' component={NewQuestion} options={headerStyles} />
                <Stack.Screen name='Quiz' component={Quiz} options={headerStyles} />
                <Stack.Screen name='Score' component={Score} options={{headerShown: false}}/>
            </Stack.Navigator>
        // </NavigationContainer>
    )
}