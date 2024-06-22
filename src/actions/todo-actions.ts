'use server';
import prisma from "@/lib/prisma";
import { Todo } from '@prisma/client';
import { revalidatePath } from "next/cache";
import { getSignedInUser } from "./auth-actions";

export const toggleTodo = async ({ id, completed }: Todo) => {

  const user = await getSignedInUser();

  if (!user) throw new Error('User not found');

  const todo = await prisma.todo.findFirst({
    where: {
      id,
      userId: user.id
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

    const user = await getSignedInUser();

    if (!user) throw new Error('User not found');

    const data = {
      title,
      description,
      completed,
      userId: user.id!
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

    const user = await getSignedInUser();

    if (!user) throw new Error('User not found');

    const completed = await prisma.todo.deleteMany({
      where: {
        completed: true,
        userId: user.id
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