import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';
const Driver = () => {

    const navigate = useNavigate();

    const onEdit = (id) => {
        navigate(`/add-driver/${id}`)
    }
    const onDelete = async (id) => {
        try {
            // Make an API call to the Spring Boot backend login endpoint
            const response = await axios.delete(`http://localhost:8080/delete-user/${id}`);

            if (response) {
                console.log(response)
                listDriver();
            }
        } catch (error) {
            console.log("rrrrrrrrrrrrrrr")
            toast.error(error);
            // Handle login failure
        }
    }
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

    useEffect(() => {
        listDriver();
    }, []);  //calling while loading
    return (
        <div className="user-list-container">
            <h4>Driver List</h4>
            <table className="user-list-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Drivername</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Age</th>
                        <th>Pin</th>
                        <th>City</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {driver.length > 0 ? (

                        driver.map((driver,index) => (
                            <tr key={driver.id}>
                                <td>{index+1}</td>
                                <td>{driver.firstname} {driver.lastname}</td>
                                <td>{driver.username}</td>
                                <td>{driver.address}</td>
                                <td>{driver.phone}</td>
                                <td>{driver.dob}</td>
                                <td>{driver.pin}</td>
                                <td>{driver.district}</td>
                                <td>
                                    <button onClick={() => onEdit(driver.id)} className="btn-view wood add">Edit</button>
                                    <button onClick={() => onDelete(driver.id)} className="btn-view wood delete">Delete</button>
                                </td>
                            </tr>
                        ))

                    ) : (
                        <tr>
                            <td colSpan="5">No users found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Driver;