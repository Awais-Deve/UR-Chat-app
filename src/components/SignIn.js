import React from 'react'
import { useDispatch } from 'react-redux';
import { signIn as Sign_In } from '../redux/actions';

import logo from '../logo.png';

function SignIn() {
    const dispatch = useDispatch();

    const signIn = ()=>{
        dispatch(Sign_In());
    }
    return (
        <div className='signIn__page'>
            <div className="inner">
                <img src={logo} alt="UR-Chat"/>
                <button onClick={signIn}>Sign In</button>
            </div>
        </div>
    )
}

export default SignIn
