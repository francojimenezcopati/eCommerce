import {Link} from 'react-router-dom'
import React from "react";
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const NavBar = () => {

    const {tokens, handleLogout} = useContext(AuthContext)

    return (
        <div className="flex p-5 mb-5 bg-cyan-800">
            <Link to='/'>Home</Link>
            <span className='mx-4'> | </span>
            {tokens ? <Link onClick={handleLogout}>Logout</Link> : <Link to='/login'>Log in</Link>}
        </div>
    );
};

export default NavBar;