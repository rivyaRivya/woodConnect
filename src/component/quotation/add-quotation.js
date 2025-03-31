import React, { useEffect, useState } from 'react';
import './quotation.css';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddQuotation = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        mobile: '',
        email: '',
        description: '',
        image: null,
        response: '',
        quantity: '',
        woodName: '',
        woodPrice: '',
        woodTypeId:'',
        color: '',
        status: '',
        woodType:'',
        productName: '',
        manufacturingCost: '',
        dimensions: '',
        totalPrice: '',
        discount: '',
        productName:''
    });
    const [imageURL, setImageURL] = useState(null);
    const [woodTypes, setWoodTypes] = useState([]);
    useEffect(() => {
        const listQuotationDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/quotation-details?id=${id}`);
                setImageURL(`data:image/png;base64,${response.data.image}`);
                if (response) {
                    setFormData(response.data);
                    calculatePrice(response.data);
                }
            } catch (error) {
                toast.error("Error fetching quotation details");
            }
        };
        listQuotationDetails();
        listWoodTye();
    }, [id]);


    const listWoodTye = async() => {
        try {
            const response = await axios.get('http://localhost:8080/wood-type'); // Adjust API URL
            if (response)
                setWoodTypes(response.data);
        } catch (error) {
            console.error("Error fetching wood types", error);
        }
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log("hhh", e.target, name)
        setFormData((prevData) => {
            const updatedData = {
                ...prevData,
                [name]:value,
            };

            // Call calculatePrice whenever relevant fields change
            if (["manufacturingCost", "dimensions", "woodPrice", "discount","quantity"].includes(name)) {
                calculatePrice(updatedData);
            }

            return updatedData;
        });
    };

    const updateStatus = async (status) => {
        try {
            formData.status = status;
            const response = await axios.put(`http://localhost:8080/update-quotation/${id}`, formData);
            if (response) {
                toast.success(status === "Accepted" ? "Quotation accepted" : "Quotation rejected");
                navigate('/list-quotation');
            }
        } catch (error) {
            toast.error("Error updating quotation status");
        }
    };


    const calculatePrice = (data) => {
        console.log("uuu")
        const { manufacturingCost, dimensions, woodPrice, discount, quantity } = data;
        let woodPrices = parseFloat(woodPrice);
        let quantityy = parseInt(quantity);
        let manufacturing = parseFloat(manufacturingCost) || 0;
        let dimPattern = /^\d+(\.\d+)?\*\d+(\.\d+)?\*\d+(\.\d+)?$/;


        if (!dimPattern.test(dimensions)) {
            //setTotalPrice("Invalid format");
            setFormData(prevData => ({
                ...prevData,
                totalPrice: "Invalid format"
            }));
            return;
        }

        let [L, H, W] = dimensions.split("*").map(Number);
        let volume = (L * H * W) / 28316.85;
        console.log(volume, manufacturing, woodPrices)
        let total = (woodPrices * volume * quantityy) + manufacturing;

        // Apply discount if available
        let discountAmount = parseFloat(discount) || 0;
        total = total - discountAmount;
        setFormData(prevData => ({
            ...prevData,
            totalPrice: `₹${total.toFixed(2)}`
        }));
    };

    const handleChanges = () => {

    }

    return (
        <div className="quotation-container">
            <div className="quotation-content split-container">
                {/* Left Section */}
                <div className="left-section">
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" name="username" disabled value={formData.username} disabled />
                    </div>
                    <div className="form-group">
                        <label>Phone</label>
                        <input type="text" name="phone" disabled value={formData.mobile} disabled />
                    </div>
                    <div className="form-group">
                        <label>Wood Name</label>
                        <input type="email" name="email" disabled value={formData.woodName} disabled />
                    </div>
                    <div className="form-group">
                        <label>Quantity</label>
                        <input type="email" name="email" disabled value={formData.quantity} disabled />
                    </div>
                    {/*<div className="form-group">*/}
                    {/*    <label>Color</label>*/}
                    {/*    <input type="email" name="email" disabled value={formData.color} disabled />*/}
                    {/*</div>*/}
                </div>

                {/* Right Section */}
                <div className="right-section">
                    <div className="form-group">
                        <label>Quotation Description</label>
                        <textarea name="description" disabled value={formData.description} disabled />
                    </div>
                    {imageURL && (
                        <div className="form-group">
                            <label>Uploaded Image</label>
                            <div className="images">
                                <img src={imageURL} alt="Preview" className="image-preview" />
                            </div>
                        </div>
                    )}
                </div>
            </div>



            <div>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">Product Name</th>
                            <th className="border p-2">Wood Type</th>
                            <th className="border p-2">Manufacturing Cost</th>
                            <th className="border p-2">Dimensions (L*H*T)</th>
                            <th className="border p-2">Discount (%)</th> {/* New column for Discount */}
                            <th className="border p-2">Quantity</th>
                            <th className="border p-2">Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border p-2">
                                <input
                                    type="text"
                                    id="productName"
                                    name="productName"
                                    value={formData.productName}
                                    disabled
                                    onChange={handleChange}
                                    className="w-full p-1 border rounded"
                                />
                            </td>
                            <td className="border p-2">
                                <select
                                    value={formData.woodTypeId}
                                    id="woodType"
                                    name="woodType"
                                    onChange={handleChanges}
                                    disabled
                                    className="w-full p-1 border rounded"
                                >
                                    <option value="0">Select Wood</option>
                                    {woodTypes.map((wood, index) => (
                                        <option key={index} value={wood.id}>
                                            {wood.woodname} (₹{wood.price} per cubic unit)
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td className="border p-2">
                                <input
                                    type="number"
                                    id="manufacturingCost"
                                    name="manufacturingCost"
                                    value={formData.manufacturingCost}
                                    onChange={handleChange}
                                    className="w-full p-1 border rounded"
                                />
                            </td>


                            <td className="border p-2">
                                <input
                                    type="text"
                                    id="dimensions"
                                    name="dimensions"
                                    value={formData.dimensions}
                                    onChange={handleChange}
                                    placeholder="L*H*W"
                                    className="w-full p-1 border rounded"
                                />
                            </td>
                            <td className="border p-2">
                                <input
                                    type="number"
                                    id="discount"
                                    name="discount"
                                    value={formData.discount} onChange={handleChange}
                                    placeholder="Discount (%)"
                                    className="w-full p-1 border rounded"
                                />
                            </td>
                            <td className="border p-2">
                                <input
                                    type="number"
                                    id="quantity"
                                    name="quantity"
                                    value={formData.quantity}
                                    placeholder="Qunatity"
                                    disabled
                                    className="w-full p-1 border rounded"
                                />
                            </td>
                            <td className="border p-2">
                                <input
                                    type="text"
                                    id="totalPrice"
                                    name="totalPrice"
                                    value={formData.totalPrice}
                                    readOnly
                                    className="w-full p-1 border bg-gray-100 rounded"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {/* Response Section */}
            <div className="form-group">
                <label>Additional Notes</label>
                <textarea name="response" value={formData.response} onChange={handleChange} required />
            </div>


            {formData.status === "Requested" && (
                <div className="button-group">
                    <button onClick={() => updateStatus("Accepted")} className="btn-accept">Accept</button>
                    <button onClick={() => updateStatus("Rejected")} className="btn-reject">Reject</button>
                </div>
            )}
        </div>
    );
};

export default AddQuotation;
