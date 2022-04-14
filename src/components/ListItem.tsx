import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '@react-navigation/native';

const ListItem = ({
  filename,
  path,
  isFile,
  onPress,
}: {
  filename: string;
  path: string;
  isFile: () => boolean;
  onPress: () => void;
}) => {
  const {colors} = useTheme();

  return (
    <TouchableOpacity style={styles.Container} onPress={() => onPress()}>
      <View style={styles.IconContainer}>
        <Icon
          style={{color: colors.text}}
          name={isFile() ? 'music-note' : 'folder'}
          size={25}
        />
      </View>
      <View style={styles.TextContainer}>
        <Text style={{color: colors.text}}>{filename}</Text>
        <Text style={{color: colors.text}}>{path}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
  },
  TextContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 10,
  },
  IconContainer: {
    justifyContent: 'center',
  },
});

export default ListItem;
