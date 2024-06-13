import React, { useState } from 'react'
import './NewProduct.css'
import { useNavigate } from 'react-router-dom'
import { useCreateProductMutation } from '../../services/appApi'
import { Button, Container, Form, Row, Col, Alert } from 'react-bootstrap'
import axios from 'axios';

const NewProduct = () => {
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const navigate = useNavigate();

    const [imgToRemove, setImgToRemove] = useState(null);
    const [images, setImage] = useState([]);
    const [createProduct, { isError, error, isLoading, isSuccess }] = useCreateProductMutation();

    const handleRemoveTag = (imgObj) => {
        setImgToRemove(imgObj.public_id);
        axios.delete(`/images/${imgObj.public_id}/`).then((res) => {
            setImgToRemove(null);
            setImage((prev) => prev.filter((img) => img.public_id !== imgObj.public_id));
        }).catch((e) => console.log(e));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.values(values).some(value => value === '')) {
            return alert('Please fill out all fields');
        }
        createProduct({ ...values, images: images }).then(({ data }) => {
            setTimeout(() => {
                navigate('/');
            }, 1500);
        }).catch(err => console.log(err));
    };

    const showWidget = () => {
        const widget = window.cloudinary.createUploadWidget(
            {
                cloudName: "ddikij1of",
                uploadPreset: "g62m0ox3",
            },
            (error, result) => {
                if (!error && result.event === "success") {
                    setImage((prev) => [...prev, { url: result.info.url, public_id: result.info.public_id }]);
                }
            }
        );
        widget.open();
    }

    return (
        <Container>
            <Row>
                <Col md={6} className='new-product__form_container'>
                    <Form style={{ width: '100%' }} onSubmit={handleSubmit}>
                        <h1 className='mt-4'>Create new Product</h1>
                        {isSuccess && <Alert variant='success'>Product created successfully!</Alert>}
                        {isError && <Alert variant='danger'>{error.data.message}</Alert>}
                        <Form.Group className='mb-3'>
                            <Form.Label>Enter Product Name</Form.Label>
                            <Form.Control
                                type='text'
                                name='name'
                                value={values.name}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Enter Description</Form.Label>
                            <Form.Control
                                type='text'
                                name='description'
                                style={{ height: "100px" }}
                                value={values.description}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Category</Form.Label>
                            <Form.Select name='category' value={values.category} onChange={handleChange}>
                                <option disabled value=''>Select a category</option>
                                <option value='Technology'>Technology</option>
                                <option value='Laptops'>Laptops</option>
                                <option value='Phones'>Phones</option>
                                <option value='Tablets'>Tablets</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Enter Price</Form.Label>
                            <Form.Control
                                type='text'
                                name='price'
                                value={values.price}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Button type="button" onClick={showWidget}>
                                Upload Images
                            </Button>
                            <div className="images-preview-container">
                                {images.map((img) => (
                                    <div className="image-preview" key={img.public_id}>
                                        <img src={img.url} alt="Uploaded" />
                                        {imgToRemove !== img.public_id && <i className="fa fa-times-circle" onClick={() => handleRemoveTag(img)}></i>}
                                    </div>
                                ))}
                            </div>
                        </Form.Group>
                        <Form.Group>
                            <Button type='submit' disabled={isLoading || isSuccess} variant='success'>Create Product</Button>
                        </Form.Group>
                    </Form>
                </Col>
                <Col md={6} className='new-product__image--container'>
                    {/* Add any additional content here */}
                </Col>
            </Row>
        </Container>
    );
}

export default NewProduct;
