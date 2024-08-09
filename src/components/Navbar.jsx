import React from 'react';
import { FaGithub } from 'react-icons/fa';

const Navbar = () => (
  <nav className="bg-dark p-4 flex justify-between items-center">
    <img src="src\assets\returns logo.png" alt="Website Logo" className="h-10 pl-4" />
    <a href="https://github.com/Adstar01" target="_blank" rel="noopener noreferrer">
      <FaGithub className="text-white text-2xl" />
    </a>
  </nav>
);

export default Navbar;
