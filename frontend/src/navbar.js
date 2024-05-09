import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Destructure the props for better readability
const Navbar = ({ activeTab, changeView, totalLength }) => {
    return (
        <header data-bs-theme="dark"> {/* Retain the dark theme */}
            <nav className="navbar navbar-expand-md bg-body-tertiary"> {/* Apply Bootstrap classes */}
                <div className="container-fluid">
                    <span className="navbar-brand">MeowWiz</span> {/* Change this to <a> if needed */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavDropdown"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-between" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            {/* Ensure the active class is applied to the correct tab */}
                            <li className={`nav-item ${activeTab === 1 ? 'active' : ''}`}>
                                <a className="nav-link" onClick={() => changeView(1)}>Students</a>
                            </li>
                            <li className={`nav-item ${activeTab === 2 ? 'active' : ''}`}>
                                <a className="nav-link" onClick={() => changeView(2)}>Cats</a>
                            </li>
                            <li className={`nav-item ${activeTab === 3 ? 'active' : ''}`}>
                                <a className="nav-link" onClick={() => changeView(3)}>Dogs</a>
                            </li>
                            <li className={`nav-item ${activeTab === 4 ? 'active' : ''}`}>
                                <a className="nav-link" onClick={() => changeView(4)}>Checkout ({totalLength()})</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
