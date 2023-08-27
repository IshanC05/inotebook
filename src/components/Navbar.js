import React from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {

    let location = useLocation();
    let currentPage = location.pathname;
    let navigate = useNavigate();

    const isWelcomePage = currentPage === '/';
    const isSignupPage = currentPage === '/signup';
    const isLoginPage = currentPage === '/login';

    const shouldShowButtons = !isWelcomePage;
    const isLoggedIn = !!localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/");
    }

    return (
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to={isLoggedIn ? "/home" : "/"}>CloudStroll</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {localStorage.getItem('token') && <li className="nav-item">
                            <Link className={`nav-link  ${location.pathname === '/home' ? "active" : ""}`} aria-current="page" to="/home">Home</Link>
                        </li>}
                        {localStorage.getItem('token') && <li className="nav-item">
                            <Link className={`nav-link  ${location.pathname === '/profile' ? "active" : ""}`} to="/profile">Profile</Link>
                        </li>}
                        {/* <li className="nav-item">
                            <Link className={`nav-link  ${location.pathname === '/about' ? "active" : ""}`} to="/about">About</Link>
                        </li> */}

                    </ul>
                    {
                        shouldShowButtons && (
                            <form className="d-flex" role="search">
                                {!isLoggedIn ? (
                                    <>
                                        {!isSignupPage && <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>}
                                        {!isLoginPage && <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>}
                                    </>
                                ) : (<button className='btn btn-primary' onClick={handleLogout}>Logout</button>)}
                            </form>
                        )
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar