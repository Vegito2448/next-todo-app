'use client';
import { toggleTodoStatus } from "@/helpers";
import { Todo } from "@prisma/client";
import { IoCheckboxOutline, IoSquareOutline } from 'react-icons/io5';
import styles from './TodoItem.module.css';

interface TodoItemProps {
  todo: Todo;
  toggleTodo: typeof toggleTodoStatus;
}
export const TodoItem = ({ todo, toggleTodo }: TodoItemProps) => {
  return (
    <div
      className={todo.completed ? styles.todoDone : styles.todoPending}
    >
      <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
        <div
          onClick={() => toggleTodo(todo.id, !todo.completed)}
          className={`flex p-2 rounded-md cursor-pointer hover:bg-opacity-60 ${todo.completed ? 'bg-blue-100' : 'bg-red-100'}`}>
          {todo.completed ? <IoCheckboxOutline size={30} /> : <IoSquareOutline size={30} color="gray" />}
        </div>
        <div className="text-center sm:text-left">
          <h3 className="text-xl font-semibold">{todo.title}</h3>
        </div>
      </div>
    </div>
  );
};
