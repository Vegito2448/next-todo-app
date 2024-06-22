import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import { compareSync, hashSync } from "bcryptjs";

export const getSignedInUser = async () => {
  const session = await auth();

  return session?.user;
};

export const customSignIn = async ({ email, password }: User) => {
  if (!email || !password) throw new Error('Email and password are required.');

  let user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    user = await createUser({ email, password } as User);

    return user;
  }

  if (!compareSync(password, user.password ?? '')) throw new Error('Invalid password.');

  return user;
};

const createUser = async ({ email, password = '' }: User) => {
  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashSync(password ?? ''),
      name: email.split('@')[0],
    },
  });

  return newUser;
};