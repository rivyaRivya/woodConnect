import React, { useEffect, useState } from 'react';

import './customer.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const Customer = () => {
 
    const [users, setUsers] = useState([]);
    const listCustomer = async (e) => {
            try {
                // Make an API call to the Spring Boot backend login endpoint
                const response = await axios.get('http://localhost:8080/getUsers');
                
                if (response) {
                    console.log(response)
                    const filteredUsers = response.data.filter(user => user.type === 'user');
                    setUsers(filteredUsers);
                }
            } catch (error) {
                console.log("rrrrrrrrrrrrrrr")
                toast.error(error);
                // Handle login failure
            }
    };

    useEffect(() => {
        listCustomer();
    }, []);  

    return (
        <div className="user-list-container">
            <h2>User List</h2>
            <table className="user-list-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Pin</th>
                        <th>District</th>
                        <th>Phone</th>
                        <th>Gender</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (

                        users.map((user,index) => (
                            <tr key={user.id}>
                                <td>{index+1}</td>
                                <td>{user.firstname} {user.lastname}</td>
                                <td>{user.username}</td>
                                <td>{user.address}</td>
                                <td>{user.pin}</td>
                                <td>{user.district}</td>
                                <td>{user.phone}</td>
                                <td>{user.gender}</td>
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

export default Customer;