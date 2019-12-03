import create from 'zustand';
import produce from 'immer';
import uuid from 'uuid';

const INITIAL = [
  { id: uuid(), text: 'Have morning coffee', done: true },
  { id: uuid(), text: 'Have lunch', done: true },
  { id: uuid(), text: 'Have dinner', done: false },
];

const [useTodosService] = create(_set => {
  const set = fn => _set(produce(fn));
  return {
    todos: INITIAL,
    toggleTodo: todoId =>
      set(state => {
        const todo = state.todos.find(todo => todo.id === todoId);
        if (todo) {
          todo.done = !todo.done;
        }
      }),
    deleteTodo: todoId =>
      set(state => {
        const todoIndex = state.todos.findIndex(todo => todo.id === todoId);
        if (todoIndex >= 0) {
          state.todos.splice(todoIndex, 1);
        }
      }),
  };
});

export default useTodosService;
