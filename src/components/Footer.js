import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import logo from '../logo.svg';

const Footer = () => {
  return (
    <footer className="px-4 md:px-12 divide-y bg-[#35074D] dark:text-gray-100 tracking-wide mt-20">
      <div className="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
        <div className="lg:w-1/3">
          <img className='w-20' alt='logo' src={logo} />
        </div>
        <div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4">
          <div className="space-y-3">
            <h3 className="tracking-wide uppercase dark:text-gray-50">Navigate</h3>
            <ul className="space-y-1">
              <li>
                <Link 
                  to="/register" 
                  className="cursor-pointer text-black dark:text-gray-200 hover:text-white block rounded-md hover:underline underline-offset-2"
                >
                  Register
                </Link>
              </li>
              <li>
                <Link 
                  to="/view-records" 
                  className="cursor-pointer text-black dark:text-gray-200 hover:text-white block rounded-md hover:underline underline-offset-2"
                >
                  View Records
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="py-6 text-md text-center dark:text-gray-200">
        © MED-SYNCs. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
