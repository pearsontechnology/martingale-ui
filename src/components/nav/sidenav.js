import React from 'react';
import SideNavLink from './sidenavlink';

const SideNav = ({items})=>{
  const sideNavLinks = items.map((info, index)=>{
    const {
      linkTo: to,
      ...props
    } = info;
    return <SideNavLink to={to} {...props} key={index} />;
  });
  return (
    <ul className="nav navbar-nav side-nav">
      {sideNavLinks}
    </ul>
  );
};

export default SideNav;
