import {
  ADD_NETWORK,
  CREATE_DIRECTORY,
  DELETE_DIRECTORY,
  PLAY_MUSIC,
  REMOVE_NETWORK,
  RESTORE_DIRECTORY,
  RESTORE_NETWORK,
  STOP_MUSIC,
} from './types';

export const createDirectory = (path: string) => {
  return {type: CREATE_DIRECTORY, payload: path};
};

export const deleteDirectory = (path: string) => {
  return {type: DELETE_DIRECTORY, payload: path};
};

export const restoreDirectory = (paths: string[]) => {
  return {type: RESTORE_DIRECTORY, payload: paths};
};

export const addNetwork = (nickname: string, path: string) => {
  return {type: ADD_NETWORK, payload: {nickname, path}};
};

export const removeNetwork = (nickname: string) => {
  return {type: REMOVE_NETWORK, payload: {nickname}};
};

export const restoreNetwork = (
  networks: {
    nickname: string;
    path: string;
  }[],
) => {
  return {type: RESTORE_NETWORK, payload: networks};
};

export const playMusic = () => {
  return {type: PLAY_MUSIC, payload: true};
};

export const stopMusic = () => {
  return {type: STOP_MUSIC, payload: false};
};
