import React from 'react';

import {
  Link
} from 'react-router-dom';

import {
  IconLogo
} from 'martingale-ui-components';

import SideNav from './sidenav';
import TopNav from './topnav';

const Nav =({sideNavItems = [], topNavItems = []})=>{
  return (
    <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <div className="navbar-header">
          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
          </button>
          <Link className="navbar-brand" to="/"><IconLogo /> Martingale</Link>
      </div>
      <TopNav items={topNavItems} />
      <div className="collapse navbar-collapse navbar-ex1-collapse">
        <SideNav items={sideNavItems} />
      </div>
  </nav>
  );
};

export default Nav;
