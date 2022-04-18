import {CREATE_DIRECTORY, DELETE_DIRECTORY} from './types';

export const createDirectory = (path: string) => {
  return {type: CREATE_DIRECTORY, payload: path};
};

export const deleteDirectory = (path: string) => {
  return {type: DELETE_DIRECTORY, payload: path};
};
