import { combineReducers } from 'redux'
import {
  ActionTypes,
  VisibilityFilters
} from './actions';
const { SHOW_ALL } = VisibilityFilters;
​
export let visibilityFilter = (state = SHOW_ALL, action: any) => {
  switch (action.type) {
    case ActionTypes.SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state
  }
};
​
export let todos = (state = [], action: any) => {
  switch (action.type) {
    case ActionTypes.ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ];
    default:
      return state
  }
};
​
export const todoAppReducer = combineReducers({
  visibilityFilter,
  todos
});
