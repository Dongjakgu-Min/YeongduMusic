import React from 'react';
import { View, Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import realm from '../../db';
import { DirectoryNavigationProp } from '../../types/navigation';
import ListItem from '../components/ListItem';
import { deleteDirectory } from '../redux/action';

const DirectoryScreen = ({ navigation }: DirectoryNavigationProp) => {
  const reduxState = useSelector(
    (state: { reducer: { directory: string[]; isPlaying: boolean } }) => state,
  );
  const dispatch = useDispatch();

  return (
    <View>
      <FlatList
        data={reduxState.reducer.directory}
        renderItem={({ item }) => (
          <ListItem
            filename={item.split('/').pop() as string}
            path={item}
            isFile={() => {
              return false;
            }}
            onPress={() => {
              Alert.alert(
                '디렉토리 제거',
                '이 디렉토리를 음악 디렉토리에서 제거하시겠습니까?',
                [
                  {
                    text: '취소',
                    style: 'cancel',
                  },
                  {
                    text: '제거',
                    onPress: () => {
                      dispatch(deleteDirectory(item));
                      realm.write(() => {
                        realm.delete(
                          realm
                            .objects('Directory')
                            .filter((obj: any) => obj.path === item),
                        );
                      });
                    },
                  },
                ],
              );
            }}
          />
        )}
      />
    </View>
  );
};

export default DirectoryScreen;
