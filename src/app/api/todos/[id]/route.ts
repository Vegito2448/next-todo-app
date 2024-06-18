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
  title: yup.string().required(),
  description: yup.string().optional().default(''),
  completed: yup.boolean().optional().default(false),
});

export async function PUT(req: Request, { params: { id } }: Segments) {

  const todo = await getTodo(id);

  if (!todo) {
    return NextResponse.json({ message: `Todo id: ${id} not found` }, { status: 404 });
  }

  try {
    const {
      title,
      description,
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
    return NextResponse.json({ message: error.message }, {
      status: 400
    });
  }

}