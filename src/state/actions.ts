export enum ActionTypes {
  ADD_TODO,
  SET_VISIBILITY_FILTER
}

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
};

export let addTodo = (text: any) => {
  return { type: ActionTypes.ADD_TODO, text };
};