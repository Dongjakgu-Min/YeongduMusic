import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';

import ReactNativeBlobUtil, {
  ReactNativeBlobUtilStat,
} from 'react-native-blob-util';
import ListItem from '../components/ListItem';

const FileScreen = () => {
  const [fileList, setFileList] = useState<ReactNativeBlobUtilStat[]>([]);
  const [dirPath, setDirPath] = useState<ReactNativeBlobUtilStat[]>([]);

  useEffect(() => {
    const fetch = async () => {
      dirPath.length === 0 &&
        setDirPath([
          await ReactNativeBlobUtil.fs.stat(
            ReactNativeBlobUtil.fs.dirs.SDCardDir.split('/Android')[0],
          ),
        ]);

      if (dirPath.length === 0) {
        return;
      }

      const recentDir = dirPath[dirPath.length - 1];
      recentDir.filename = '...';

      const result = await ReactNativeBlobUtil.fs.lstat(recentDir.path);

      const array = result.sort(function (a, b) {
        if (a.type === 'directory' && b.type === 'file') return -1;
        if (a.type === 'file' && b.type === 'directory') return 1;
        if (a.filename < b.filename) return -1;
        if (a.filename > b.filename) return 1;
        return 0;
      });

      recentDir.path !==
      ReactNativeBlobUtil.fs.dirs.SDCardDir.split('/Android')[0]
        ? setFileList([dirPath[dirPath.length - 2], ...array])
        : setFileList(array);
    };

    fetch();
  }, [dirPath]);

  const onPress = (data: ReactNativeBlobUtilStat) => {
    if (dirPath[dirPath.length - 1].path.length > data.path.length) {
      setDirPath(dirPath.slice(0, dirPath.length - 1));
    } else if (data.type === 'directory') {
      setDirPath([...dirPath, data]);
    }
  };

  return (
    <View>
      <FlatList
        data={fileList}
        renderItem={data => (
          <ListItem
            filename={data.item.filename}
            path={data.item.path}
            type={data.item.type}
            onPress={() => onPress(data.item)}
          />
        )}
      />
    </View>
  );
};

export default FileScreen;
