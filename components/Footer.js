import React, { useEffect, useState } from 'react';

const Footer = () => {
    const [token, setToken] = useState('');
    const currentYear = new Date().getFullYear();

    useEffect(() => {
        checkToken();
    }, []);

    const checkToken = () => {
        const myToken = localStorage.getItem('token');
        if (myToken) {
            setToken(myToken);
        }
    }

    return (
        <>
            {token && (
                <footer className="py-4 text-center">
                    <p className="text-sm text-gray-600">
                        &copy; {currentYear} Your Website. All rights reserved.
                    </p>
                </footer>
            )}
        </>
    );
};

export default Footer;
