import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import {
  ContainerFluid
} from 'martingale-ui-components';

import Components from '../components';
const {
  Nav,

  IconAlert,
  IconConsumer,
  IconInbox,
  IconUser,
  IconLogOut
} = Components;

import Pages from './pages';

const sideNavItems=Object.keys(Pages).filter((key)=>Pages[key].sideNav).map((key)=>{
  const page = Pages[key];
  const caption = page.caption || key;
  const linkTo = page.path;
  const icon = page.icon || 'Unknown';
  const Icon = Components[`Icon${icon}`] || Components.IconUnknown;
  return {
    caption,
    Icon,
    linkTo
  };
});

const topNavItems = [
  {
    Icon: IconInbox,
    type: 'message',
    items: [
      {
        type: 'message-preview',
        content: (
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
        )
      }
    ]
  },
  {
    Icon: IconAlert,
    type: 'alert',
    items: [
      {
        caption: <span>Alert Name <span className="label label-default">Alert Badge</span></span>
      }
    ]
  },
  {
    caption: 'John Shirley',
    Icon: IconUser,
    items: [
      {
        caption: 'Profile',
        Icon: IconUser,
        linkTo: '/profile'
      },
      {divider: true},
      {
        caption: 'Log Out',
        Icon: IconLogOut
      },
    ]
  }
];

const NoMatch = ({ location }) => (
  <ContainerFluid>
    <h3>No match for <code>{location.pathname}</code></h3>
  </ContainerFluid>
);

const App = ()=>{
  const routes = Object.keys(Pages).map((route)=>{
    const Page = Pages[route];
    const {
      path
    } = Page;
    return <Route key={route} exact path={path} render={(match)=>{
      const params = (match.match||{}).params;
      const page = React.createElement(Page, params);
      return page;
    }} />
  });
  return (
    <Router>
      <div id="wrapper">
        <Nav sideNavItems={sideNavItems} topNavItems={topNavItems} />
        <div id="page-wrapper">
          <Route render={({ location }) => (
              <Switch key={location.pathname} location={location}>
                <Route exact path="/" render={(match)=>{
                  return React.createElement(Pages.Home, match.params);
                }} />
                {routes}
                <Route component={NoMatch}/>
              </Switch>
          )}/>
        </div>
      </div>
    </Router>
  );
};

export default App;
