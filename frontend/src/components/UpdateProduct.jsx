/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';

//package
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [error, setError] = useState(false);
    const param = useParams();
    const navigate = useNavigate();

    //  use of useEffect  for onMount 
    useEffect(() => {
        getProductDetails()
    }, []);

    /**
     * edit product data and set the item input text
     */
    const getProductDetails = async () => {
        try {
            let result = await fetch(`http://localhost:5000/product/${param.id}`, {
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
                },
            });
            result = await result.json();
            setName(result.name);
            setPrice(result.price);
            setCategory(result.category);
            setCompany(result.company);
        } catch ({
            // Destructuring
            result: { error: { message = "" } },
        }) {
            toast.error(message, {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
    }

    /**
     * update product data 
     */
    const handleUpdateProduct = async () => {
        if (!name || !price || !category || !company) {
            setError(true);
            return false
        }
        try {
            let product = await fetch(`http://localhost:5000/product/${param.id}`, {
                method: 'put',
                body: JSON.stringify({ name, price, category, company }),
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
                },
            });
            product = await product.json();
            console.log(product);
            navigate("/");
            toast.success(" Update successfully", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        } catch ({
            // Destructuring
            product: { error: { message = "" } },
        }) {
            toast.error(message, {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
    };

    return (
        <div className='register-from'>
            <h1>Update Product</h1>
            <input
                className='inputbox'
                type='text'
                placeholder='Enter Product Name'
                value={name}
                onChange={(event) => setName(event.target.value)}
            />
            {error && !name && <span className='invalid-msg'>Product Name is require</span>}
            <input
                className='inputbox'
                type='number'
                placeholder='Enter Product Price'
                value={price}
                onChange={(event) => setPrice(event.target.value)}
            />
            {error && !price && <span className='invalid-msg'>Product Price is require</span>}
            <input
                className='inputbox'
                type='text'
                placeholder='Enter Product Category'
                value={category}
                onChange={(event) => setCategory(event.target.value)}
            />
            {error && !category && <span className='invalid-msg'>Product category is require</span>}
            <input
                className='inputbox'
                type='text'
                placeholder='Enter Product Company Name'
                value={company}
                onChange={(event) => setCompany(event.target.value)}
            />
            {error && !category && <span className='invalid-msg'>Product company is require</span>}
            <button
                onClick={handleUpdateProduct}
                className='signupbutton'
                type='button'
            >
                Update Product
            </button>
        </div>
    );
}

export default UpdateProduct;
