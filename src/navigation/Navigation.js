import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TransitionSpecs } from '@react-navigation/stack';

import HomeContainer from '../container/HomeContainer';
import GameDetailScreen from '../screens/GameDetailScreen';

const Stack = createStackNavigator();

const zoomInTransition = {
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  cardStyleInterpolator: ({ current }) => {
    return {
      cardStyle: {
        transform: [
          {
            scale: current.progress.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [1.5, 1.2, 1],
            }),
          },
        ],
      },
    };
  },
};

const slideInTransition = {
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  cardStyleInterpolator: ({ current, layouts }) => {
    const progress = current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [layouts.screen.width, 0],
    });

    const scale = current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0.9],
    });

    return {
      cardStyle: {
        transform: [{ translateX: progress }, { scale }],
      },
    };
  },
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeContainer"
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          cardStyle: { backgroundColor: 'transparent' },
          cardOverlayEnabled: true,
        }}
      >
        <Stack.Screen
          name="HomeContainer"
          component={HomeContainer}
          options={{ ...zoomInTransition }}
        />
        <Stack.Screen
          name="GameDetailScreen"
          component={GameDetailScreen}
          options={{ ...zoomInTransition }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
