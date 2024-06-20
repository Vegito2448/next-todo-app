export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { NewTodo, TodosGrid } from '@/components';
import prisma from "@/lib/prisma";


export const metadata = {
  title: 'Server TODOS List',
  description: 'List of all todos in the system',
};


export default async function SeverTodosPage() {
  const todos = await prisma.todo.findMany({
    orderBy: {
      title: 'asc',
    },
  });

  console.log('builded server todos page');


  return (
    <div>
      <span className="text-3xl mb-10">Server Actions</span>
      <div className="w-full px-5 mx-5 mb-5">
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </div>
  );
}