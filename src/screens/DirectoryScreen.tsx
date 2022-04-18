import React from 'react';
import {View, Text} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {DirectoryNavigationProp} from '../../types/navigation';

const DirectoryScreen = ({navigation}: DirectoryNavigationProp) => {
  const reduxState = useSelector(
    (state: {reducer: {directory: string[]}}) => state,
  );

  return (
    <View>
      <FlatList
        data={reduxState.reducer.directory}
        renderItem={({item}) => <Text>{item}</Text>}
      />
    </View>
  );
};

export default DirectoryScreen;
