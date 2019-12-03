import React from 'react';
import styled from 'styled-components';

const Card = styled.li`
  height: 70px;
  width: 290px;
  margin: 10px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.palette.cardBackground};
  border-top: 10px solid
    ${props => props.theme.palette[props.done ? 'negative' : 'positive']};
  list-style: none;
  text-decoration: ${props => (props.done ? 'line-through' : 'none')};
  font-size: 20px;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
  cursor: pointer;
`;

export function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <Card
      done={todo.done}
      onClick={e => {
        if (e.metaKey || e.ctrlKey) {
          onDelete && onDelete(todo.id);
        } else {
          onToggle && onToggle(todo.id);
        }
      }}
    >
      {todo.text}
    </Card>
  );
}
