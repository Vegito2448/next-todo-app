'use server';
import prisma from "@/lib/prisma";
import { Todo } from '@prisma/client';
import { revalidatePath } from "next/cache";



export const toggleTodo = async ({ id, completed }: Todo) => {

  const todo = await prisma.todo.findFirst({
    where: {
      id
    }
  });

  if (!todo)
    throw new Error(` Todo with id: ${id} not found`);

  const data = { completed };

  const updatedTodo = await prisma.todo.update({
    where: {
      id
    },
    data
  });

  revalidatePath('/dashboard/server-todos');

  return updatedTodo;
};

export const addTodo = async ({ completed, description, title }: Todo) => {
  try {

    const data = {
      title,
      description,
      completed
    };

    const todo = await prisma.todo.create({ data });

    revalidatePath('/dashboard/server-todos');

    return todo;

  } catch (error: any) {
    return {
      error: error.message
    };
  }
};

export const deleteCompleted = async () => {
  try {
    const completed = await prisma.todo.deleteMany({
      where: {
        completed: true
      }
    });

    revalidatePath('/dashboard/server-todos');

    return completed;
  } catch (error: any) {
    return {
      error: error.message
    };
  }
};