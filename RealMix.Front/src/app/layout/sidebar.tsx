import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './sidebar.scss';

let sidebar: any = function (props: any) {
  const path = props.location.pathname;
  return (
    <>
      <div className="pos-f-t">
        <nav className="navbar navbar-dark bg-dark d-md-none">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        </nav>
        <div className="collapse show" id="navbarToggleExternalContent">
          <div className="bg-dark p-4">
            <nav className="bg-light sidebar">
              <div className="sidebar-sticky">
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <Link to="/" className={classNames('nav-link', { 'active': path === '/' })}>Dashboard</Link>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#a">Personnel</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#a">HCM</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#a">Schedules</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#a">PBJ</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#a">Reports</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#a">Payroll</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#a">Clocks</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#a">Config</a>
                  </li>
                </ul>
                <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                  <span>Time Card</span>
                  <a className="d-flex align-items-center text-muted" href="#a">
                    <span data-feather="plus-circle"></span>
                  </a>
                </h6>
                <ul className="nav flex-column mb-2">
                  <li className="nav-item">
                    <a className="nav-link" href="#a">Reconcilation Screen</a>
                  </li>
                  <li className="nav-item">
                    <Link to="/timecard" className={classNames('nav-link', { 'active': path === '/timecard' })}>Hours</Link>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#a">Attendance</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#a">Punches</a>
                  </li>
                </ul>

                <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                  <span>Saved reports</span>
                  <a className="d-flex align-items-center text-muted" href="#a">
                    <FontAwesomeIcon icon="plus-circle"></FontAwesomeIcon>
                  </a>
                </h6>
                <ul className="nav flex-column mb-2">
                  <li className="nav-item">
                    <a className="nav-link" href="#a">Current month</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#a">Last quarter</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#a">Social engagement</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#a">Year-end sale</a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

sidebar = withRouter(sidebar);
export const Sidebar = sidebar;