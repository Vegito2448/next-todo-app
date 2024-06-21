import { getCookie, hasCookie, setCookie } from "cookies-next";

export const getCookieCart = (): {
  [id: string]: number;
} => {

  if (hasCookie('cart')) {
    const cookieCart = JSON.parse(getCookie('cart') ?? '{}');
    return cookieCart;
  }

  return {};
};

export const addProductToCart = (id: string) => {
  const cookieCart = getCookieCart();

  if (cookieCart[id]) {
    cookieCart[id] += 1;
  } else {
    cookieCart[id] = 1;
  }

  setCookie('cart', JSON.stringify(cookieCart));

};

export const removeProductFromCart = (id: string) => {

  const cookieCart = getCookieCart();

  if (cookieCart[id]) delete cookieCart[id];

  setCookie('cart', JSON.stringify(cookieCart));
};

export const removeSingleProductFromCart = (id: string) => {

  const cookieCart = getCookieCart();

  console.log(`🚀 ~ removeSingleProductFromCart ~ cookieCart:`, cookieCart);

  if (!cookieCart[id]) return;

  if (cookieCart[id] === 1) delete cookieCart[id];

  if (cookieCart[id]) {
    cookieCart[id] -= 1;
  }

  setCookie('cart', JSON.stringify(cookieCart));
};