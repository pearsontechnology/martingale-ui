import React from 'react';

import TopNavList from './topnavlist';

const TopNav = ({items = []})=>{
  const topNavLists = items.map((props, index)=>{
    return <TopNavList {...props} key={index} />;
  });
  return (
    <ul className="nav navbar-right top-nav">
    {topNavLists}
    </ul>
  );
};

export default TopNav;
