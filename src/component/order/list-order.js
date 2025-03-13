import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';

const ListOrder = () => {
    const onEdit = () => {

    }

    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const listOrders = async (e) => {
        try {
            // Make an API call to the Spring Boot backend login endpoint
            const response = await axios.get('http://localhost:8080/get-orders');

            if (response) {
                console.log(response)
                setOrders(response.data);
            }
        } catch (error) {
            console.log("rrrrrrrrrrrrrrr")
            toast.error(error);
            // Handle login failure
        }
    };

    const handleRowClick = (id) => {
        navigate(`/order/${id}`);
    }

    useEffect(() => {
        listOrders();
    }, []);  //calling while loading
    return (
        <div className="table-container">
            <h4>Order List</h4>
            <table className="product-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Order Date</th>
                        <th>Booked By</th>
                        <th>Order Status</th>
                        <th>Payment Status</th>
                        <th>Total Amount</th>
                        <th>Advanced Amount</th>
                        <th>Assigned driver</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 ? (
                    orders.map((order,index) => (
                        <tr key={order.id} onClick={()=>handleRowClick(order.id) }>
                            <td>{index+1}</td>
                            <td>{order.orderDate}</td>
                            <td>{order.username}</td>
                            <td>{order.status}</td>
                            <td>{order.paymentStatus}</td>
                            <td>{order.total_amount}</td>
                            <td>{order.advanced_amount}</td>
                            <td>{order.driverName}</td>
                            <td>
                                <button onClick={() => onEdit(order.id)} className="btn-view order wood add">View</button></td>
                            
                        </tr>
                    ))) : (
                        <tr>
                            <td colSpan="9">No order found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ListOrder;