import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './component/dashboard';

import SideNav from './component/shared/sideNav';
import Header from './component/shared/header';
import AddDriver from './component/driver/add-driver';
import Driver from './component/driver/driver';
import Product from './component/product/product';
import AddProduct from './component/product/addproduct';
import Customer from './component/customer/customer';
import ListOrder from './component/order/list-order';
import ReviewRating from './component/product/review-rating';
import WoodType from './component/product/wood-type';
import AddWoodType from './component/product/add-woodtype';
import Settings from './component/settings/settings';
import React, { useContext } from "react";
import Login from './component/auth/login';
import { AuthContext, AuthProvider } from './component/auth/authContext';
import OrderDetails from './component/order/order-details';
import ListQuotation from './component/quotation/list-quotation';
import AddQuotation from './component/quotation/add-quotation';
import VariantTypeList from './component/product/list-variance';
import VariantDetails from './component/product/variace-details';


const App = ()=>{

    return (
        <AuthProvider>
        <Router>
            <div>
                <Header />
                <SideNav />
                <main style={ mainContentStyle }>
                    <Routes>

                        <Route path="/dashboard" element={ <Dashboard />} />
                        <Route path="/driver" element={<Driver />} />
                        <Route path="/product" element={<Product />} />
                        <Route path="/variance" element={<VariantTypeList />} />
                        <Route path="/variant-details/:id" element={<VariantDetails />} />
                        <Route path="/add-product/:id" element={<AddProduct />} />
                        <Route path="/add-driver/:id" element={<AddDriver />} />
                        <Route path="/customer" element={<Customer />} />
                        <Route path="/list-order" element={<ListOrder />} />
                        <Route path="/review-rating" element={<ReviewRating />} />
                        <Route path="/wood-type" element={<WoodType />} />
                        <Route path="/add-woodtype/:id" element={<AddWoodType />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/order/:id" element={<OrderDetails />} />
                        <Route path="/list-quotation" element={<ListQuotation />} />
                        <Route path="/quotation/:id" element={<AddQuotation />} />
                        <Route path="/" element={<Login />} />
                    </Routes>
                </main>
            </div>

            </Router>
        </AuthProvider>
    );
}
// Styling for the main content area
const mainContentStyle = {
    marginLeft: '215px', // Adjusting for the side nav
    padding: '0px 10px 10px 0px',
};

const marginleft = {
    marginLeft: '0px'
}

export default App;
