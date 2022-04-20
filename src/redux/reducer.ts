import {
  createDirectory,
  deleteDirectory,
  playMusic,
  restoreDirectory,
  stopMusic,
} from './action';
import {
  CREATE_DIRECTORY,
  DELETE_DIRECTORY,
  PLAY_MUSIC,
  RESTORE_DIRECTORY,
  STOP_MUSIC,
} from './types';

type AppState = {
  directory: string[];
  isPlaying: boolean;
};

type DirAction =
  | ReturnType<typeof createDirectory>
  | ReturnType<typeof deleteDirectory>
  | ReturnType<typeof restoreDirectory>
  | ReturnType<typeof playMusic>
  | ReturnType<typeof stopMusic>;

const initialState: AppState = {
  directory: [],
  isPlaying: false,
};

export function reducer(state: AppState = initialState, action: DirAction) {
  switch (action.type) {
    case CREATE_DIRECTORY:
      return {directory: [...state.directory, action.payload]};
    case DELETE_DIRECTORY:
      return {
        directory: state.directory.filter(data => {
          return data !== action.payload;
        }),
      };
    case RESTORE_DIRECTORY:
      return {
        directory: action.payload,
      };
    case STOP_MUSIC:
    case PLAY_MUSIC:
      return {directory: state.directory, isPlaying: action.payload};
    default:
      return state;
  }
}
