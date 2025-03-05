'use client';

import { toggleTodo } from "@/actions";
import { toggleTodoStatus } from "@/helpers";
import { Todo } from "@prisma/client";
import { startTransition, useOptimistic } from "react";
import { IoCheckboxOutline, IoSquareOutline } from 'react-icons/io5';
import styles from './TodoItem.module.css';

interface TodoItemProps {
  todo: Todo;
  toggleTodo: typeof toggleTodoStatus | typeof toggleTodo;
}

const useOptFn = (state: Todo, { completed }: Todo) => ({ ...state, completed })

export const TodoItem = ({ todo, toggleTodo }: TodoItemProps) => {

  const [todoOpt, toggleTodoOpt] = useOptimistic(todo, useOptFn);

  const toggleTodoOptWithTransition = () => startTransition(() => toggleTodoOpt({ ...todoOpt, completed: !todoOpt.completed }));

  const onToggleTodo = async () => {

    try {

      toggleTodoOptWithTransition();

      await toggleTodo({ ...todoOpt, completed: !todoOpt.completed });

    } catch (error) {

      toggleTodoOptWithTransition();

    }

  }

  return (
    <div
      className={todoOpt.completed ? styles.todoDone : styles.todoPending}
    >
      <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
        <div
          onClick={onToggleTodo}
          className={`flex p-2 rounded-md cursor-pointer hover:bg-opacity-60 ${todoOpt.completed ? 'bg-blue-100' : 'bg-red-100'}`}>
          {todoOpt.completed ? <IoCheckboxOutline size={30} /> : <IoSquareOutline size={30} color="gray" />}
        </div>
        <div className="text-center sm:text-left">
          <h3 className="text-xl font-semibold">{todoOpt.title}</h3>
        </div>
      </div>
    </div>
  );
};
