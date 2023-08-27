import React, { useContext, useEffect } from 'react'
import Notes from './Notes';
import { useNavigate } from 'react-router-dom';
import userContext from '../context/user/userContext';

const Home = (props) => {

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
        <div>
            <div className='container'>
                <h1>Hi {userData.name}</h1>
                <hr />
            </div>
            <Notes showAlert={props.showAlert} />
        </div>
    )
}

export default Home