import React, { useContext } from "react";
import { authContext } from "../contexts/authContext";
import { useNavigate,NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export default function Header({ headingName }) {
    const loggedData = useContext(authContext);
    const { name } = loggedData.loggedUser;
    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem("moviecharcha-user");
        loggedData.setLoggedUser(null);
        navigate("/login");
    }


    return (
        <div className="header">

            <div className="intro">
                <FontAwesomeIcon className="intro-img" icon={faUser} style={{color: "#c00707",}} />
                <h3>Hey! {name}</h3>
            </div>

            <nav className="profile">
                <li className="nav-link">
                    <NavLink to="/home" >
                        <h2 className="nav-text">Home</h2>
                    </NavLink>
                </li>
                <li className="nav-link">
                    <NavLink to="/watchlist" >
                        <h2 className="nav-text">WatchList</h2>
                    </NavLink>
                </li>
                <li className="nav-link" onClick={logout}>
                    <h2 className="nav-text"> Logout </h2>
                </li>
            </nav>

            <h1>{headingName}</h1>
        </div>
    );
}
