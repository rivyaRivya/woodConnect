// src/components/VariantTypeList.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const VariantTypeList = () => {
    const navigate = useNavigate();
    // Example data for variant types (size, color, etc.)
    const [variantTypes, setVariantTypes] = useState([]);

    const [newVariantType, setNewVariantType] = useState('');

    const listVariant = async() => {
        try {
            // Make an API call to the Spring Boot backend login endpoint
            const response = await axios.get('http://localhost:8080/get-variant');

            if (response) {
                console.log(response)
                setVariantTypes(response.data);
            }
        } catch (error) {
            console.log("rrrrrrrrrrrrrrr")
            toast.error(error);
        }
    }

    useEffect(() => {
        listVariant();
    }, []);  //calling while loading

    // Handle adding new variant type
    const handleAddVariantType = async(e) => {
        e.preventDefault();

        if (!newVariantType) {
            alert('Variant type name is required!');
            return;
        }

        // Create a new variant type object
        const newVariant = {
            name: newVariantType,
        };
        try {
            // Make an API call to the Spring Boot backend login endpoint
            const response = await axios.post('http://localhost:8080/variant', newVariant);
            toast.success("Variant added")
            if (response) {
                console.log(response)
                // Add the new variant type to the list
                setVariantTypes((prevTypes) => [...prevTypes, newVariant]);
                listVariant();
                // Reset the input field
                setNewVariantType('');
            }
        } catch (error) {
            console.log("rrrrrrrrrrrrrrr")
            toast.error(error);
            // Handle login failure
        }
        
    };

    // Handle deleting a variant type
    const handleDeleteVariantType = async(id) => {
        try {
            // Make an API call to the Spring Boot backend login endpoint
            const response = await axios.delete(`http://localhost:8080/delete-variant/${id}`);

            if (response) {
                const updatedTypes = variantTypes.filter((variant) => variant.id !== id);
                setVariantTypes(updatedTypes);
                console.log(response)
            }
        } catch (error) {
            console.log("rrrrrrrrrrrrrrr")
            toast.error(error);
            // Handle login failure
        }
       
    };

    const handleDeleteVariantDetails = (id) => {
        navigate(`/variant-details/${id}`)
    }
    return (
        <div className="variant-type-list">

            {/* Table to display Variant Types */}
            <table className="user-list-table">
                <thead>
                    <tr>
                        <th>Variant Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {variantTypes.map((variant) => (
                        <tr key={variant.id}>
                            <td>{variant.type}</td>
                            <td>
                                <button onClick={() => handleDeleteVariantDetails(variant.id)} className="btn-view wood add">
                                    Details
                                </button>
                                <button onClick={() => handleDeleteVariantType(variant.id)} className="btn-view wood delete">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Form to add new variant type */}
            <div className="add-variant-type-form">
                <h4>Add New Variant Type</h4>
                <form onSubmit={handleAddVariantType}>
                    <input
                        type="text"
                        value={newVariantType}
                        onChange={(e) => setNewVariantType(e.target.value)}
                        placeholder="Enter variant type (e.g., Size, Color)"
                        required
                    />
                    <button type="submit">Add Variant Type</button>
                </form>
            </div>
        </div>
    );
};

export default VariantTypeList;
