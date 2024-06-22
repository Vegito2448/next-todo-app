import { getSignedInUser } from "@/actions";
import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';
import * as yup from 'yup';

export async function GET(request: Request) {

  const user = await getSignedInUser();

  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 401 });

  const { searchParams } = new URL(request.url);

  const take = parseInt(searchParams.get('take') ?? '10');

  const skip = parseInt(searchParams.get('skip') ?? '0');

  if (isNaN(+take)) return NextResponse.json({ error: 'Invalid take parameter: ' + take }, { status: 400 });

  if (isNaN(+skip)) return NextResponse.json({ error: 'Invalid skip parameter: ' + skip }, { status: 400 });

  const todos = await prisma.todo.findMany({
    take,
    skip,
    where: {
      userId: user.id
    },
  });

  return NextResponse.json(todos);
}

const postSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().optional().default(''),
  completed: yup.boolean().optional().default(false),
});

export async function POST(req: Request) {
  try {

    const user = await getSignedInUser();

    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 401 });

    const {
      title,
      description,
      completed
    } = await postSchema.validate(await req.json());

    const data = {
      title,
      description,
      completed,
      userId: user.id!
    };

    const todo = await prisma.todo.create({ data });

    return NextResponse.json(todo, { status: 201 });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, {
      status: 400
    });
  }

}

export async function DELETE(req: Request) {

  const user = await getSignedInUser();

  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 401 });

  const deleteAll = await prisma.todo.deleteMany({
    where: {
      completed: true,
      userId: user.id
    }
  });


  return NextResponse.json(deleteAll, { status: 204 });

}