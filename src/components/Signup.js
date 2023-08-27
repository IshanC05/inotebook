import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';

const Signup = (props) => {


    let navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, password } = credentials;

        if (password !== credentials.cpassword) {
            props.showAlert("Passwords do not match", "danger");
            return;
        }

        setLoading(true);

        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/auth/createUser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password }),
        });

        const json = await response.json();
        console.log(json);
        if (json.success) {
            // save the auth token
            localStorage.setItem('token', json.authToken);
            setLoading(false);
            navigate('/');
            props.showAlert("Account creation successful", "success")

        } else {
            props.showAlert(json.error ? json.error : json.errors[0].msg, "danger")
        }

    }

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value })
    }

    return (
        <div className='container mt-3'>
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" aria-describedby="emailHelp" name="name" onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} required />
                </div>
                {!loading && <button type="submit" className="btn btn-primary">Submit</button>}
                {loading && <Spinner />}
            </form>
        </div>
    )
}

export default Signup