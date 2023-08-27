import React from 'react'
import { Link } from "react-router-dom";

function Welcome() {
    return (
        <div className="card text-center">
            {/* <div className="card-header">
                Featured
            </div> */}
            <div className="card-body">
                <h1 className="card-title">Welcome to CloudStroll</h1>
                <p className="card-text mt-2">Your notes in the cloud</p>
                <div className='container mt-5'>
                    <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                    <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
                </div>
            </div>
            {/* <div className="card-footer text-muted">
                2 days ago
            </div> */}
        </div>
    )
}

export default Welcome