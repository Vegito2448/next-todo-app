import prisma from "@/lib/prisma";
import { hashSync } from "bcryptjs";
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  await prisma.todo.deleteMany({}); // Delete all todos
  await prisma.user.deleteMany({}); // Delete all users

  const user = await prisma.user.create({
    data: {
      email: 'test1@domain.com',
      name: 'Test User 1',
      password: hashSync('12345678'),
      roles: ['user', 'admin', 'super-user', 'moderator', 'client'],
      todos: {
        create: [
          {
            "title": "delectus aut autem",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            "completed": false
          },
          {
            "title": "quis ut nam facilis et officia qui",
            description: "consectetur adipiscing elit",
            "completed": false
          },
          {
            "title": "fugiat veniam minus",
            description: "Lorem adipiscing elit",
            "completed": false
          },
          {
            "title": "et porro tempora",
            description: "Lorem amet, elit",
            "completed": true
          },
          {
            "title": "laboriosam mollitia et enim quasi adipisci quia provident illum",
            description: "Opsum dolor  adipiscing ",
            "completed": false
          },
          {
            "title": "qui ullam ratione quibusdam voluptatem quia omnis",
            description: "consectetur adipiscing elit",
            "completed": false
          },
          {
            "title": "illo expedita consequatur quia in",
            description: "Ipsum dolor elit",
            "completed": false
          },
        ]
      }
    }
  });



  return NextResponse.json({
    message: 'Seed Executed',
    created: user
  });
}