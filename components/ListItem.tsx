import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ListItem = ({
  filename,
  path,
  type,
  onPress,
}: {
  filename: string;
  path: string;
  type: string;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity style={styles.Container} onPress={() => onPress}>
      <View style={styles.IconContainer}>
        <Icon name={type === 'directory' ? 'folder' : 'music-note'} size={25} />
      </View>
      <View style={styles.TextContainer}>
        <Text>{filename}</Text>
        <Text>{path}</Text>
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
