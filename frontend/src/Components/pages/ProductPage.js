import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Badge, Button, ButtonGroup, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import AliceCarousel from 'react-alice-carousel';
import axios from '../../axios';
import Loading from '../Loading';
import SimilarProduct from '../SimilarProduct';
import './ProductPage.css';
import { LinkContainer } from 'react-router-bootstrap';
import ToastMessage from '../ToastMessage';
import { useAddToCartMutation } from '../../services/appApi';
const ProductPage = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const [product, setProduct] = useState(null);
  const [similar, setSimilar] = useState(null);
  const [addToCart,{isSuccess}] = useAddToCartMutation();
 

  const handleDragStart = (e) => e.preventDefault();
  useEffect(() => {
      axios.get(`/product/${id}`).then(({ data }) => {
          setProduct(data.product);
          setSimilar(data.similar);
      });
  }, [id]);


  if (!product) {
    return <Loading />;
  }

  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
  };

  // Ensure product.images is an array
  const images = Array.isArray(product.images) ? product.images.map((picture, index) => (
    <img key={index} className='product__carousel--image' src={picture.url} onDragStart={handleDragStart} />
  )) : [];

  // Ensure similar is an array
  let similarProducts = [];
  if (Array.isArray(similar)) {
    similarProducts = similar.map((product, idx) => (
      <div key={idx} className='item' data-value={idx}>
        <SimilarProduct {...product} />
      </div>
    ));
  }

  return (
    <Container className='pt-4' style={{ position: 'relative' }}>
      <Row>
        <Col lg={6}>
          <AliceCarousel mouseTracking items={images} controlsStrategy='alternate' />
        </Col>
        <Col lg={6} className='pt-4'>
          <p>
            <Badge bg='primary'>{product.category}</Badge>
          </p>
          <p className='product__price'>
            ${product.price}
          </p>
          <p style={{ textAlign: 'justify' }} className='py-3'>
            <strong>Description:</strong> {product.description}
          </p>
          {/* Add to Cart and Edit Product buttons */}
          <ButtonGroup style={{ width: '90%' }}>
            <Form.Select size='lg' style={{ width: '40%', borderRadius: '0' }}>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </Form.Select>
            <Button
              size='lg'
              disabled={!user}
              onClick={() => addToCart({ userId: user._id, productId: id, price: product.price, images: product.images[0].url })}
            >
              Add to Cart
            </Button>
          </ButtonGroup>
          {user && user.isAdmin && (
            <LinkContainer to={`/product/${product._id}/edit`}>
              <Button size='lg'>Edit Product</Button>
            </LinkContainer>
          )}
          {isSuccess && <ToastMessage bg={'info'} title="Added to Cart" body={`${product.name} in your Cart`}/>}
        </Col>
      </Row>
      {/* Similar Products section */}
      <div className="my-4">
        <h2>Similar Products</h2>
        <div className="d-flex justify-content-center align-items-center flex-wrap">
          <AliceCarousel mouseTracking items={similarProducts} responsive={responsive} controlsStrategy="alternate" />
        </div>
      </div>
    </Container>
  );
}

export default ProductPage;
