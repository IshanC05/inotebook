import React, { useState } from 'react'
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userContext from '../context/user/userContext';

const Profile = (props) => {

    let navigate = useNavigate();

    const { userData, getUserData, updateUserName } = useContext(userContext);

    const [newName, setnewName] = useState('')

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getUserData();
        } else {
            navigate('/');
        }
        // eslint-disable-next-line
    }, [])

    const handleNameChange = (event) => {
        setnewName(event.target.value);
    }

    const updateName = () => {
        if (newName.length < 3) {
            props.showAlert('Name should be atleast 3 characters', 'danger');
            return;
        }
        updateUserName(userData._id, newName);
        setnewName('')
        props.showAlert('Name updated successfully', 'success');
    }

    return (
        <div className='container'>
            <h1>Profile</h1>
            <div className='container my-3'>
                <div className="card-body">
                    <hr />
                    <div className="row">
                        <div className="col-sm-3">
                            <p className="mb-0">Full Name</p>
                        </div>
                        <div className="col-sm-9">
                            <p className="text-muted mb-0">{userData.name}</p>
                        </div>
                        <div className="col-sm-9 my-3">
                            <input className="form-control" onChange={handleNameChange} value={newName} placeholder='Enter updated name' />
                            <button className='btn btn-success my-3' onClick={updateName}>Update</button>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-sm-3">
                            <p className="mb-0">Email</p>
                        </div>
                        <div className="col-sm-9">
                            <p className="text-muted mb-0">{userData.email}</p>
                        </div>
                    </div>
                    <hr />
                </div>
            </div>
        </div>
    )
}

export default Profile;