interface TodoListProps {
  itemsProps: { id: string; text: string }[];
  deleteHandlerProps: (todoId: string) => void;
}

const TodoList = ({ itemsProps, deleteHandlerProps }: TodoListProps) => {
  return (
    <ul>
      {itemsProps.map((todo) => (
        <li key={todo.id}>
          <span>{todo.text}</span>
          <button
            onClick={() => {
              deleteHandlerProps(todo.id);
            }}
          >
            DELETE
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
