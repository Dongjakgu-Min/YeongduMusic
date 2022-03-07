import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';
import * as mime from 'react-native-mime-types';
import ReactNativeBlobUtil, {
  ReactNativeBlobUtilStat,
} from 'react-native-blob-util';
import ListItem from '../components/ListItem';
// import RNMusicMetadata from 'react-native-music-metadata';

import {MusicListNavigationProp} from '../../types/navigation';

const MusicListScreen = ({navigation}: MusicListNavigationProp) => {
  const [music, setMusic] = useState<ReactNativeBlobUtilStat[]>([]);

  useEffect(() => {
    const findMusic = async (path: string) => {
      const dirs = await ReactNativeBlobUtil.fs.lstat(path);
      const directories = dirs.filter(res => res.type === 'directory');

      let files = dirs.filter(res => {
        return (
          res.type === 'file' &&
          mime.lookup(res.filename).toString().split('/')[0] === 'audio'
        );
      });

      for (let dir of directories) {
        if (
          ![
            ReactNativeBlobUtil.fs.dirs.SDCardDir.split('/data')[0],
            ReactNativeBlobUtil.fs.dirs.SDCardDir.split('/Android')[0].concat(
              '/log',
            ),
          ].includes(dir.path)
        ) {
          const items = await findMusic(dir.path);
          files = files.concat(items);
        }
      }

      return files;
    };

    findMusic(ReactNativeBlobUtil.fs.dirs.SDCardDir.split('/Android')[0]).then(
      res => setMusic(res),
    );
  }, []);

  return (
    <View>
      <FlatList
        data={music}
        renderItem={data => (
          <ListItem
            filename={data.item.filename}
            path={data.item.path}
            type={data.item.type}
            onPress={() => {
              console.log('으아아아');
              navigation.navigate('MusicPlayer', {path: data.item.path});
            }}
          />
        )}
      />
    </View>
  );
};

export default MusicListScreen;
