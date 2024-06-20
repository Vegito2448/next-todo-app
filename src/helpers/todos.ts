import { Todo } from "@prisma/client";

export const toggleTodoStatus = async ({ id, completed }: Todo) => {
  const body = JSON.stringify({ completed });
  const todo: Promise<Todo | {
    error: string;
  }> = await fetch(`/api/todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body
  }).then((res) => res.json());

  return todo;
};

export const createTodo = async ({ completed, description, title }: Todo) => {
  const body = JSON.stringify({ completed, description, title });
  const todo: Promise<Todo | {
    error: string;
  }> = await fetch(`/api/todos/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body
  }).then((res) => res.json());

  return todo;
};


export const deleteCompleted = async () => await fetch(`/api/todos/`, {
  method: 'DELETE'
});