// ProductTable.js
import React, { useEffect, useState } from 'react';

import './product.css';

import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Product = () => {
    // Sample data for the table

    const navigate = useNavigate();

    const onEdit = (id) => {
        navigate(`/add-product/${id}`)
    }

    const onDelete = async(id) => {
        try {
            // Make an API call to the Spring Boot backend login endpoint
            const response = await axios.delete(`http://localhost:8080/delete-product/${id}`);

            if (response) {
                console.log(response)
                listProduct();
            }
        } catch (error) {
            console.log("rrrrrrrrrrrrrrr")
            toast.error(error);
            // Handle login failure
        }
    }
   
    const [product, setProducts] = useState([]);
    const listProduct = async (e) => {
        try {
            // Make an API call to the Spring Boot backend login endpoint
            const response = await axios.get('http://localhost:8080/get-product');

            if (response) {
                console.log(response)
                setProducts(response.data);
            }
        } catch (error) {
            console.log("rrrrrrrrrrrrrrr")
            toast.error(error);
            // Handle login failure
        }
    };

    useEffect(() => {
        listProduct();
    }, []);  //calling while loading

    return (
        <div className="table-container">
            <h4>Product List</h4>
            <table className="user-list-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>ManufactureDate</th>
                        <th>Stock</th>
                        <th>WoodTypeName</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {product.length > 0 ? (
                        product.map((product,index) => (
                            <tr key={product.id}>
                                <td>{index+1}</td>
                                <td>{product.productname}</td>
                                <td>{product.price}</td>
                                <td>{product.manufacture}</td>
                                <td>{product.stock}</td>
                                <td>{product.woodtypename}</td>
                                <td>
                                    <button onClick={() => onEdit(product.id)} className="btn-view wood add">Edit</button>
                                    <button onClick={() => onDelete(product.id)} className="btn-view wood delete">Delete</button></td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">No product found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Product;
