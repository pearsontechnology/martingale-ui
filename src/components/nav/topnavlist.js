import React from 'react';
import TopNavLink from './topnavlink';
import TopNavDivider from './topnavdivider';
import LiDropdown from './lidropdown';

const TopNavList=({Icon, caption, items, type})=>{
  const linkStyles = {
    cursor: 'pointer'
  };
  const className = type?`${type}-dropdown`:'';
  const topNav = items.map((info, index)=>{
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
      <a style={linkStyles} className={`dropdown-toggle`} data-toggle="dropdown"><Icon /> {caption} <b className="caret"></b></a>
      <ul className={`dropdown-menu ${className}`}>
        {topNav}
      </ul>
    </LiDropdown>
  );
};

export default TopNavList;
