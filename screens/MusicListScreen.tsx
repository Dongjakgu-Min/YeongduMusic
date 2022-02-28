import React, {useEffect, useState} from 'react';
import {View, FlatList, ScrollView, Text} from 'react-native';
import * as mime from 'react-native-mime-types';
import ReactNativeBlobUtil, {
  ReactNativeBlobUtilStat,
} from 'react-native-blob-util';

const MusicListScreen = () => {
  const [music, setMusic] = useState<ReactNativeBlobUtilStat[]>([]);

  useEffect(() => {
    const findMusic = async (path: string) => {
      const dirs = await ReactNativeBlobUtil.fs.lstat(path);
      const directories = dirs.filter(res => res.type === 'directory');
      const files = dirs.filter(res => {
        return (
          res.type === 'file' &&
          mime.lookup(res.filename).toString().split('/')[0] === 'audio'
        );
      });

      setMusic([...music, ...files]);
      console.log(files);

      directories.map(dir => {
        if (
          dir.path !==
            ReactNativeBlobUtil.fs.dirs.SDCardDir.split('/data')[0] &&
          dir.path !==
            ReactNativeBlobUtil.fs.dirs.SDCardDir.split('/Android')[0].concat(
              '/log',
            )
        ) {
          findMusic(dir.path);
        }
      });
    };

    findMusic(ReactNativeBlobUtil.fs.dirs.SDCardDir.split('/Android')[0]).then(
      res => console.log(music),
    );
  }, []);

  return (
    <ScrollView>
      {music.map(file => {
        return <Text>{file.filename}</Text>;
      })}
    </ScrollView>
  );
};

export default MusicListScreen;
