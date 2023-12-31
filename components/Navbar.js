import Link from "next/link"
import React, { useEffect, useState } from 'react';

const Navbar = () => {
  const [token, setToken] = useState('');

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = () => {
    const myToken = localStorage.getItem('token');
    if (myToken) {
      setToken(myToken);
    }
  }

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem('token')
    window.location = '/login'
  }
  return (
    <>
      {token && (
        <nav className="">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Link href="/" className="text-black text-lg font-semibold">HOME</Link>
                <Link href="/create" className="ml-4 text-gray-500 hover:text-gray-900">CREATE</Link>
              </div>
              <div className="flex items-center">
                <a href="" onClick={handleLogout} className="text-gray-500 hover:text-gray-900">LOGOUT</a>
              </div>
            </div>
          </div>
        </nav>
      )}
    </>
  )
}

export default Navbar