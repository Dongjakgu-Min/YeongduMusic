import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  item: {
    padding: 10,
    fontsize: 14,
    height: 44,
  },
});

const SettingScreen = () => {
  return (
    <View>
      <FlatList
        data={[{key: '음악 디렉토리 설정'}, {key: '정보'}]}
        renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
      />
    </View>
  );
};

export default SettingScreen;
