import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import EventDetailsScreen from '../screens/EventDetailsScreen';
import CreateEditEventScreen from '../screens/CreateEditEventScreen';

const Stack = createStackNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
             <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerShown: false, 
                }}
            >
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
                <Stack.Screen name="CreateEditEvent" component={CreateEditEventScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
