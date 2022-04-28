import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {SettingNavigationProp} from '../../types/navigation';

const styles = StyleSheet.create({
  item: {
    padding: 10,
    fontsize: 14,
    height: 44,
  },
});

const File = ({navigation}: SettingNavigationProp) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          navigation.navigate('Directory');
        }}>
        <View>
          <Text>내장 저장소</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          navigation.navigate('Directory');
        }}>
        <View>
          <Text>외부 저장소 추가</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default File;
