import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';
import * as yup from 'yup';

interface Segments {
  params: {
    id: string;
  };
}


const getTodo = async (id: string) => await prisma.todo.findUnique({
  where: {
    id
  }
});

export async function GET(request: Request, { params: { id } }: Segments) {
  console.log(`🚀 ~ file: route.ts ~ line 3 ~ GET ~ id`, id);

  const todo = await getTodo(id);

  if (!todo) {
    return NextResponse.json({ message: `Todo id: ${id} not found` }, { status: 404 });
  }


  return NextResponse.json(todo);
}

const putSchema = yup.object({
  title: yup.string().optional(),
  description: yup.string().optional(),
  completed: yup.boolean().optional().default(false),
});

export async function PUT(req: Request, { params: { id } }: Segments) {

  const queriedTodo = await getTodo(id);

  console.log(`🚀 ~ PUT ~ queriedTodo:`, queriedTodo);


  if (!queriedTodo) {
    return NextResponse.json({ message: `Todo id: ${id} not found` }, { status: 404 });
  }

  try {
    const {
      title = queriedTodo.title,
      description = queriedTodo.description,
      completed
    } = await putSchema.validate(await req.json());

    const data = {
      title,
      description,
      completed
    };

    const todo = await prisma.todo.update({
      where: {
        id
      },
      data
    });

    return NextResponse.json(todo, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, {
      status: 400
    });
  }

}