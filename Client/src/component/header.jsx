import { useContext, useEffect, useState } from "react";
import { authContext } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";




export default function Header(){
    const loggedData = useContext(authContext);

    const { name } = loggedData.loggedUser;

    function logout(){
        localStorage.removeItem("nutrify-user");
        loggedData.setLoggedUser(null);
        navigate("/login");
    } 

    const navigate = useNavigate();
    return (
        <div className="header">
            <div className="profile">
                <h3>Hey! {name}</h3>
                <button onClick={logout}>Logout</button>
            </div>

            <h1>MoiveCharcha</h1>
    
        </div>
    )
}