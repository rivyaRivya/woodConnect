import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './order-details.css';
import axios from 'axios';
import { toast } from 'react-toastify'

const OrderDetails = () => {
    // Access the dynamic 'id' parameter from the URL
    const { id } = useParams();

    // Simulate fetching product details using the `id`
    const [orderDetails, setOrderDetails] = useState(null);
    const [ productData , setProductData ] = useState(null);

    const listOrderDetails = async (e) => {
        try {
            console.log(id);
            // Make an API call to the Spring Boot backend login endpoint
            const response = await axios.get(`http://localhost:8080/get-orderDetails?id=${id}`);


            if (response) {
                console.log(response)
                setOrderDetails(response.data.order);
                setProductData(response.data.product);
            }
        } catch (error) {
            console.log("rrrrrrrrrrrrrrr")
            toast.error(error);
            // Handle login failure
        }
    };

    const [driver, setDrivers] = useState([]);
    const listDriver = async (e) => {
        try {
            // Make an API call to the Spring Boot backend login endpoint
            const response = await axios.get('http://localhost:8080/getUsers');

            if (response) {
                console.log(response)
                const filteredUsers = response.data.filter(user => user.type === 'driver');
                setDrivers(filteredUsers);
            }
        } catch (error) {
            console.log("rrrrrrrrrrrrrrr")
            toast.error(error);
            // Handle login failure
        }
    };
    const updateDriver = async() => {
        try {
            const formData = new FormData();

            formData.append('driver_id', orderDetails.driverId);
            formData.append('deliverydate', orderDetails.deliverydate);
            console.log(formData)
            const response = await axios.put(`http://localhost:8080/update-orderTable/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            if (response) {
                listOrderDetails();
                toast.success("Driver added");
            }
        } catch (error) {
            toast.error(error);
            // Handle login failure
        }
    }
   

    const handleDropdownChange = (e) => {
        console.log(e.target.value);
        orderDetails.driverId = e.target.value;
        console.log(orderDetails)
    };
    // Handle input changes
    const handleChange = (e) => {
        console.log(e.target.value);
        orderDetails.deliverydate = e.target.value;
        console.log(orderDetails)
        
       
    };

    useEffect(() => {
        listOrderDetails();
        listDriver();
    }, []);  //calling while loading

    return (
        <div className="order-details-container">
            <h2 className="order-heading">Order Details</h2>

            {/* Order Information */}
            {orderDetails ? (
                <div className="order-info-container">

                    <div className="order-info">
                        {/* Left Column */}
                        <div className="order-left">
                            <div className="order-info-item">
                                <strong>Order ID:</strong> {orderDetails.id}
                            </div>
                            <div className="order-info-item">
                                <strong>Order Date:</strong> {orderDetails.orderDate}
                            </div>
                            <div className="order-info-item">
                                <strong>Order Status:</strong> {orderDetails.status}
                            </div>
                            <div className="order-info-item">
                                <strong>Payment Status:</strong> {orderDetails.paymentStatus}
                            </div>
                            <div className="order-info-item">
                                <strong>Advanced Amount:</strong> ₹{orderDetails.advanced_amount}
                            </div>
                            <div className="order-info-item">
                                <strong>Total Amount:</strong> ₹{orderDetails.total_amount}
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="order-right">
                            
                            <div className="order-info-item">
                                <strong>Assigned Date:</strong> {orderDetails.assign_date || 'Not set'}
                            </div>
                            <div className="order-info-item">
                                <strong>Ordered By:</strong> {orderDetails.username}
                            </div>
                            <div className="order-info-item">
                                <strong>Assigned To Driver:</strong> {orderDetails.driverName || 'Not set'}
                            </div>

                            <div className="order-info-item">
                                <strong>Delivery Date:</strong>
                                <input
                                    type="orderdetail.deliverydate"
                                    id="orderdetail.deliverydate"
                                    name="orderdetail.deliverydate"
                                    value={orderDetails.deliverydate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="order-info-item">
                                <strong>Assign Driver:</strong>
                                <select
                                    id="woodType_id"
                                    name="woodType_id"
                                    value={productData.woodType_id}
                                    required
                                    className="custom-dropdown"
                                    onChange={handleDropdownChange}
                                >
                                    <option value="">Select Driver</option>
                                    {driver.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.firstname} {user.lastname}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button type="submit" onClick={() => updateDriver()} className="btn-submit product-button assign">Update</button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="loading">Loading order details...</div>
            )}


            {/* Product Information */}
            <div className="product-info">
                <h2 className="section-title">Products</h2>
                {productData && productData.length > 0 ? (
                    <div className="product-list">
                        {productData.map((prod) => (
                            <div key={prod.id} className="product-card">
                                <h3 className="product-title">{prod.productname}</h3>
                                <div className="product-details">
                                    <p><strong>Price:</strong> ₹{prod.price}</p>
                                    <p><strong>Quantity:</strong> {prod.stock}</p>
                                    <p><strong>Manufacture Date:</strong> {prod.manufacture || 'N/A'}</p>
                                    <p><strong>Wood Name:</strong> {prod.woodtypename || 'N/A'}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No products available for this order.</p>
                )}
            </div>
        </div>
    );
};

export default OrderDetails;