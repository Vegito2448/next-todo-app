"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const getCookieCart = async (): Promise<{ [id: string]: number }> => {
  const cookieStore = await cookies();
  const hasCookie = cookieStore.has("cart");
  if (hasCookie) {
    const cookieCart = JSON.parse(cookieStore.get("cart")?.value ?? "{}");
    return cookieCart;
  }

  return {};
};

export const addProductToCart = async (id: string) => {
  const cookieCart = await getCookieCart();
  const cookieStore = await cookies();

  if (cookieCart[id]) {
    cookieCart[id] += 1;
  } else {
    cookieCart[id] = 1;
  }

  cookieStore.set("cart", JSON.stringify(cookieCart));
  revalidatePath("/products");
  revalidatePath("/cart");
};

export const removeProductFromCart = async (id: string) => {
  const cookieCart = await getCookieCart();
  const cookieStore = await cookies();
  if (cookieCart[id]) delete cookieCart[id];

  cookieStore.set("cart", JSON.stringify(cookieCart));
  revalidatePath("/products");
  revalidatePath("/cart");
};

export const removeSingleProductFromCart = async (id: string) => {
  const cookieCart = await getCookieCart();
  const cookieStore = await cookies();

  if (!cookieCart[id]) return;

  if (cookieCart[id] === 1) delete cookieCart[id];

  if (cookieCart[id]) {
    cookieCart[id] -= 1;
  }

  cookieStore.set("cart", JSON.stringify(cookieCart));
  revalidatePath("/products");
  revalidatePath("/cart");
};
