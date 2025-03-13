import React, { useEffect, useState } from 'react';
import './quotation.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';
const AddQuotation = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
            username: '',
            phone: '',
            email: '',
            description: '',
            image: null,
            response: ''
        });

    const [imageURL, setImageURL] = useState(null);
        // Handle input change for text fields
        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData({
                ...formData,
                [name]: value
            });
        };

    const listQuotationDetails = async (e) => {
        try {
            console.log(id);
            // Make an API call to the Spring Boot backend login endpoint
            const response = await axios.get(`http://localhost:8080/quotation-details?id=${id}`);
            setImageURL(`data:image/png;base64,${response.data.image}`);
            if (response) {
                console.log(response)
                setFormData(response.data);
                console.log(formData)
            }
        } catch (error) {
            console.log("rrrrrrrrrrrrrrr")
            toast.error(error);
            // Handle login failure
        }
    };

    useEffect(() => {
        listQuotationDetails();
    }, []);  //calling while loading

    const handleAccept = () => {
        updateStatus("Accepted");
    }
    const handleReject = () => {
        updateStatus("Rejected");
    }

    const updateStatus =async (status) => {
        try {
            // Make an API call to the Spring Boot backend login endpoint
            formData.status = status;
            console.log(formData)
            const response = await axios.put(`http://localhost:8080/update-quotation/${id}`, formData);
            if (response) {
                console.log(response);
                if(status == "Accepted")
                    toast.success("Quotation response send");
                else
                    toast.success("Quotation rejected");

                navigate('/list-quotation')
            }
        } catch (error) {
            console.log("rrrrrrrrrrrrrrr")
            toast.error(error);
            // Handle login failure
        }
    }
        return (
            <div className="quotation-form-container">
                <h2> Quotation Details</h2>
                <form  className="quotation-form">
                    {/* Username */}
                    <div className="form-group">
                        <label htmlFor="username">Name</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            disabled
                        />
                    </div>

                    {/* Phone */}
                    <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={formData.mobile}
                            onChange={handleChange}
                            required
                            disabled
                        />
                    </div>

                    {/* Email */}
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            disabled
                        />
                    </div>

                    {/* Quotation Description */}
                    <div className="form-group">
                        <label htmlFor="description">Quotation Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            disabled
                        />
                    </div>

                    {/* Image Upload */}
                    {formData.image && (
                    <div className="form-group">
                        <label htmlFor="image">Uploaded Image</label>

                        
                            <div>
                                <h4>Image Preview:</h4>
                                <img
                                    src={imageURL}
                                    alt="Preview"
                                    style={{ width: '200px', height: 'auto' }}
                                />
                            </div>
                        
                        </div>)}

                    {/* Response Text Area */}
                    <div className="form-group">
                        <label htmlFor="response">Response to Quotation</label>
                        <textarea
                            id="response"
                            name="response"
                            value={formData.response}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="button-group">
                        <button onClick={handleAccept} type="button" className="btn-accept">
                            Accept
                        </button>
                        <button onClick={handleReject} type="button" className="btn-reject delete">
                            Reject
                        </button>
                    </div>
                </form>
            </div>
        );
    }

export default AddQuotation;