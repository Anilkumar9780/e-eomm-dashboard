import React, { useState, useEffect } from 'react';

//package
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

//component
import { DELETE_PRODUCT, GET_PRODUCTS_LIST } from './../service/Service';

const ProductsList = () => {
    const [products, setProducts] = useState([]);

    // use of useEffect  for onMount 
    //Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        getProductsList();
    }, [])

    /**
     * get all products list
     */
    const getProductsList = async () => {
        try {
            let { data } = await GET_PRODUCTS_LIST();
            setProducts(data)
        } catch ({
            // Destructuring
            data: { error: { message = "" } },
        }) {
            toast.error(message, {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
    };

    /**
     * delete product
     * @param {string} id 
     */
    const deleteProduct = async (id) => {
        try {
            let { data } = await DELETE_PRODUCT(id);
            if (data) {
                toast.success("Product Delete successfully", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
                getProductsList();
            }
        } catch ({
            // Destructuring
            data: { error: { message = "" } },
        }) {
            toast.error(message, {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
    };


    /**
     * Search product by name cate companyname
     * @param {object} event 
     */
    const handleSearch = async (event) => {
        let key = event.target.value;
        try {
            if (key) {
                let result = await fetch(`http://localhost:5000/search/${key}`, {
                    headers: {
                        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
                    }
                });
                result = await result.json()
                if (result) {
                    setProducts(result)
                }
            } else {
                getProductsList();
            }
        } catch ({
            // Destructuring
            result: { error: { message = "" } },
        }) {
            toast.error(message, {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
    };

    return (
        <div className='product-list'>
            <h3>Products List</h3>
            {/* search box  */}
            <input
                type='text'
                className='search-box'
                placeholder='Search by product name, product company, product category'
                onChange={handleSearch}
            />
            <ul>
                <li>Sr.No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Operation</li>
            </ul>
            {/* mapping prouct list */}
            {
                products.length > 0 ? products.map((item, index) =>
                    <ul key={index}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li style={{ cursor: "pointer" }}>
                            {/* delete button */}
                            <i onClick={() => deleteProduct(item._id)} className="fa fa-trash"></i>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            {/* edit button */}
                            <Link to={'/update/' + item._id}><i className="fa fa-edit"></i></Link>
                        </li>
                    </ul>
                ) :
                    <>
                        <h3>No result Found</h3>
                    </>
            }
        </div>
    );
}

export default ProductsList;
