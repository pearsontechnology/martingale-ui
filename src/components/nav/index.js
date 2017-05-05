import React, { Component } from 'react';
import {
  Route,
  Link
} from 'react-router-dom';

import {
  IconLogo,
  IconConsumer,
  IconDashboard,
  IconUser,
  IconSettings,
  IconLogOut,
  IconInbox,
  IconAlert,
  IconPlugin,
  IconAPI,
  IconCluster,
} from 'martingale-ui-components';

class LiDropdown extends Component{
  constructor(...opts){
    super(...opts);
    this.state = {};
  }

  handleClick(e){
    if(!this.refs.link.contains(e.target)){
      return this.setState({droppedDown: false});
    }
    return this.setState({droppedDown: !this.state.droppedDown});
  }

  componentWillMount(){
    document.addEventListener('click', this.handleClick.bind(this), false);
  }

  componentWillUnmount(){
    document.removeEventListener('click', this.handleClick.bind(this), false);
  }

  render(){
    const {droppedDown}=this.state;
    const className=droppedDown?'dropdown open':'dropdown';
    const {children} = this.props;
    return <li className={className} ref="link">{children}</li>;
  }
}

const SideNavLink=({ Icon, caption, to })=>(
  <Route path={to} exact={true} children={({ match }) => (
      <li className={match ? 'active' : ''}>
        <Link to={to}>{React.createElement(Icon, {size: 64})}<br />{caption}</Link>
      </li>
    )}/>
);

const Nav =()=>(
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
    <ul className="nav navbar-right top-nav">
        <LiDropdown>
            <a href="#" className="dropdown-toggle" data-toggle="dropdown"><IconConsumer /> <b className="caret"></b></a>
            <ul className="dropdown-menu message-dropdown">
                <li className="message-preview">
                    <Link to="#">
                        <div className="media">
                            <span className="pull-left">
                                <img className="media-object" src="http://placehold.it/50x50" alt="" />
                            </span>
                            <div className="media-body">
                                <h5 className="media-heading"><strong>John Shirley</strong>
                                </h5>
                                <p className="small text-muted"><IconConsumer /> Yesterday at 4:32 PM</p>
                                <p>John had a <IconConsumer /></p>
                            </div>
                        </div>
                    </Link>
                </li>
                <li className="message-preview">
                    <Link to="#">
                        <div className="media">
                            <span className="pull-left">
                                <img className="media-object" src="http://placehold.it/50x50" alt="" />
                            </span>
                            <div className="media-body">
                                <h5 className="media-heading"><strong>John Shirley</strong>
                                </h5>
                                <p className="small text-muted"><IconConsumer /> Yesterday at 3:32 PM</p>
                                <p>John had a <IconConsumer /></p>
                            </div>
                        </div>
                    </Link>
                </li>
                <li className="message-preview">
                    <Link to="#">
                        <div className="media">
                            <span className="pull-left">
                                <img className="media-object" src="http://placehold.it/50x50" alt="" />
                            </span>
                            <div className="media-body">
                                <h5 className="media-heading"><strong>John Shirley</strong>
                                </h5>
                                <p className="small text-muted"><IconConsumer /> Yesterday at 2:32 PM</p>
                                <p>John had a <IconConsumer /></p>
                            </div>
                        </div>
                    </Link>
                </li>
                <li className="message-footer">
                    <Link to="#">Read All New Messages</Link>
                </li>
            </ul>
        </LiDropdown>
        <LiDropdown>
            <a href="#" className="dropdown-toggle" data-toggle="dropdown"><IconAlert /> <b className="caret"></b></a>
            <ul className="dropdown-menu alert-dropdown">
                <li>
                    <Link to="#">Alert Name <span className="label label-default">Alert Badge</span></Link>
                </li>
                <li>
                    <Link to="#">Alert Name <span className="label label-primary">Alert Badge</span></Link>
                </li>
                <li>
                    <Link to="#">Alert Name <span className="label label-success">Alert Badge</span></Link>
                </li>
                <li>
                    <Link to="#">Alert Name <span className="label label-info">Alert Badge</span></Link>
                </li>
                <li>
                    <Link to="#">Alert Name <span className="label label-warning">Alert Badge</span></Link>
                </li>
                <li>
                    <Link to="#">Alert Name <span className="label label-danger">Alert Badge</span></Link>
                </li>
                <li className="divider"></li>
                <li>
                    <Link to="#">View All</Link>
                </li>
            </ul>
        </LiDropdown>
        <LiDropdown>
            <a href="#" className="dropdown-toggle" data-toggle="dropdown"><IconUser /> John Shirley <b className="caret"></b></a>
            <ul className="dropdown-menu">
                <li>
                    <Link to="#"><IconUser /> Profile</Link>
                </li>
                <li>
                    <Link to="#"><IconInbox /> Inbox</Link>
                </li>
                <li>
                    <Link to="#"><IconSettings /> Settings</Link>
                </li>
                <li className="divider"></li>
                <li>
                    <Link to="#"><IconLogOut /> Log Out</Link>
                </li>
                <li className="divider"></li>
                <li>
                    <Link to="/demo">Demo Time!</Link>
                </li>
            </ul>
        </LiDropdown>
    </ul>
    <div className="collapse navbar-collapse navbar-ex1-collapse">
        <ul className="nav navbar-nav side-nav">
          <SideNavLink to="/" Icon={IconDashboard} caption="Dashboard" />
          <SideNavLink to="/apis" Icon={IconAPI} caption="APIs" />
          <SideNavLink to="/consumers" Icon={IconConsumer} caption="Consumers" />
          <SideNavLink to="/plugins" Icon={IconPlugin} caption="Plugins" />
          <SideNavLink to="/cluster" Icon={IconCluster} caption="Cluster" />
          <SideNavLink to="/settings" Icon={IconSettings} caption="Settings" />
        </ul>
    </div>
</nav>
);

export default Nav;
