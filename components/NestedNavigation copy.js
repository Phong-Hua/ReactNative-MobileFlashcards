import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Feed() {
    return(
        <View>
            <Text>Feed</Text>
        </View>
    )
}

function Messages() {
    return(
        <View>
            <Text>Messages</Text>
        </View>
    )
}

function Profile({navigation}) {
    return(
        <View>
            <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                <Text>Go to Setting</Text>
            </TouchableOpacity>
        </View>
    )
}

function Settings({navigation}) {
    return(
        <View>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <Text>Go to Profile</Text>
            </TouchableOpacity>
        </View>
    )
}

function Home() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Feed" component={Feed} />
        <Tab.Screen name="Messages" component={Messages} />
      </Tab.Navigator>
    );
  }
  
  export default function App(props) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }