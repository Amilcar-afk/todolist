import React, {useContext, useEffect} from 'react';
import {AuthContext} from '../../contexts/AuthContext';
import {useNavigate} from "react-router-dom";

const LogoutPage = () => {
    const {logout} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        logout().then(r => navigate("/login"));
    }, []);

    return (
        <div className="form-auth-container flex items-center justify-center h-full">
            <div className="w-full max-w-md">

            </div>
        </div>
    );
}

export default LogoutPage;