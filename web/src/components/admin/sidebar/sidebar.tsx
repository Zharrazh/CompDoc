import React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

export const Sidebar = withRouter(({ match }: RouteComponentProps) => (
  <div>
    <ul>
      <li>
        <Link to={`${match.url}/widget`}>Widgets</Link>
      </li>
    </ul>
  </div>
));