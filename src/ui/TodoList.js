import React from 'react';
import { Flex } from 'reflexbox';
import { TodoItem } from './TodoItem';
import useTodosService from '../services/todos';

export function TodoList() {
  const todos = useTodosService(({ todos }) => todos);
  const { toggleTodo, deleteTodo } = useTodosService(
    ({ todos, ...service }) => service
  );
  return (
    <Flex as="ul" p="20px" flexWrap="wrap" justifyContent="center">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
      ))}
    </Flex>
  );
}
