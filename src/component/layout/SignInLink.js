import React from 'react'
import {NavLink} from 'react-router-dom'

const SignInLink = () => {
    return (
        <ul className="right">
            <li><NavLink to="/create">New Account</NavLink></li>
            <li><NavLink to="/">Log Out</NavLink></li>
            <li><NavLink to="/" className="btn btn-floating pink">AB</NavLink></li>
        </ul>
    )
}
export default SignInLink
