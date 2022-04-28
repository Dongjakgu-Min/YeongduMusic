import {
  addNetwork,
  createDirectory,
  deleteDirectory,
  playMusic,
  removeNetwork,
  restoreDirectory,
  restoreNetwork,
  stopMusic,
} from './action';
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

type Network = {
  nickname: string;
  path: string;
};

type AppState = {
  directory: string[];
  isPlaying: boolean;
  network: Network[];
};

type DirAction =
  | ReturnType<typeof createDirectory>
  | ReturnType<typeof deleteDirectory>
  | ReturnType<typeof restoreDirectory>
  | ReturnType<typeof playMusic>
  | ReturnType<typeof stopMusic>
  | ReturnType<typeof addNetwork>
  | ReturnType<typeof removeNetwork>
  | ReturnType<typeof restoreNetwork>;

const initialState: AppState = {
  directory: [],
  isPlaying: false,
  network: [],
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
    case ADD_NETWORK:
      return {...state, network: [...state.network, action.payload]};
    case REMOVE_NETWORK:
      return {
        ...state,
        network: state.network.filter(data => {
          return data.nickname !== action.payload;
        }),
      };
    case RESTORE_NETWORK:
      return {
        ...state,
        network: action.payload,
      };
    default:
      return state;
  }
}
