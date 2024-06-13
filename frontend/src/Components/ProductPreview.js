import React from 'react';
import { Badge, Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const ProductPreview = ({ _id, category, name, images }) => {
  return (
    <LinkContainer to={`/product/${_id}`} style={{ cursor: 'pointer', margin: '10px' }}>
      <Card style={{ width: '20rem', margin: '30px' }}>
        <Card.Img 
          variant='top' 
          className='product-preview-img' 
          src={images[0].url} 
          style={{ height: '150px', objectFit: 'cover' }} 
        />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Badge bg='warning' text='dark'>{category}</Badge>
        </Card.Body>
      </Card>
    </LinkContainer>
  );
};

export default ProductPreview;
