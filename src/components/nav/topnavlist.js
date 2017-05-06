import React from 'react';
import TopNavLink from './topnavlink';
import TopNavDivider from './topnavdivider';
import LiDropdown from './lidropdown';

const TopNavList=({Icon, caption, items, type})=>{
  const className = type?`${type}-dropdown`:'';
  const topNavItems = items.map((info, index)=>{
    const {
      divider = false,
      linkTo: to,
      ...props
    } = info;
    if(divider){
      return <TopNavDivider key={index} />;
    }
    return <TopNavLink to={to} {...props} key={index} />;
  });
  return (
    <LiDropdown>
      <a href="#" className={`dropdown-toggle`} data-toggle="dropdown"><Icon /> {caption} <b className="caret"></b></a>
      <ul className={`dropdown-menu ${className}`}>
        {topNavItems}
      </ul>
    </LiDropdown>
  );
};

export default TopNavList;
