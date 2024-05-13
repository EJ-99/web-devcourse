import { useState } from 'react';
import TodoModal from './TodoModal';

type Todo = {
  id: number;
  text: string;
  isChecked: boolean;
};

const Todolist: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState<string>('');
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const handleCheckedChange = (itemId: number) => {
    setTodos((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };

  const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text: input, isChecked: false },
    ]);
    setInput('');
  };

  const deleteTodo = (id: number) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };

  const handleShowDetail = (todo: Todo) => {
    setShowDetail(true);
    setSelectedTodo(todo);
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
  };

  return (
    <>
      <h1>오늘 할 일</h1>
      <form className='container__form' onSubmit={addTodo}>
        <input
          className='addInput'
          type='text'
          placeholder='Add Todo'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className='addBtn'>add</button>
      </form>
      <div className='board'>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <input
                type='checkbox'
                id={todo.id.toString()}
                onChange={() => handleCheckedChange(todo.id)}
              />
              <label
                htmlFor={todo.id.toString()}
                className={todo.isChecked ? 'checked' : ''}
                onClick={() => handleShowDetail(todo)}>
                {todo.text}
              </label>
              <button className='deleteBtn' onClick={() => deleteTodo(todo.id)}>
                삭제
              </button>
            </li>
          ))}
        </ul>
      </div>
      <TodoModal
        show={showDetail}
        todo={selectedTodo}
        handleClose={handleCloseDetail}
      />
    </>
  );
};

export default Todolist;
