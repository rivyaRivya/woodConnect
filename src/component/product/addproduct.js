import React, { useEffect, useState } from 'react';
import './addProduct.css'
import axios from 'axios';
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom';
const AddProduct = () => {
    // Access the dynamic 'id' parameter from the URL
    const { id } = useParams();
    const [availableVariants, setAvailableVariants] = useState([]); // Variant types and values from API
    const [selectedVariants, setSelectedVariants] = useState([]); // Stores selected variant types and their values

    const [buttonLabel, setButtonLabel] = useState("Add product");
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [imageBlob, setImageBlob] = useState(null);
    const [imageURL, setImageURL] = useState(null);
    const [productData, setProductData] = useState({
        productname: '',
        woodType_id: null,
        price: null,
        manufacture: null,
        stock: null,
        description: "",
        image: null,
        width: null,
        length: null,
        labourPrice: null,
        manufacturePrice: null,
        woodPrice: null,
        isFeatured : null
    });
    const [woodTypes, setWoodTypes] = useState([]); // State to store wood types

    const getProductDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/product-details?id=${id}`); // Adjust API URL
            if (response)
                setProductData(response.data);
            const imageUrl = `data:image/png;base64,${response.data.image}`;
            setImageURL(imageUrl);
        } catch (error) {
            console.error("Error fetching product types", error);
        }
    }

    const fetchVariantData = async () => {
        try {
            // Make an API call to the Spring Boot backend login endpoint
            const response = await axios.get('http://localhost:8080/get-variant');

            if (response) {
                console.log(response)
                setAvailableVariants(response.data);
            }
        } catch (error) {
            console.log("rrrrrrrrrrrrrrr")
            toast.error(error);
        }
    }

    //const fetchVariantData = async () => {
    //    try {
    //        // Simulated API response
    //        const response = {
    //            variantTypes: [
    //                { type: 'Size', values: ['Small', 'Medium', 'Large'] },
    //                { type: 'Color', values: ['Red', 'Blue', 'Green'] },
    //            ],
    //        };

    //        setAvailableVariants(response.variantTypes);
    //    } catch (error) {
    //        console.error('Error fetching variant data:', error);
    //    }
    //};

    // Fetch wood types dynamically from API
    const fetchWoodTypes = async () => {
        try {
            const response = await axios.get('http://localhost:8080/wood-type'); // Adjust API URL
            if (response)
                setWoodTypes(response.data);
        } catch (error) {
            console.error("Error fetching wood types", error);
        }
    };

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const onUpdate = async () => {
        try {
            // Make an API call to the Spring Boot backend login endpoint
            const formData = new FormData();

            formData.append('productname', productData.productname);
            formData.append('description', productData.description);
            formData.append('price', productData.price);
            formData.append('woodType_id', productData.woodType_id);
            formData.append('image', image);
            formData.append('manufacture', productData.manufacture)
            formData.append('stock', productData.stock);
            formData.append('manufacturePrice', productData.manufacturePrice);
            formData.append('length', productData.length);
            formData.append('width', productData.width);
            formData.append('labourPrice', productData.labourPrice);

            const response = await axios.put(`http://localhost:8080/update-product/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            if (response) {
                navigate(`/product`);
                toast.success("Product data updated");
            }
        } catch (error) {
            toast.error(error);
            // Handle login failure
        }
    }

    useEffect(() => {
        const today = new Date();
        const todayString = today.toISOString().split('T')[0]; // Format as YYYY-MM-DD

        // Set the max attribute of the date input to today's date
        document.getElementById('manufacture').setAttribute('max', todayString);
        if (id != 0) {
            setButtonLabel("Update");
            getProductDetails();
        }
        fetchVariantData();
        fetchWoodTypes();

    }, []);


    const handleAddVariant = () => {
        const newVariant = { type: '', values: [] };
        setSelectedVariants([...selectedVariants, newVariant]);
    };

    // Handle selecting a variant type and its values
    const handleVariantChange = (index, type, selectedValues) => {
        const updatedVariants = [...selectedVariants];
        updatedVariants[index] = { type, values: selectedValues };
        setSelectedVariants(updatedVariants);
    };

    // Handle dropdown selection change
    const handleDropdownChange = (e) => {
        console.log(woodTypes);
        const selectedObject = woodTypes.find(item => item.id === parseInt(e.target.value));
        productData.woodType_id = selectedObject.id;
        productData.woodPrice = selectedObject.price;
        console.log(productData)
    };


    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id == 0) {

            // Add the product using the passed onAddProduct function
            // Reset the form after submission
            try {
                productData.image = image;
                const formData = new FormData();

                formData.append('productname', productData.productname);
                formData.append('description', productData.description);
                formData.append('price', productData.price);
                formData.append('woodType_id', parseInt(productData.woodType_id));
                formData.append('image', image);
                formData.append('manufacture', productData.manufacture);
                formData.append('stock', productData.stock);
                formData.append('manufacturePrice', productData.manufacturePrice);
                formData.append('length', productData.length);
                formData.append('width', productData.width);
                formData.append('labourPrice', productData.labourPrice);
                formData.append('isFeatured', productData.isFeatured);
                formData.append('variant', JSON.stringify(selectedVariants));
                const response = await axios.post('http://localhost:8080/product', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                },);
                toast.success("Prodcut added")
                if (response) {
                    navigate(`/product`);
                }
            } catch (error) {
                console.log(error);
                toast.error(error.response.data);
                // Handle login failure
            }
        } else {
            onUpdate();
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            convertToBlob(file);
            setImage(file);
        }
    };
    const convertToBlob = (file) => {
        const reader = new FileReader();

        reader.onloadend = () => {
            // Check if reader.result is properly loaded
            const arrayBuffer = reader.result;
            if (arrayBuffer) {
                const blob = new Blob([arrayBuffer], { type: file.type });
                setImageBlob(blob); // Save the Blob in state

                // Create a URL for the Blob to display the image
                const url = URL.createObjectURL(blob);
                setImageURL(url);
            } else {
                console.error('Error reading file');
            }
        };

        reader.onerror = () => {
            console.error('Error reading file');
        };

        reader.readAsArrayBuffer(file); // Read the file as an array buffer
    };

    const handleDeleteVariantType = (id) => {
        console.log(id, selectedVariants);
        const updatedTypes = selectedVariants.splice(id, 1);
        setAvailableVariants(updatedTypes);
    }

    return (
        <div className="product-details-container">
            <form onSubmit={handleSubmit} className="product-details-form">
                {/* Submit Button */}
                <button type="submit" className="btn-submit product-button">
                    {buttonLabel}
                </button>
                <div className="form-box">
                    {/* Section 1: Product Details */}
                    <div className="section section-1">
                        <div className="form-group">
                            <label htmlFor="productname">Product Name</label>
                            <input
                                type="text"
                                id="productname"
                                name="productname"
                                value={productData.productname}
                                onChange={handleChange}
                                required
                                disabled={id != 0}
                            />
                        </div>
                        
                       
                        <div className="form-group">
                            <label htmlFor="manufacture">Manufacture Date</label>
                            <input
                                type="date"
                                id="manufacture"
                                name="manufacture"
                                value={productData.manufacture}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="stock">Stock</label>
                            <input
                                type="number"
                                id="stock"
                                name="stock"
                                value={productData.stock}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="woodPrice">Is featured </label>
                            <input
                                type="checkbox"
                                id="featured"
                                name="featured"
                                className="featured"
                                value={productData.isFeatured}
                                checked={productData.isFeatured}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="woodType_id">Wood Type</label>
                            <select
                                id="woodType_id"
                                name="woodType_id"
                                value={productData.woodType_id}
                                onChange={handleDropdownChange}
                                required
                                className="custom-dropdown"
                            >
                                <option value="">Select Wood Type</option>
                                {woodTypes.map((wood) => (
                                    <option key={wood.id} value={wood.id}>
                                        {wood.woodname}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="woodPrice">Wood Price</label>
                            <input
                                type="number"
                                id="woodPrice"
                                name="woodPrice"
                                value={productData.woodPrice}
                                onChange={handleChange}
                                required
                                disabled
                            />
                        </div>

                    </div>

                    {/* Section 2: Wood Details & Additional Information */}
                    <div className="section section-2">
                        <div className="form-group">
                            <label htmlFor="length">Wood Length (cm)</label>
                            <input
                                type="number"
                                id="length"
                                name="length"
                                value={productData.length}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="width">Wood Width (cm)</label>
                            <input
                                type="number"
                                id="width"
                                name="width"
                                value={productData.width}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="manufacturePrice">Manufacturing Price</label>
                            <input
                                type="number"
                                id="manufacturePrice"
                                name="manufacturePrice"
                                value={productData.manufacturePrice}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="labourPrice">Labour Price</label>
                            <input
                                type="number"
                                id="labourPrice"
                                name="labourPrice"
                                value={productData.labourPrice}
                                onChange={handleChange}
                                required
                            />
                        </div>
                       
                        <div className="form-group">
                            <label htmlFor="price">Product Total Price</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={productData.price}
                                onChange={handleChange}
                                required
                            />
                        </div>
                       
                       
                    </div>
                    <div className="section section-2">

                        {/* Image Upload */}
                        <div className="form-group">
                            <h5>Upload Product Image</h5>
                            <input type="file" accept="image/*" onChange={handleFileChange} />
                            {imageURL && <img src={imageURL} alt="Uploaded" style={{ width: '200px', height: 'auto' }} />}
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Product Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={productData.description}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        
                    </div>
                </div>


                {/* Variant Selection Table */}
                <div className="variant-selection">
                    <h4>Select Variants</h4>
                    <button type="button" onClick={handleAddVariant}>
                        Add Variant Row
                    </button>
                    <table>
                        <thead>
                            <tr>
                                <th>Variant Type</th>
                                <th>Variant Values</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedVariants.length > 0 ? (selectedVariants.map((variant, index) => (
                                <tr key={index}>
                                    <td>
                                        <select
                                            value={variant.type}
                                            onChange={(e) => handleVariantChange(index, e.target.value, variant.values)}
                                        >
                                            <option value="">Select Variant Type</option>
                                            {availableVariants.map((availableVariant, i) => (
                                                <option key={i} value={availableVariant.type}>
                                                    {availableVariant.type}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>
                                        {variant.type && (
                                            <select
                                                
                                                value={variant.values}
                                                onChange={(e) =>
                                                    handleVariantChange(
                                                        index,
                                                        variant.type,
                                                        Array.from(e.target.selectedOptions, (option) => option.value)
                                                    )
                                                }
                                            >
                                                {availableVariants
                                                    .find((availableVariant) => availableVariant.type === variant.type)
                                                    ?.values.map((value, i) => (
                                                        <option key={i} value={value.id}>
                                                            {value.name}
                                                        </option>
                                                    ))}
                                            </select>
                                        )}
                                    </td>

                                    <td>
                                        <button type="button" onClick={() => handleDeleteVariantType(index)} className="btn-view wood delete">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))): <tr>No data available</tr>}
                        </tbody>
                    </table>
                </div>


                
            </form>
        </div>

    );
}

export default AddProduct;