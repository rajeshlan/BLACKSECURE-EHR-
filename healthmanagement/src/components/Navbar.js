// src/components/Navbar.js

import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logo.png'; // Correct path to logo

const Navbar = () => {
  return (
    <nav className="bg-transparent fixed shadow-md shadow-slate-600 w-full text-gray-100 backdrop-blur-lg z-50 py-3">
      <div className="flex items-center justify-between px-10">
        <div className="flex space-x-10">
          <Link to="/" className="flex gap-2 text-2xl font-bold items-center sm:flex">
            <img className='w-20' alt='logo' src={logo} />
          </Link>
          <ul className="hidden items-center md:flex text-lg tracking-widest">
            <li>
              <NavLink 
                style={({ isActive }) => ({ color: isActive ? 'cyan' : 'white' })}
                className='mx-1 px-2 font-semibold' 
                to='/'
              >
                Register
              </NavLink>
            </li>
            <li>
              <NavLink 
                style={({ isActive }) => ({ color: isActive ? 'cyan' : 'white' })}
                className='mx-1 px-2 font-semibold' 
                to='/view-records'
              >
                View Records
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;