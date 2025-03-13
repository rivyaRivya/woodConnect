/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useEffect, useState } from 'react';
import Card from './shared/card';
import { AuthContext } from './auth/authContext';
import './dashboard.css';

import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
	const navigate = useNavigate();
	const [products, setProducts] = useState([]);
	const [count, setCount] = useState({
		order: null,
		customer: null,
		deliveredOrder: null,
		quotation: null
	})
	const { isLoggedIn } = useContext(AuthContext); // Access context
	// Check if context is not undefined
	if (isLoggedIn === undefined) {
		console.error('AuthContext value is undefined');
		return null;
	}

	
	const listProduct = async (e) => {
		try {
			// Make an API call to the Spring Boot backend login endpoint
			const response = await axios.get('http://localhost:8080/get-product');

			if (response) {
				console.log(response)
				const filteredUsers = response.data.filter(user => user.stock <= 0);
				setProducts(filteredUsers);
			}
		} catch (error) {
			console.log("rrrrrrrrrrrrrrr")
			// Handle login failure
		}
	};
	const listCount = async (e) => {
		try {
			// Make an API call to the Spring Boot backend login endpoint
			const response = await axios.get('http://localhost:8080/dashboard/counts');

			if (response) {
				console.log(response)
				setCount(response.data);
			}
		} catch (error) {
			console.log("rrrrrrrrrrrrrrr")
			// Handle login failure
		}
	};
	useEffect(() => {
		listProduct();
		listCount();
	}, []);  //calling while loading
	const onEdit = (id) => {
		navigate(`/add-product/${id}`)
	}

	const onDelete = async (id) => {
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


	return (
		<div>
			<div style={mainStyle}>
				<Card
			image="https://icon-library.com/images/suppliers-icon/suppliers-icon-4.jpg"
					title="Customers"
					description={count.customer} />
			<Card
				image="https://img.freepik.com/premium-vector/orange-round-pie-chart-vector-icon_302321-2461.jpg"
					title="Orders"
					description={count.order}
			/>
			<Card
				image="https://cdn-icons-png.flaticon.com/512/10053/10053703.png"
					title="Delivery"
					description={count.deliveredOrder}
				/>
				
				<Card
					image="https://th.bing.com/th/id/OIP.CZ8ji7JdaByJ-SMuC5S97wHaHa?w=550&h=550&rs=1&pid=ImgDetMain"
					title="Quations"
					description={count.quotation}
				/>

		</div>


		 <div className="table-container">
				<b><h5>Out of stock product</h5></b>
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
						{products.length > 0 ? (
                    products.map((product) => (
						<tr key={product.id}>
							<td>{product.id}</td>
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
								<td colSpan="7">No out of stock product found</td>
							</tr>
						)}
                </tbody>
            </table>
			</div>
		</div>
	);
}
const mainStyle = {

	display: 'flex'
}

export default Dashboard;