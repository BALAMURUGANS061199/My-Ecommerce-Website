import React from 'react'
import './CartPage.css'
import { useSelector } from 'react-redux'
import { Alert, Container, Row } from 'react-bootstrap'
const CartPage = () => {
    const user = useSelector((state)=> state.user)
    const product = useSelector((state)=> state.product)
    const userCartObj = user.cart;
    let cart =product.filter((product)=> userCartObj[product._id] != null);

  return (
    <Container style={{minHeight:'95vh'}} className='cart-container'>
<Row>
  <h1 className='pt-2 h3'>Cart Page</h1>
  {cart.length === 0 ? (
    <Alert variant='info'>Shopping Cart is Empty. Add Products to Your Cart</Alert>
  ):(
    <h1></h1>
  )}
</Row>
    </Container>
  )
}

export default CartPage
