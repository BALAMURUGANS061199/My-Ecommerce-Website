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
import 'react-alice-carousel/lib/alice-carousel.css';
import { useAddToCartMutation } from '../../services/appApi';
const ProductPage = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const [product, setProduct] = useState(null);
  const [similar, setSimilar] = useState(null);
const [addToCart,{isSuccess,}] =useAddToCartMutation;

  const handleDragStart = (e) => e.preventDefault();

  useEffect(() => {
    axios.get(`/product/${id}`).then((response) => {
      setProduct(response.data.product);
      setSimilar(response.data.similar);
    });
  }, [id]); // Dependency array correctly set to [id]

  if (!product) {
    return <Loading />;
  }

  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
  };

  const images = product.images.map((picture, index) => (
    <img key={index} className='product__carousel--image' src={picture.url} onDragStart={handleDragStart} alt={`Product ${index}`} />
  ));

  let similarProducts = [];
  if (similar) {
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
        {user && user.isAdmin && (
          <div style={{ width: '100%' }}>
            <Form.Select size='lg' style={{ width: '50%', marginRight: '10px' }}>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </Form.Select>
            <Button size='lg' disabled={!user} onClick={()=> addToCart({userId:user._id,productId:id,})} >Add to Cart</Button>
          </div>
        )}
        {user && user.isAdmin && (
          <div className="mt-3">
            <LinkContainer to={`/product/${product._id}/edit`}>
              <Button size='lg'>Edit Product</Button>
            </LinkContainer>
          </div>
        )}
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