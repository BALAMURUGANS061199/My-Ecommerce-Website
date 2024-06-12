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
    const [image, setImage] = useState([]);
    const [createProduct, { isError, error, isLoading, isSuccess }] = useCreateProductMutation();

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     createProduct(values);
    // }


    const handleRemoveTag=(imgobj)=>{
        imgToRemove(imgobj.public_id)
        axios.delete(`/images/${imgobj.public_id}/`).then((res)=>{
            setImgToRemove(null)
            setImage(prev =>prev.filter((img)=> img.public_id !== imgobj.public_id))
        }).catch((e)=> console.log(e))
    }



    const handleSubmit=(e) =>{
        e.preventDefault();
        if(!values){
            return alert('Please Fill out the Fields')
        }
        createProduct(...values,image).then(({data})=>{
            setTimeout(()=>{
                navigate('/')
            },1500)
        })
    }
    function showWidget() {
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
                        <h1>Create new Product</h1>
                        {isSuccess && <Alert variant='success'></Alert>}
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
                                {image.map((image) => (
                                    <div className="image-preview">
                                        <img src={image.url} />
                                        {imgToRemove != image.public_id && <i className="fa fa-times-circle" onClick={() => handleRemoveTag(image)}></i>}
                                    </div>
                                ))}
                            </div>
                        </Form.Group>
                        <Form.Group>
                            <Button type='submit' disabled={isLoading || isSuccess} variant='success'>Create Product</Button>
                        </Form.Group>
                    </Form>
                </Col>
                <Col md={6} className='new-product__image_container'>
                    {/* Add any additional content here */}


                </Col>
            </Row>
        </Container>
    )
}

export default NewProduct;
