import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ListQuotation = () => {
    const [quotations, setQuotation] = useState([]);
    const navigate = useNavigate();
    const listQuotation = async (e) => {
        try {
            // Make an API call to the Spring Boot backend login endpoint
            const response = await axios.get('http://localhost:8080/list-quotation');

            if (response) {
                console.log(response)
                setQuotation(response.data);
            }
        } catch (error) {
            console.log("rrrrrrrrrrrrrrr")
            toast.error(error);
            // Handle login failure
        }
    };
    useEffect(() => {
        listQuotation();
    }, []);  //calling while loading
    const handleRowClick = (id) => {
        navigate(`/quotation/${id}`);
    }
    return (
        <div className="user-list-container">
            <h4>Quotations</h4>
            <table className="user-list-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Mobile</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {quotations.length > 0 ? (

                        quotations.map((user,index) => (
                            <tr key={user.id} onClick={() => handleRowClick(user.id)}>
                                <td>{index+1}</td>
                                <td>{user.username}</td>
                                <td>{user.mobile}</td>
                                <td>{user.status}</td>
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

export default ListQuotation;