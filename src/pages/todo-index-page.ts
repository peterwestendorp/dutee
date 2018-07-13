import { h, VNode } from 'maquette';
import { Services } from '../app';
import { IPage } from './index';
import { createStore } from 'redux';
import { todoAppReducer } from '../state/reducers';
import { addTodo, VisibilityFilters } from '../state/actions';
import { TextInput } from '../components/input/text-input-component';
import { IComponent } from '../components';
import { TodoItemComponent } from '../components/todo-item/todo-item-component';

export class TodoIndexPage implements IPage {
  private services: Services;
  private store: any;
  private todoInput: IComponent;
  private todoItemComponents: any;

  constructor(services: Services) {
    this.services = services;
    this.store = createStore(todoAppReducer);
    this.todoInput =  new TextInput({
      id: 'rosterNameField',
      label: 'Roster name',
      services,
      update: (newValue: string) => {
        this.store.dispatch(addTodo(newValue));
      }
    });

    const unsubscribe = this.store.subscribe(() =>
      console.log(this.store.getState())
    );

    this.store.dispatch(addTodo('Learn about actions'));
    this.store.dispatch(addTodo('Learn about reducers'));
    this.store.dispatch(addTodo('Learn about store'));

    console.log(this.store.getState().todos)
    this.todoItemComponents = this.store.getState().todos.map((todo: any) => {
      return new TodoItemComponent({
        id: todo.text,
        getCurrentValue: () => todo.text,
        update: (newValue: string) => console.log('NOw WHAT?')
      }).render();
    });
  }

  render(): VNode {
    return h('div', [
      this.todoInput.render(),
      h('ol', [this.todoItemComponents])
    ]);
  }
}