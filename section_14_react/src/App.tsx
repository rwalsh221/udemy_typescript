import React, { useState } from 'react';

import TodoList from './components/TodoList';
import NewTodo from './components/NewTodo';

const App = () => {
  const [todos, setTodos] = useState<{ id: string; text: string }[]>([]);
  //   const todos = [{ id: 't1', text: 'Finish the course' }];
  console.log(todos);
  const todoAddHandler = (text: string) => {
    const todosCopy = [...todos];
    todosCopy.push({ id: `t${todos.length + 1 * Math.random()}`, text: text });
    setTodos([...todosCopy]);
    // console.log(todos);
  };

  const todoDeleteHandler = (todoId: string) => {
    let todoCopy = [...todos];

    todoCopy = todoCopy.filter((el) => el.id !== todoId);
    setTodos([...todoCopy]);
  };

  return (
    <div>
      <NewTodo onAddTodoProps={todoAddHandler} />
      <TodoList itemsProps={todos} deleteHandlerProps={todoDeleteHandler} />
    </div>
  );
};

export default App;
