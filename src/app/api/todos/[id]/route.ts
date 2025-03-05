import { getSignedInUser } from "@/actions";
import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';
import * as yup from 'yup';

interface Segments {
  params: Promise<{
    id: string;
  }>;
}


const getTodo = async (id: string) => {
  try {

    const user = await getSignedInUser();

    if (!user) throw new Error('User not found');

    const todo = await prisma.todo.findFirst({
      where: {
        id
      }
    });

    if (todo?.userId !== user.id) throw new Error('Unauthorized access to todo item');

    return todo;

  } catch (error: any) {
    return error;
  }

};

export async function GET(request: Request, props: Segments) {
  const params = await props.params;

  const {
    id
  } = params;

  try {

    const todo = await getTodo(id);

    if (!todo) {
      return NextResponse.json({ message: `Todo id: ${id} not found` }, { status: 404 });
    }


    return NextResponse.json(todo, { status: 200 });

  } catch (error: any) {

    return NextResponse.json({ error: error?.message }, { status: 400 });

  }
}

const putSchema = yup.object({
  title: yup.string().optional(),
  description: yup.string().optional(),
  completed: yup.boolean().optional().default(false),
});

export async function PUT(req: Request, props: Segments) {
  const params = await props.params;

  const {
    id
  } = params;

  const user = await getSignedInUser();

  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 401 });

  const queriedTodo = await getTodo(id);

  if (!queriedTodo) {
    return NextResponse.json({ message: `Todo id: ${id} not found` }, { status: 404 });
  }

  if (queriedTodo.userId !== user.id) return NextResponse.json({ error: 'Unauthorized access to todo item' }, { status: 401 });

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