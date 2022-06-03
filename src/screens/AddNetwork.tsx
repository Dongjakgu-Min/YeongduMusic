import React, { useState } from 'react';
import { View, Button } from 'react-native';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { createClient } from 'webdav';
import realm from '../../db';
import { DirectoryNavigationProp } from '../../types/navigation';
import ListItem from '../components/ListItem';
import { deleteDirectory } from '../redux/action';

const AddNetworkScreen = ({ navigation }: DirectoryNavigationProp) => {
  const reduxState = useSelector(
    (state: { reducer: { directory: string[]; isPlaying: boolean } }) => state,
  );
  const dispatch = useDispatch();
  const [data, setData] = useState({ address: '', username: '', password: '' });

  return (
    <View>
      <TextInput
        onChangeText={str => setData({ ...data, address: str })}
        placeholder={'Webdav 주소를 입력 해 주세요...'}
        value={data.address}
      />
      <TextInput
        onChangeText={str => setData({ ...data, address: str })}
        placeholder={'Webdav 유저 이름을 입력 해 주세요...'}
        value={data.address}
      />
      <TextInput
        onChangeText={str => setData({ ...data, address: str })}
        placeholder={'Webdav 비밀번호를 입력 해 주세요...'}
        value={data.address}
      />
      <Button
        title={'추가'}
        onPress={() => {
          const client = createClient(data.address, {
            username: data.username,
            password: data.password,
          });

          client
            .getDirectoryContents('/')
            .then(res => console.log(res))
            .catch(err => console.log(`Connection Error : ${err.message}`));
        }}
      />
    </View>
  );
};

export default AddNetworkScreen;
