import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setAuthInfo } from 'app/common/auth/actions';
import { Button, Line } from 'shared';

import './header.scss';

interface Props {
  toggle: () => void;
}

export const Header: React.FC<Props> = ({ toggle }) => {
  const dispatch = useDispatch();
  const logout = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(setAuthInfo());
  };

  return (
    <nav className="app-header navbar navbar-expand-md navbar-dark fixed-top bg-dark py-1">
      <Button className="navbar-toggler" onClick={toggle}>
        <span className="navbar-toggler-icon"></span>
      </Button>
      <Link to="/" className="navbar-brand">
        RealMix
      </Link>
      <Line justifyContent="end" w="100">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Button className="nav-link" link small onClick={logout}>
              Sing out
            </Button>
          </li>
        </ul>
      </Line>
    </nav>
  );
};
