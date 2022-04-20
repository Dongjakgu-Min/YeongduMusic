import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import realm from '../../db';

import {RootStackParamList} from '../../types/navigation';

import FileScreen from './FileScreen';
import MusicListScreen from './MusicListScreen';
import SettingScreen from './SettingScreen';
import {restoreDirectory} from '../redux/action';

const Main = () => {
  const Tab = createBottomTabNavigator<RootStackParamList>();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetch = async () => {
      try {
        const dir = await realm
          .objects('Directory')
          .toJSON()
          .map(res => {
            return res.path;
          });
        dispatch(restoreDirectory(dir));
      } catch (e) {}
    };

    fetch();
  }, []);

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
      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{tabBarLabel: '설정'}}
      />
    </Tab.Navigator>
  );
};

export default Main;
