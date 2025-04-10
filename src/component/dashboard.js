/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useEffect, useState } from 'react';
import Card from './shared/card';
import { AuthContext } from './auth/authContext';
import './dashboard.css';

import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Dashboard = () => {
	const navigate = useNavigate();
	const [products, setProducts] = useState([]);
	const [orders, setOrders] = useState([]);
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

	
	const generatePDF = () => {
		const doc = new jsPDF();
		const pageWidth = doc.internal.pageSize.getWidth();
		const margin = 20;
		const usableWidth = pageWidth - margin * 2; // full width minus left/right margins

		// Adjust column proportions (60% for productName, 20% for quantity, 20% for amount)
		const colWidths = {
			productName: usableWidth * 0.6,
			quantity: usableWidth * 0.2,
			amount: usableWidth * 0.2
		};

		let startY = 15;
		const rowHeight = 10;

		doc.setFontSize(16);
		doc.text("Delivered Product Report of March to April", margin, 10);

		doc.setFontSize(12);

		// Header labels
		doc.text("Product Name", margin + 2, startY + 7);
		doc.text("Quantity", margin + colWidths.productName + 2, startY + 7);
		doc.text("Amount", margin + colWidths.productName + colWidths.quantity + 2, startY + 7);

		// Draw header borders
		doc.rect(margin, startY, colWidths.productName, rowHeight);
		doc.rect(margin + colWidths.productName, startY, colWidths.quantity, rowHeight);
		doc.rect(margin + colWidths.productName + colWidths.quantity, startY, colWidths.amount, rowHeight);

		const data = orders;

		startY += rowHeight;

		data.forEach((item) => {
			const productNameLines = doc.splitTextToSize(item.productName.toString(), colWidths.productName - 4);
			const maxLines = productNameLines.length;
			const currentRowHeight = rowHeight * maxLines;

			doc.text(productNameLines, margin + 2, startY + 7);
			doc.text(item.quantity.toString(), margin + colWidths.productName + 2, startY + 7);
			doc.text(item.amount.toString(), margin + colWidths.productName + colWidths.quantity + 2, startY + 7);

			// Draw row borders
			doc.rect(margin, startY, colWidths.productName, currentRowHeight);
			doc.rect(margin + colWidths.productName, startY, colWidths.quantity, currentRowHeight);
			doc.rect(margin + colWidths.productName + colWidths.quantity, startY, colWidths.amount, currentRowHeight);

			startY += currentRowHeight;
		});

		doc.save("delivered-products.pdf");



		};

	
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

	const listOrders = async (e) => {
		try {
			// Make an API call to the Spring Boot backend login endpoint
			const response = await axios.get('http://localhost:8080/get-delivered-orders');

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
		listOrders();
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
				<Card onClick={generatePDF}
				image="https://cdn-icons-png.flaticon.com/512/10053/10053703.png"
					title="Delivery"
					description={count.deliveredOrder}
				/>
				<Card
					image="https://th.bing.com/th/id/OIP.CZ8ji7JdaByJ-SMuC5S97wHaHa?w=550&h=550&rs=1&pid=ImgDetMain"
					title="Quations"
					description={count.quotation}
				/>
				<button
					onClick={generatePDF}
					className="bg-blue-500 text-white px-4 py-2 rounded"
				>
					Download PDF
				</button>

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