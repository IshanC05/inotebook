import UserContext from './userContext';
import React, { useState } from 'react'

function UserState(props) {

    const host = `${process.env.REACT_APP_BASE_URL}`

    const userDataInitial = {};

    const [userData, setUserData] = useState(userDataInitial);

    const getUserData = async () => {

        const response = await fetch(`${host}/api/auth/getuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json();
        setUserData(json)
    }

    return (
        <UserContext.Provider value={{ userData, getUserData }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState