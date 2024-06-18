import React from 'react';
import './CartPage.css';
import { useSelector } from 'react-redux';
import { Alert, Col, Container, Row, Table } from 'react-bootstrap';

const CartPage = () => {
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.product);
  const userCartObj = user.cart;
  let cart = products.filter((product) => userCartObj[product._id] != null);

  console.log(cart,'Cart-Value')
  console.log(products,'product-Value')
  console.log(userCartObj,'user-Value')
  return (
    <Container style={{ minHeight: '95vh' }} className='cart-container'>
      <Row>
        <Col md={7}>
          <h1 className='pt-2 h3'>Shopping Cart</h1>
          {cart.length === 0 ? (
            <Alert variant='info'>Shopping Cart is Empty. Add Products to Your Cart</Alert>
          ) : (
            <div>Payment here</div>
          )}
        </Col>
          {cart.length > 0 && (
              <Col md={5}>
            <Table responsive='sm' className='cart-table'>
              <thead>
                <tr>
                  <th>&nbsp;</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr>
                    <td>&nbsp;</td>
                    <td>
                      <i className='fa fa-times' style={{ marginRight: 10, cursor: 'pointer' }}></i>
                      <img src={item.images && item.images.length > 0 ? item.images[0].url : ''} style={{ width: 100, height: 100, objectFit: 'cover' }} alt={item.name} />
                      {item.name}
                    </td>
                    <td>${item.price}</td>
                    <td>{userCartObj[item._id]}</td>
                    <td>${(item.price * userCartObj[item._id]).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
        </Col>
            )}
      </Row>
    </Container>
  );
};

export default CartPage;
