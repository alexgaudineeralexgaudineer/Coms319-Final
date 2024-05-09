import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = ({ activeTab, changeView, totalLength }) => {
    return (
        <header>
            <nav className="navbar navbar-expand-md bg-body-tertiary">
                <div className="container-fluid">
                    <span className="navbar-brand">MyApp</span>
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
                            {/* Use conditional logic to apply 'active' class */}
                            <li className={`nav-item ${activeTab === 1 ? 'active' : ''}`}>
                                <p className="nav-link" onClick={() => changeView(1)}>Students</p>
                            </li>
                            <li className={`nav-item ${activeTab === 2 ? 'active' : ''}`}>
                                <p className="nav-link" onClick={() => changeView(2)}>Cats</p>
                            </li>
                            <li className={`nav-item ${activeTab === 3 ? 'active' : ''}`}>
                                <p className="nav-link" onClick={() => changeView(3)}>Dogs</p>
                            </li>
                            <li className={`nav-item ${activeTab === 4 ? 'active' : ''}`}>
                                <p className="nav-link" onClick={() => changeView(4)}>Checkout ({totalLength()})</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
