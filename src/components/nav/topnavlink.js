import React from 'react';
import {
  Link
} from 'react-router-dom';

const TopNavLink=({Icon, to='#', caption, content, type})=>{
  const contents = caption || content;
  if(Icon){
    return (
      <li className={type}>
        <Link to={to}><Icon /> {contents}</Link>
      </li>
    );
  }
  return (
    <li className={type}>
      <Link to={to}>{contents}</Link>
    </li>
  );
};

export default TopNavLink;
