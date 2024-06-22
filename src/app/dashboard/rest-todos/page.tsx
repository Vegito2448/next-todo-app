export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { getSignedInUser } from "@/actions";
import { NewTodo, TodosGrid } from '@/components';
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";


export const metadata = {
  title: 'TODOS List',
  description: 'List of all todos in the system',
};

export default async function RestTodosPage() {
  const user = await getSignedInUser();

  if (!user) {
    redirect("/api/auth/signin");
  }

  const todos = await prisma.todo.findMany({
    where: {
      userId: user.id
    },
    orderBy: {
      title: 'asc',
    },
  });

  return (
    <div>
      <div className="w-full px-5 mx-5 mb-5">
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </div>
  );
}