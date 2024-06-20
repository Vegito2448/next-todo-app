'use client';
import { toggleTodo } from "@/actions";
import { Todo } from "@prisma/client";
import { useRouter } from "next/navigation";
import { TodoItem } from "./TodoItem";


interface TodosGridProps {
  todos?: Todo[];
}

export const TodosGrid = ({ todos }: TodosGridProps) => {

  const router = useRouter();

  /* const toggleTodo = async (id: string, completed: boolean) => {
    const todo = await toggleTodoStatus(id, completed);
    console.log(`🚀 ~ toggleTodo ~ todo:`, todo);

    console.log(`🚀 ~ toggleTodo ~ id:`, id, '\ncompleted:', completed);

    router.refresh();

    return todo;
  }; */

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {todos?.map((todo) => (
        <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
      ))}
    </div>
  );
};
