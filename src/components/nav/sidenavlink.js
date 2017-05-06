import React from 'react';
import {
  Route,
  Link
} from 'react-router-dom';

const SideNavLink=({ Icon, caption, to })=>(
  <Route path={to} exact={true} children={({ match }) => (
      <li className={match ? 'active' : ''}>
        <Link to={to}>{React.createElement(Icon, {size: 64})}<br />{caption}</Link>
      </li>
    )}/>
);

export default SideNavLink;
