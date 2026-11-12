/**
 * CONTEXTO: Página /cart: decide entre CartView y EmptyCart según el contenido del contexto.
 */
import React, { useContext } from 'react'
import CartView from './CartView'
import { CartContext } from '../context/CartContext'
import EmptyCart from './EmptyCart'

const CartContainer = () => {
    const {cart}= useContext(CartContext)
  return (
    <>
       {cart.length > 0 ? <CartView/> : <EmptyCart/>}
    </>
  )
}

export default CartContainer