import React from 'react'
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userContext from '../context/user/userContext';

const Profile = () => {

    let navigate = useNavigate();

    const { userData, getUserData } = useContext(userContext);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getUserData();
        } else {
            navigate('/');
        }
        // eslint-disable-next-line
    }, [])

    return (
        <div className='container'>
            <h1>Profile</h1>
            <div className='mt-4'>
                <div className="row">
                    <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-10">
                        <input type="text" readOnly className="form-control-plaintext" id="name" value={userData.name} />
                    </div>
                </div>
                <div className="row">
                    <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                        <input type="text" readOnly className="form-control-plaintext" id="email" value={userData.email} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile