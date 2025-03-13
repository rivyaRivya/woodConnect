import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { toast } from 'react-toastify';
import './product.css'
const ReviewRating = () => {
    const [reviewrating, setReviewRatings] = useState([]);
    const listReviewRating = async (e) => {
        try {
            // Make an API call to the Spring Boot backend login endpoint
            const response = await axios.get('http://localhost:8080/get-review');

            if (response) {
                console.log(response)
                setReviewRatings(response.data);
            }
        } catch (error) {
            console.log("rrrrrrrrrrrrrrr")
            toast.error(error);
            // Handle login failure
        }
    };
    useEffect(() => {
        listReviewRating();
    }, []);  //calling while loading

    return (
        <div className="table-container">
            <h4>ReviewRating</h4>
            <table className="user-list-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Review added by</th>
                        <th>Product name</th>
                        <th>Review</th>
                        <th>Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {reviewrating.map((reviewrating,index) => (
                        <tr key={reviewrating.id}>
                            <td>{index+1}</td>
                            <td>{reviewrating.username}</td>
                            <td>{reviewrating.productname}</td>
                            <td>{reviewrating.review}</td>
                            <td>{reviewrating.rating}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReviewRating;