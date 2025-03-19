// src/components/VariantTypeList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom';

const VariantDetails = () => {

    const { id } = useParams();
    // Example data for variant types (size, color, etc.)
    const [variantTypes, setVariantTypes] = useState([]);

    const [newVariantType, setNewVariantType] = useState('');

    const getVariantDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/variant-details?id=${id}`); // Adjust API URL
            console.log(response.data)
            if (response)
                setVariantTypes(response.data.values);
        } catch (error) {
            console.error("Error fetching wood types", error);
        }
    }


    useEffect(() => {
        getVariantDetails();
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
            variantId : id,
            name: newVariantType,
        };

        try {
            // Make an API call to the Spring Boot backend login endpoint
            const response = await axios.post('http://localhost:8080/variantValue', newVariant);
            toast.success("Variant value added")
            if (response) {
                console.log(response)
                // Add the new variant type to the list
                setVariantTypes((prevTypes) => [...prevTypes, newVariant]);
                getVariantDetails();
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
    const handleDeleteVariantType = async (id) => {
        try {
            // Make an API call to the Spring Boot backend login endpoint
            const response = await axios.delete(`http://localhost:8080/delete-variant-value/${id}`);

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

    return (
        <div className="variant-type-list">
           
            {/* Table to display Variant Types */}
            <table>
                <thead>
                    <tr>
                        <th>Variant Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {variantTypes.map((variant) => (
                        <tr key={variant.id}>
                            <td>{variant.name}</td>
                            <td>
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
                <h2>Add New Variant Type</h2>
                <form onSubmit={handleAddVariantType}>
                    <input
                        type="text"
                        value={newVariantType}
                        onChange={(e) => setNewVariantType(e.target.value)}
                        placeholder="Enter variant value (e.g., Size : medium )"
                        required
                    />
                    <button type="submit">Add Variant values</button>
                </form>
            </div>
        </div>
    );
};

export default VariantDetails;
