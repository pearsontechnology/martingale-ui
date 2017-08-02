import React from 'react';
import Components from 'martingale-ui-components';
import SideNavLink from './sidenavlink';

const getIcon = (icon)=>{
  const type = typeof(icon);
  if(type === 'function'){
    return icon;
  }
  if(type === 'string'){
    return Components[`Icon${icon}`] || Components.IconUnknown;
  }
  if(type === 'object' && icon.source){
    return Components.MakeIcon(icon);
  }
  return Components.IconUnknown;
};

class SideNavGroup extends React.Component{
  renderSubLink(page, key){
    const {
      path,
      link,
      Icon: IconComponent,
      icon: iconName,
      caption
    } = page;
    const to = link || path;
    const Icon = getIcon(iconName, IconComponent);
    return <SideNavLink to={to} Icon={Icon} caption={caption} key={key} />;
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
    const { Icon: IconComponent, icon: iconName, caption, open } = this.props;
    const Icon = getIcon(iconName || IconComponent);
    const className=open?'active':'';
    const collapseClass=open?'collapse in':'collapse';
    if(this.props.link || this.props.path){
      return this.renderSubLink(this.props);
    }
    if(Array.isArray(this.props.pages)&&this.props.pages.length===1){
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
