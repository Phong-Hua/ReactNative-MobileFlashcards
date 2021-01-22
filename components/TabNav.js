import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import DeckList from './DeckList';
import NewDeck from './NewDeck';
import {red} from '../utils/color';
import StackNav from './StackNav';

const Tab = createBottomTabNavigator();

function renderIcon(name, color, size) {
    return (
        <Ionicons name={name} size={size} color={color} />
    )
}

export default function TabNav(props) {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen
                    name='Decks'
                    component={StackNav}
                    options={{
                        tabBarIcon: ({ color, size }) => renderIcon('home', color, size)
                    }}
                />
                <Tab.Screen
                    name='New Deck'
                    component={NewDeck}
                    options={{
                        tabBarIcon: ({ color, size }) => renderIcon('create', color, size)
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}