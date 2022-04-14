import RNFS from 'react-native-fs';

export const readDir = async (path: string, onlyDirectory: boolean) => {
  const dirs = await RNFS.readDir(path);

  return dirs.filter(res => {
    return onlyDirectory
      ? res.isFile()
      : true &&
          ![
            `${RNFS.ExternalStorageDirectoryPath}/Android`,
            `${RNFS.ExternalStorageDirectoryPath}/logs`,
            `${RNFS.ExternalStorageDirectoryPath}/data`,
          ].includes(res.path);
  });
};
