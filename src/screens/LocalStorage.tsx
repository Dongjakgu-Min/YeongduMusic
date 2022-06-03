import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import RNFS, { ReadDirItem } from 'react-native-fs';

import ListItem from '../components/ListItem';
import { readDir } from '../util/file';

const FileScreen = () => {
  const [dirPath, setDirPath] = useState<ReadDirItem[]>([]);
  const [path, setPath] = useState<ReadDirItem[]>([]); // Stack으로 기록 저장

  useEffect(() => {
    const fetch = async () => {
      if (dirPath.length === 0) {
        const stat = await RNFS.stat(RNFS.ExternalStorageDirectoryPath);
        stat.name = '...';
        setPath([stat as unknown as ReadDirItem]);
      }
    };

    fetch();
  }, [dirPath]);

  useEffect(() => {
    const fetch = async () => {
      const result = await readDir(path[path.length - 1]?.path!, false);
      const recentDir = path.length > 1 ? [path[path.length - 2]] : [];

      setDirPath([
        ...recentDir,
        ...result.sort(function (a, b) {
          if (a.isDirectory() && b.isFile()) return -1;
          if (a.isFile() && b.isDirectory()) return 1;
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        }),
      ]);
    };

    fetch();
  }, [path]);

  const onPress = (data: ReadDirItem) => {
    // 상위 디렉터리로 간다면 마지막 최근 디렉터리는 필요 없음
    if (data.name === '...') {
      setPath(path.slice(0, path.length - 1));
    } else if (data.isDirectory()) {
      setPath([...path, { ...data, name: '...' }]);
    }
  };

  return (
    <View>
      <FlatList
        data={dirPath}
        renderItem={data => (
          <ListItem
            filename={data.item.name}
            path={data.item.path}
            isFile={() => data.item.isFile()}
            onPress={() => onPress(data.item)}
          />
        )}
      />
    </View>
  );
};

export default FileScreen;
