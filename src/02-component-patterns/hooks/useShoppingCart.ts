import { useState } from 'react';
import { Product, ProductInCart } from '../interfaces/interfaces';


export const useShoppingCart = () => {

   const [shoppingCart, setShoppingCart] = useState<{ [key: string]: ProductInCart }>({});

   const onProductCountChange = ({ count, product }: { count: number, product: Product }) => {
      setShoppingCart(currentShoppingCart => {
         if (count === 0) {
            const { [product.id]: toDelete, ...rest } = currentShoppingCart;
            return rest;
         }
         return {
            ...currentShoppingCart,
            [product.id]: { ...product, count }
         }
      })
   }

   return {
      shoppingCart,
      setShoppingCart,
      onProductCountChange
   }

}
