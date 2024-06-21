import { ItemCard, Product, WidgetItem, products } from '@/components';
import { cookies } from "next/headers";


export const metadata = {
  title: 'Shopping Cart',
  description: 'Shopping Cart Page for the E-commerce Dashboard',
};

interface ProductInCart {
  product: Product;
  quantity: number;
}

const getProductsInCart = (cart: { [id: string]: number; }) => {
  const productsInCart: ProductInCart[] = [];

  for (const [id, quantity] of Object.entries(cart)) {
    const product = products.find((product) => product.id === id);

    if (product) {
      productsInCart.push({ product, quantity });
    }
  }

  return productsInCart;
};

export default function CartPage() {

  const cookiesStore = cookies();

  const cart = JSON.parse(cookiesStore.get('cart')?.value ?? '{}');

  const productsInCart = getProductsInCart(cart);

  const totalToBePaid = productsInCart.reduce((acc, { product, quantity }) => acc + product.price * quantity, 0);

  return (
    <div>
      <h1
        className="text-4xl font-bold text-center mt-10"
      >Products on the Cart</h1>
      <hr
        className="mb-5"
      />
      <div className="flex flex-col sm:flex-row gap-2 w-full">

        <div className="flex flex-col gap-2 w-full sm:w-8/12">
          {productsInCart.length ?
            productsInCart.map(({ product, quantity }) => (
              <ItemCard
                key={product.id}
                product={product}
                quantity={quantity}
              />
            )) : <h3 className="text-center text-2xl text-gray-600">No products in the cart</h3>
          }
        </div>

        {Boolean(productsInCart.length) && <div className="flex flex-col sm:w-4/12 w-full">
          <WidgetItem title="Total to be Paid" children={
            <>
              <div className="mt-2 flex justify-center gap-4">
                <h3
                  className="text-2xl text-gray-600 text-center"
                >${(totalToBePaid * 1.05).toFixed(2)}</h3>
              </div>
              <span
                className="font-bold text-center text-gray-800"
              >
                Taxation 5% ${(totalToBePaid * 0.05).toFixed(2)}
              </span>
            </>
          } />
        </div>}


      </div>
    </div>
  );
}