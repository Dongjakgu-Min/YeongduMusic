import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';

import ReactNativeBlobUtil, {
  ReactNativeBlobUtilStat,
} from 'react-native-blob-util';
import Icon from 'react-native-vector-icons/MaterialIcons';

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

  const ListItem = ({
    filename,
    path,
    type,
    data,
  }: {
    filename: string;
    path: string;
    type: string;
    data: ReactNativeBlobUtilStat;
  }) => {
    return (
      <TouchableOpacity
        style={styles.Container}
        onPress={() => {
          if (dirPath[dirPath.length - 1].path.length > path.length) {
            setDirPath(dirPath.slice(0, dirPath.length - 1));
          } else if (type === 'directory') {
            setDirPath([...dirPath, data]);
          }
        }}>
        <View style={styles.IconContainer}>
          <Icon
            name={type === 'directory' ? 'folder' : 'music-note'}
            size={25}
          />
        </View>
        <View style={styles.TextContainer}>
          <Text>{filename}</Text>
          <Text>{path}</Text>
        </View>
      </TouchableOpacity>
    );
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
            data={data.item}
          />
        )}
      />
    </View>
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

export default FileScreen;
