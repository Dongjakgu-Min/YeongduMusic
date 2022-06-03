import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import * as mime from 'react-native-mime-types';
import RNFS, { ReadDirItem } from 'react-native-fs';
import ListItem from '../components/ListItem';

import { MusicListNavigationProp } from '../../types/navigation';
import { useSelector } from 'react-redux';

const MusicListScreen = ({ navigation }: MusicListNavigationProp) => {
  const [music, setMusic] = useState<ReadDirItem[]>([]);

  const reduxState = useSelector(
    (state: { reducer: { directory: string[]; isPlaying: boolean } }) => state,
  );

  useEffect(() => {
    console.log(reduxState);
    const findMusic = async (path: string) => {
      const dirs = await RNFS.readDir(path);

      let files = dirs.filter(res => {
        return (
          res.isFile() &&
          mime.lookup(res.path).toString().split('/')[0] === 'audio'
        );
      });

      let directories = dirs.filter(res => {
        return res.isDirectory();
      });

      for (let dir of directories) {
        const items = await findMusic(dir.path);
        files = files.concat(items);
      }

      return files;
    };

    for (let path of reduxState.reducer.directory) {
      console.log(path);
      findMusic(path).then(res => setMusic([...music, ...res]));
    }
  }, []);

  return (
    <View>
      <FlatList
        data={music}
        renderItem={data => (
          <ListItem
            filename={data.item.name}
            path={data.item.path}
            isFile={() => data.item.isFile()}
            onPress={() => {
              navigation.navigate('MusicPlayer', { path: data.item.path });
            }}
          />
        )}
      />
    </View>
  );
};

export default MusicListScreen;
