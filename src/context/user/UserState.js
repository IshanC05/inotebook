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

    const updateUserName = async (id, name) => {
        const response = await fetch(`${host}/api/auth/updatename/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ name })
        });

        // eslint-disable-next-line
        const json = await response.json();

        // console.log(json)

        setUserData(json.user)
    }

    return (
        <UserContext.Provider value={{ userData, getUserData, updateUserName }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState