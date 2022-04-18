import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {createDirectory} from '../redux/action';

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
  const dispatch = useDispatch();
  const reduxState = useSelector(
    (state: {reducer: {directory: string[]}}) => state,
  );

  const addDirectoryAlert = () => {
    Alert.alert(
      '디렉터리 추가',
      `${path}를 음악 디렉토리에 추가하시겠습니까?`,
      [
        {
          text: '취소',
          style: 'cancel'
        },
        {
          text: '추가',
          onPress: () => {
            dispatch(createDirectory(path));
          },
        },
      ],
    );
  };

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
      {!isFile() &&
        filename !== '...' &&
        reduxState.reducer.directory.indexOf(path) === -1 && (
          <View style={styles.IconContainer}>
            <Icon
              style={{color: colors.text}}
              name="add-circle"
              size={15}
              onPress={() => addDirectoryAlert()}
            />
          </View>
        )}
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
