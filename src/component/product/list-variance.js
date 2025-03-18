// src/components/VariantTypeList.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VariantTypeList = () => {
    const navigate = useNavigate();
    // Example data for variant types (size, color, etc.)
    const [variantTypes, setVariantTypes] = useState([
        { id: 1, name: 'Size' },
        { id: 2, name: 'Color' },
    ]);

    const [newVariantType, setNewVariantType] = useState('');

    // Handle adding new variant type
    const handleAddVariantType = (e) => {
        e.preventDefault();

        if (!newVariantType) {
            alert('Variant type name is required!');
            return;
        }

        // Create a new variant type object
        const newVariant = {
            id: Date.now(), // using timestamp as unique ID
            name: newVariantType,
        };

        // Add the new variant type to the list
        setVariantTypes((prevTypes) => [...prevTypes, newVariant]);

        // Reset the input field
        setNewVariantType('');
    };

    // Handle deleting a variant type
    const handleDeleteVariantType = (id) => {
        const updatedTypes = variantTypes.filter((variant) => variant.id !== id);
        setVariantTypes(updatedTypes);
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
                            <td>{variant.name}</td>
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
