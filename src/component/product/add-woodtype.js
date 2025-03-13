import React, { useEffect, useState } from 'react';
import './addProduct.css'
import axios from 'axios';
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const AddWoodType = () => {

    // Access the dynamic 'id' parameter from the URL
    const { id } = useParams();
    const [woodData, setWoodData] = useState({
        woodname: '',
        price: '',
    });
    const [buttonLabel, setButtonLabel] = useState("Add Wood");

    const navigate = useNavigate();
    const getWoodDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/woodType-details?id=${id}`); // Adjust API URL
            console.log(response.data)
            if (response)
                setWoodData(response.data);
            console.log("ssssssssssss", woodData);
        } catch (error) {
            console.error("Error fetching wood types", error);
        }
    }

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setWoodData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id == 0) {

            // Add the product using the passed onAddProduct function
            // Reset the form after submission
            try {
                // Make an API call to the Spring Boot backend login endpoint
                const response = await axios.post('http://localhost:8080/wood-type', woodData);
                toast.success("Wood added")
                if (response) {
                    console.log(response)
                    navigate(`/wood-type`);
                    setWoodData({
                        woodname: null,
                        price: null
                    });
                }
            } catch (error) {
                console.log("rrrrrrrrrrrrrrr")
                toast.error(error);
                // Handle login failure
            }
        } else {
            onUpdate();
        }
    };

    const onUpdate = async () => {
        try {
            // Make an API call to the Spring Boot backend login endpoint
            const response = await axios.put(`http://localhost:8080/wood-type/${id}`, woodData);
            if (response) {
                console.log(response)
                navigate(`/wood-type`);
                toast.success("Wood data updated");
            }
        } catch (error) {
            console.log("rrrrrrrrrrrrrrr")
            toast.error(error);
            // Handle login failure
        }
    }
    useEffect(() => {
        if (id != 0) {
            setButtonLabel("Update");
            getWoodDetails();
        }
    }, []);

    return (
        <div className="product-form-container">
            <h2>Add New Wood</h2>
            <form onSubmit={handleSubmit} className="product-form">
                <div className="form-group">
                    <label htmlFor="name">Wood Name</label>
                    <input
                        type="text"
                        id="woodname"
                        name="woodname"
                        value={woodData.woodname}
                        onChange={handleChange}
                        required
                        disabled={id != 0} 
                    />
                    </div>
                <div className="form-group">
                    <label htmlFor="price">Wood Price</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={woodData.price}
                        onChange={handleChange}
                        required
                    />
               </div>
                <button type="submit" className="btn-submit product-button">{buttonLabel}</button>
            </form>
        </div>
    );

}

export default AddWoodType;