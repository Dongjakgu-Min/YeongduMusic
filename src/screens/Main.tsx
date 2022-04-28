import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import realm from '../../db';

import {RootStackParamList} from '../../types/navigation';

import FileScreen from './LocalStorage';
import MusicListScreen from './MusicList';
import SettingScreen from './Setting';
import {restoreDirectory} from '../redux/action';

import CIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet} from 'react-native';

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
        options={{
          tabBarLabel: '파일',
          headerRight: () => (
            <CIcon name="folder-network" size={20} style={styles.networkBtn} />
          ),
        }}
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

const styles = StyleSheet.create({
  networkBtn: {
    paddingRight: 20,
  },
});

export default Main;
