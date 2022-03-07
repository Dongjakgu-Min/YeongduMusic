import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  MusicPlayer: {path: string};
  MusicList: undefined;
  FileList: undefined;
  Main: undefined;
};

export type MusicPlayerNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'MusicPlayer'
>;

export type FileListNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'FileList'
>;

export type MusicListNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'MusicList'
>;
