import React, { useState } from 'react';

//package
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate()

    /**
     * add product 
     */
    const handleAddProduct = async () => {
        if (!name || !price || !category || !company) {
            setError(true);
            return false
        }
        const userId = JSON.parse(localStorage.getItem("user"))._id;
        let product = await fetch('http://localhost:5000/add-product', {
            method: 'post',
            body: JSON.stringify({ name, price, category, company, userId }),
            headers: {
                'Content-Type': 'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
            },
        });
        product = await product.json();
        console.log(product);
        toast.success("Add Product successfully", {
            position: toast.POSITION.BOTTOM_RIGHT,
        });
        navigate('/');
        setName('');
        setPrice('');
        setCategory('');
        setCompany('');
    };

    return (
        <div className='register-from'>
            <h1>Add Product</h1>
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
                type='text'
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
                onClick={handleAddProduct}
                className='signupbutton'
                type='button'
            >
                Add Product
            </button>
        </div>
    );
}

export default AddProduct;
