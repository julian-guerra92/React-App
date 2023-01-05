import { useState } from 'react';
import { Product, ProductInCart } from '../interfaces/interfaces';


export const useShoppingCart = () => {

   const [shoppingCart, setShoppingCart] = useState<{ [key: string]: ProductInCart }>({});

   const onProductCountChange = ({ count, product }: { count: number, product: Product }) => {
      setShoppingCart(currentShoppingCart => {
         const productInCart: ProductInCart = currentShoppingCart[product.id] || { ...product, count: 0 };
         //*Agregar el producto
         if (Math.max(productInCart.count + count, 0) > 0) {
            productInCart.count += count;
            return {
               ...currentShoppingCart,
               [product.id]: productInCart
            }
         }
         //*Borrar el producto
         const { [product.id]: toDelete, ...rest } = currentShoppingCart;
         return rest;
         /* 
         Implementación inicial
         if (count === 0) {
            const { [product.id]: toDelete, ...rest } = currentShoppingCart;
            return rest;
         }
         return {
            ...currentShoppingCart,
            [product.id]: { ...product, count }
         */
      })
   }

   return {
      shoppingCart,
      setShoppingCart,
      onProductCountChange
   }

}
