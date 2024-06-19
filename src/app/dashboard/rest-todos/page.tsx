import { NewTodo, TodosGrid } from '@/components';
import prisma from "@/lib/prisma";


export const metadata = {
  title: 'TODOS List',
  description: 'List of all todos in the system',
};

export default async function RestTodosPage() {
  const todos = await prisma.todo.findMany({
    orderBy: {
      description: 'asc',
    },
  });

  console.log(`🚀 ~ RestTodosPage ~ todos:`, todos);


  return (
    <div>
      <div className="w-full px-5 mx-5 mb-5">
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </div>
  );
}