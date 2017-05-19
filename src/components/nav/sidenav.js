import React from 'react';
import SideNavGroup from './sidenavgroup';

class SideNav extends React.Component{
  constructor(){
    super();
    this.state = {};
  }

  expandGroup(index){
    if(this.state.expanded === index){
      return this.setState({expanded: -1});
    }
    this.setState({expanded: index});
  }

  render(){
    const {
      items
    } = this.props;
    const sideNavGroups = items.map((info, index)=>{
      const {
        linkTo: to,
        ...props
      } = info;
      props.open = this.state.expanded === index;
      return <SideNavGroup to={to} {...props} key={index} onClick={()=>this.expandGroup(index)} />;
    });
    return (
      <ul className="nav navbar-nav side-nav">
        {sideNavGroups}
      </ul>
    );
  }
}

export default SideNav;
