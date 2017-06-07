import React from 'react';
import Components from 'martingale-ui-components';
import SideNavLink from './sidenavlink';

class SideNavGroup extends React.Component{
  renderSubLink(page, key){
    const {
      path: to,
      icon = 'Unknown',
      ...props
    } = page;
    const Icon = typeof(icon)==='function'?icon:Components[`Icon${icon}`] || Components.IconUnknown;
    return <SideNavLink to={to} Icon={Icon} {...props} key={key} />;
  }

  renderSubLinks(){
    const {
      pages
    } = this.props;
    const sideNavLinks = pages.map(this.renderSubLink.bind(this));
    return sideNavLinks;
  }

  handleClick(e){
    e && e.preventDefault();
    this.props.onClick && this.props.onClick();
  }

  render(){
    const { Icon, caption, open } = this.props;
    const className=open?'active':'';
    const collapseClass=open?'collapse in':'collapse';
    if(this.props.pages.length===1){
      return this.renderSubLink(this.props.pages[0]);
    }
    const linkStyles = {
      cursor: 'pointer'
    };
    return (
        <li className={className}>
          <a style={linkStyles} onClick={this.handleClick.bind(this)}><Icon size={64} /><br />{caption}</a>
          <div className={collapseClass}>
            <ul className="nav navbar-nav sideNavSubList">
              {this.renderSubLinks()}
            </ul>
          </div>
        </li>
      );
  }
}

export default SideNavGroup;
