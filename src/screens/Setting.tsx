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

const SettingScreen = ({navigation}: SettingNavigationProp) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          navigation.navigate('Directory');
        }}>
        <View>
          <Text>디렉토리 설정</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          navigation.navigate('Directory');
        }}>
        <View>
          <Text>정보</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SettingScreen;
