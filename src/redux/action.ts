import {
  CREATE_DIRECTORY,
  DELETE_DIRECTORY,
  PLAY_MUSIC,
  RESTORE_DIRECTORY,
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

export const playMusic = () => {
  return {type: PLAY_MUSIC, payload: true};
};

export const stopMusic = () => {
  return {type: STOP_MUSIC, payload: false};
};
