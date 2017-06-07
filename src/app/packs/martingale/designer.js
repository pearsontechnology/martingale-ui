import React from 'react';
import Components from 'martingale-ui-components';

class Designer extends React.Component{
  render(){
    return (
      <div>
        Designer belongs here.
      </div>
    );
  }
}

const settings = {
  path: '/designer',
  icon: 'Kitchensink',
  sideNav: true,
  caption: 'Designer'
};

Object.keys(settings).forEach((key)=>Designer[key]=settings[key])

export default Designer;
