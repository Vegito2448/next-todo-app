import { Todo } from "@prisma/client";


interface TodosGridProps {
  todos?: Todo[];
}

export const TodosGrid = ({ todos }: TodosGridProps) => {

  // const router = useRouter();

  /* const toggleTodo = async (id: string, completed: boolean) => {
    const todo = await toggleTodoStatus(id, completed);
    console.log(`🚀 ~ toggleTodo ~ todo:`, todo);

    console.log(`🚀 ~ toggleTodo ~ id:`, id, '\ncompleted:', completed);

    router.refresh();

    return todo;
  }; */

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {/* {todos?.map((todo) => (
        <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
      ))} */}
    </div>
  );
};
