import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';
import * as mime from 'react-native-mime-types';
import RNFS, {ReadDirItem} from 'react-native-fs';
import ListItem from '../components/ListItem';

import {MusicListNavigationProp} from '../../types/navigation';

const MusicListScreen = ({navigation}: MusicListNavigationProp) => {
  const [music, setMusic] = useState<ReadDirItem[]>([]);

  useEffect(() => {
    const findMusic = async (path: string) => {
      const dirs = await RNFS.readDir(path);

      let files = dirs.filter(res => {
        return (
          res.isFile() &&
          mime.lookup(res.path).toString().split('/')[0] === 'audio'
        );
      });

      let directories = dirs.filter(res => {
        return (
          res.isDirectory() &&
          ![
            `${RNFS.ExternalStorageDirectoryPath}/Android`,
            `${RNFS.ExternalStorageDirectoryPath}/logs`,
            `${RNFS.ExternalStorageDirectoryPath}/data`,
          ].includes(res.path)
        );
      });

      for (let dir of directories) {
        const items = await findMusic(dir.path);
        files = files.concat(items);
      }

      return files;
    };

    findMusic(RNFS.ExternalStorageDirectoryPath).then(res => setMusic(res));
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
              navigation.navigate('MusicPlayer', {path: data.item.path});
            }}
          />
        )}
      />
    </View>
  );
};

export default MusicListScreen;
