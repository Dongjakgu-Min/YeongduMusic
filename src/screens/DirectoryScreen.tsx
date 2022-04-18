import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

const DirectoryScreen = () => {
  return (
    <View>
      <FlatList
        data={[{link: '추가하기...'}]}
        renderItem={({item}) => <Text>{item.link}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  
});

export default DirectoryScreen;
