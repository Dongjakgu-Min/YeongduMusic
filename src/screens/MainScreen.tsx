import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {RootStackParamList} from '../../types/navigation';

import FileScreen from './FileScreen';
import MusicListScreen from './MusicListScreen';

const Main = () => {
  const Tab = createBottomTabNavigator<RootStackParamList>();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="FileList"
        component={FileScreen}
        options={{tabBarLabel: '파일'}}
      />
      <Tab.Screen
        name="MusicList"
        component={MusicListScreen}
        options={{tabBarLabel: '음악'}}
      />
    </Tab.Navigator>
  );
};

export default Main;
