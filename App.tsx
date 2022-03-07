/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import {PermissionsAndroid, useColorScheme, StatusBar} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';

import TrackPlayer, {Capability} from 'react-native-track-player';

import {RootStackParamList} from './types/navigation';
import Main from './src/screens/MainScreen';
import MusicPlayer from './src/screens/MusicPlayerScreen';

const audioSetup = async () => {
  const currentTrack = await TrackPlayer.getCurrentTrack();
  if (currentTrack !== null) {
    return;
  }

  await TrackPlayer.setupPlayer({});
  await TrackPlayer.updateOptions({
    stopWithApp: false,
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
      Capability.Stop,
    ],
    compactCapabilities: [Capability.Play, Capability.Pause],
  });
};

const requestPermission = async () => {
  const granted = await PermissionsAndroid.requestMultiple([
    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  ]);

  if (
    granted['android.permission.READ_EXTERNAL_STORAGE'] ===
      PermissionsAndroid.RESULTS.GRANTED &&
    granted['android.permission.WRITE_EXTERNAL_STORAGE'] ===
      PermissionsAndroid.RESULTS.GRANTED
  ) {
    console.log('Granted');
  }
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const Stack = createNativeStackNavigator<RootStackParamList>();

  useEffect(() => {
    requestPermission();
    audioSetup();
  });

  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <StatusBar
        translucent
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
      />
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="Main"
          component={Main}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="MusicPlayer"
          component={MusicPlayer}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
