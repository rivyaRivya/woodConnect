/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState } from 'react';
import './sideNav.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../auth/authContext';



const SideNav = () => {
    const [openSection, setOpenSection] = useState(false); // State to track which section is open
    const { logout, isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    // Toggle function for accordion sections
    const toggleSection = (section) => {
        console.log(isLoggedIn)
        setOpenSection(openSection === section ? null : section); // Toggle open/close
    };

    const logoutMethod = () => {
        logout();
        navigate("/login");
    }
    return (
        <div> 
            <div className="navbar">{isLoggedIn ? (
            <nav className="sidebar">


                <ul className="sidebar-list">
                    <li className="sidebar-item">
                        <NavLink
                            to="/dashboard"
                            className="nav-link"
                            activeClassName="active" // Automatically adds the active class
                            exact
                        >
                            Dashboard
                        </NavLink>
                    </li>
                    
                    <li className="sidebar-item">
                        <NavLink
                            to="/customer"
                            className="nav-link"
                            activeClassName="active" // Automatically adds the active class
                            exact
                        >
                            Customers
                        </NavLink>
                    </li>
                    <li className="sidebar-item">
                        <a
                            className="menu-header"
                            onClick={() => toggleSection('product')}
                        >

                            Product
                            <FontAwesomeIcon icon={faChevronDown} className={openSection === 'product' ? 'rotate' : 'activated'} />
                        </a>
                        {openSection === 'product' && (
                            <ul className="submenu">
                                <li><NavLink
                                    to="/product"
                                    className="nav-link"
                                    activeClassName="active" // Automatically adds the active class
                                    exact
                                >Product</NavLink></li>
                                <li><NavLink
                                    to="/add-product/0"
                                    className="nav-link"
                                    activeClassName="active" // Automatically adds the active class
                                    exact
                                    >Add product</NavLink></li>
                                    <li><NavLink
                                        to="/variance"
                                        className="nav-link"
                                        activeClassName="active" // Automatically adds the active class
                                        exact
                                    >Variant</NavLink></li>
                                <li><NavLink
                                    to="/wood-type"
                                    className="nav-link"
                                    activeClassName="active" // Automatically adds the active class
                                    exact
                                >Wood type </NavLink></li>
                                <li><NavLink
                                    to="/add-woodtype/0"
                                    className="nav-link"
                                    activeClassName="active" // Automatically adds the active class
                                    exact
                                >Add wood type</NavLink></li>
                            </ul>
                        )}


                    </li>

                    <li className="sidebar-item">
                        <a
                            className="menu-header"
                            onClick={() => toggleSection('driver')}
                        >

                            Driver
                            <FontAwesomeIcon icon={faChevronDown} className={openSection === 'driver' ? 'rotate' : 'activated'} />
                        </a>
                        {openSection === 'driver' && (
                            <ul className="submenu">
                                <li><NavLink
                                    to="/driver"
                                    className="nav-link"
                                    activeClassName="active" // Automatically adds the active class
                                    exact
                                >Driver</NavLink></li>
                                <li><NavLink
                                    to="/add-driver/0"
                                    className="nav-link"
                                    activeClassName="active" // Automatically adds the active class
                                    exact
                                >Add driver</NavLink></li>
                            </ul>
                        )}


                    </li>
                    <li className="sidebar-item">
                        <NavLink
                            to="/list-quotation"
                            className="nav-link"
                            activeClassName="active" // Automatically adds the active class
                            exact
                        >
                            Quotation
                        </NavLink>
                    </li>
                    <li className="sidebar-item">
                        <NavLink
                            to="/list-order"
                            className="nav-link"
                            activeClassName="active" // Automatically adds the active class
                            exact
                        >
                            View/Manage orders
                        </NavLink>
                    </li>
                    <li className="sidebar-item">
                        <NavLink
                            to="/review-rating"
                            className="nav-link"
                            activeClassName="active" // Automatically adds the active class
                            exact
                        >
                            Review/Rating
                        </NavLink>
                    </li>
                   
                    <li className="sidebar-item">
                        <a onClick={logoutMethod}>Logout</a>
                    </li>
                </ul>

                </nav>) : (<div></div>)}
            </div></div>
    );
};
//}
export default SideNav;
