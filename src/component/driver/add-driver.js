import React, { useEffect, useState } from 'react';
import './driver.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const AddDriver = () => {
    const { id } = useParams();

    const [buttonLabel, setButtonLabel] = useState("Add Driver");

    const navigate = useNavigate();
    const [driverData, setDriverData] = useState({
        firstname: '',
        lastname:'',
        address: '',
        email: '',
        dob: '',
        phone: '',
        gender: '',
        pin: '',
        district: '',
        type: '',
        password:'',
        
    });

    const getDriverDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/user-details?id=${id}`); // Adjust API URL
            console.log(response.data)
            if (response)
                setDriverData(response.data);
        } catch (error) {
            console.error("Error fetching product types", error);
        }
    }
    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDriverData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const updateDriver = async() => {
        try {
            // Make an API call to the Spring Boot backend login endpoint
            const response = await axios.put(`http://localhost:8080/update-user/${id}`, driverData);
            if (response) {
                console.log(response)
                navigate(`/driver`);
                toast.success("driver data updated");
            }
        } catch (error) {
            console.log("rrrrrrrrrrrrrrr")
            toast.error(error);
            // Handle login failure
        }
    }
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id == 0) {
            try {
                // Make an API call to the Spring Boot backend login endpoint
                driverData.password = driverData.phone;
                driverData.type = "driver";
                const response = await axios.post('http://localhost:8080/user', driverData);

                if (response) {
                    console.log(response)
                    toast.success("Driver added succesfully")
                    // Add the product using the passed onAddProduct function
                    // Reset the form after submission
                    navigate(`/driver`);
                    setDriverData({
                        firstname: '',
                        lastname: '',
                        address: '',
                        email: '',
                        dob: '',
                        phone: '',
                        gender: '',
                        pin: '',
                        district: '',
                        type: '',
                        password: '',
                    });
                }
            } catch (error) {
                console.log("rrrrrrrrrrrrrrr")
                toast.error(error);
                // Handle login failure
            }
        } else {
            updateDriver();
        }
    };

    useEffect(() => {
        console.log("id",id)
        if (id != 0) {
            setButtonLabel("Update");
            getDriverDetails();
        }
    }, []);

    return (
        <div className="driver-form-container">
            <h2>Add New Driver</h2>
            <form onSubmit={handleSubmit} className="driver-form">
                <div className="form-container">
                    <div className="left-section">
                        <div className="form-group">
                            <label htmlFor="firstname">First Name</label>
                            <input
                                type="text"
                                id="firstname"
                                name="firstname"
                                value={driverData.firstname}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="gender">Gender</label>
                            <input
                                type="text"
                                id="gender"
                                name="gender"
                                value={driverData.gender}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                value={driverData.username}
                                onChange={handleChange}
                                required
                                disabled={id != 0 }
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <textarea
                                type="text"
                                id="address"
                                name="address"
                                value={driverData.address}
                                onChange={handleChange}
                                required
                            />
                        </div>
                       

                    </div>

                    <div className="right-section">
                        <div className="form-group">
                            <label htmlFor="lastname">Last Name</label>
                            <input
                                type="text"
                                id="lastname"
                                name="lastname"
                                value={driverData.lastname}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input
                                type="number"
                                id="phone"
                                name="phone"
                                value={driverData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="dob">Age</label>
                            <input
                                type="text"
                                id="dob"
                                name="dob"
                                value={driverData.dob}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="pin">Pin</label>
                            <input
                                type="number"
                                id="pin"
                                name="pin"
                                value={driverData.pin}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="district">District</label>
                            <input
                                type="text"
                                id="district"
                                name="district"
                                value={driverData.district}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        
                    </div>
                </div>

                <button type="submit" className="btn-submit product-button">{buttonLabel}</button>
            </form>

        </div>
    );

}

export default AddDriver;