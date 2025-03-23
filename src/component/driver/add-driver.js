import React, { useEffect, useState } from 'react';
import './driver.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
//import RNFS from 'react-native-fs';

const AddDriver = () => {
    const { id } = useParams();

    const [buttonLabel, setButtonLabel] = useState("Add Driver");
    const [pdfFile, setPdfFile] = useState(null);
    const [fileName, setFileName] = useState('');
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
            if (response) {
                setDriverData(response.data);

                const blob = new Blob([response.data.file], { type: "application/pdf" });
                const fileURL = URL.createObjectURL(blob);
                setPdfFile(fileURL);
                setFileName("driver_license.pdf"); 
            }
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

    // Handle file selection
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];

        // Check if the selected file is a PDF
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setPdfFile(selectedFile);
            setFileName(selectedFile.name); // Store file name for display
        } else {
            // Handle invalid file type
            alert('Please upload a PDF file.');
        }
    };

    const handleFileUpload = () => {
        //const path = RNFS.DocumentDirectoryPath + '/' + "hhh.pdf";

        //// Write the file to the local storage
        //RNFS.writeFile(path, pdfFile, 'base64');
    };


    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id == 0) {
            try {
                // Make an API call to the Spring Boot backend login endpoint
                driverData.password = driverData.phone;
                driverData.type = "driver";
                if (!pdfFile) {
                    alert('Please upload a License file in pdf format!');
                    return;
                }

                const formData = new FormData();
                formData.append('file', pdfFile);
                formData.append('firstname', driverData.firstname);
                formData.append('lastname', driverData.lastname);
                formData.append('address', driverData.address);
                formData.append('email', driverData.email);
                formData.append('dob', driverData.dob);
                formData.append('phone', driverData.phone);
                formData.append('gender', driverData.gender);
                formData.append('pin', driverData.pin);
                formData.append('district', driverData.district);
                formData.append('type', driverData.type);
                formData.append('password', driverData.password);
                const response = await axios.post('http://localhost:8080/user', formData);

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
                        <div>

                            {pdfFile && (
                                <div>
                                    <h4>Driver License</h4>
                                    <a href={pdfFile} download={fileName}>
                                        <button type="button" className="btn-download">Download File</button>
                                    </a>
                                </div>
                            )}
                            <h4>Upload license in pdf format</h4>

                            {/* File input to select PDF */}
                            <input
                                type="file"
                                onChange={handleFileChange}
                                accept="application/pdf"
                            />

                            {/* Show the file name once a file is selected */}
                            {fileName && <p>Selected file: {fileName}</p>}

                        </div>
                    </div>
                </div>

                <button type="submit" className="btn-submit product-button">{buttonLabel}</button>
            </form>

        </div>
    );

}

export default AddDriver;