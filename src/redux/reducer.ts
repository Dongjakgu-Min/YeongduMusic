import {createDirectory, deleteDirectory} from './action';
import {CREATE_DIRECTORY, DELETE_DIRECTORY} from './types';

type AppState = {
  directory: string[];
};

type DirAction =
  | ReturnType<typeof createDirectory>
  | ReturnType<typeof deleteDirectory>;

const initialState: AppState = {
  directory: [],
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
    default:
      return;
  }
}
