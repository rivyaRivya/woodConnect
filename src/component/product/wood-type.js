import React, { useEffect, useState } from 'react';
import './product.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const WoodType = () => {

    const navigate = useNavigate();

    const onEdit = async (wood) => {
        const id = wood.id;
        navigate(`/add-woodtype/${id}`);
    }

    const onDelete = async (id) => {
        console.log(id);
        try {
            // Make an API call to the Spring Boot backend login endpoint
            const response = await axios.delete(`http://localhost:8080/delete-wood-type/${id}`);

            if (response) {
                console.log(response)
                listWood();
            }
        } catch (error) {
            console.log("rrrrrrrrrrrrrrr")
            toast.error(error);
            // Handle login failure
        }
    }

    const [wood, setWoods] = useState([]);
    const listWood = async (e) => {
        try {
            // Make an API call to the Spring Boot backend login endpoint
            const response = await axios.get('http://localhost:8080/wood-type');

            if (response) {
                console.log(response)
                setWoods(response.data);
            }
        } catch (error) {
            console.log("rrrrrrrrrrrrrrr")
            toast.error(error);
            // Handle login failure
        }
    };



    useEffect(() => {
        listWood();
    }, []);  //calling while loading


    return (
        <div className="user-list-container">
            <h4>Wood List</h4>
            <table className="user-list-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Wood Name</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {wood.length > 0 ? (

                        wood.map((wood,index) => (
                            <tr key={wood.id}>
                                <td>{index+1}</td>
                                <td>{wood.woodname}</td>
                                <td>{wood.price}</td>
                                <td>
                                    <button onClick={() => onEdit(wood)} className="btn-view wood add">Edit</button>
                                    <button onClick={() => onDelete(wood.id)} className="btn-view wood delete">Delete</button>
                                </td>

                            </tr>
                        ))

                    ) : (
                        <tr>
                            <td colSpan="5">No wood found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default WoodType;