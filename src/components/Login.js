import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';

const Login = (props) => {

    let navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [credentials, setCredentials] = useState({ email: "", password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });

        const json = await response.json();
        // console.log(json);

        if (json.success) {
            // save the auth token
            localStorage.setItem('token', json.authToken);
            navigate('/home');
            props.showAlert("Logged in successfully", "success")
        } else {
            props.showAlert("Invalid Credentials", "danger")
        }
        setLoading(false);
    }

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value })
    }

    return (
        <div className='mt-3'>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credentials.email.email} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} />
                </div>
                {!loading && <button type="submit" className="btn btn-primary">Submit</button>}
                {loading && <Spinner />}
            </form>
        </div>
    )
}

export default Login