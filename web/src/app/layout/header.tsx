import React from 'react';
import { Link } from 'react-router-dom';
import './header.scss';
export const Header: React.FC = () => {
  return (
    <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <Link to="/" className="navbar-brand col-md-2 mr-0">App Name</Link>
      <input className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search" />
      <ul className="navbar-nav px-3">
        <li className="nav-item text-nowrap">
          <Link className="nav-link" to='/login'>Sing out</Link>
        </li>
      </ul>
    </nav>
  );
}