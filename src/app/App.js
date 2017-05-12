import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import {
  ContainerFluid
} from 'martingale-ui-components';

import {
  pageSchemaToReact
} from 'martingale-page-schema';

import Components from '../components';
const {
  Nav,
} = Components;

import AppPages from './pages';

const Pages = Object.keys(AppPages)
  .sort((key1, key2)=>{
    const page1 = AppPages[key1];
    const page2 = AppPages[key2];
    const caption1 = page1.caption || key1;
    const caption2 = page2.caption || key2;
    if(caption1==='Settings'){
      return 1;
    }
    if(caption2==='Settings'){
      return -1;
    }
    if(page1.isDashboard && page2.isDashboard){
      return caption1.localeCompare(caption2);
    }
    if(page1.isDashboard){
      return -1;
    }
    if(page2.isDashboard){
      return 1;
    }
    return caption1.localeCompare(caption2);
  })
  .reduce((Pages, key)=>{
    const page = AppPages[key];
    const type = typeof(page);
    if(type==='string'){
      const layout = JSON.parse(page);
      return Object.assign(Pages, {[key]: (props)=>pageSchemaToReact({
            layout,
            components: Components,
            props
          })
        });
    }
    if(type==='object'){
      const handler = (props)=>pageSchemaToReact({
            layout: page,
            components: Components,
            props
          });
      handler.caption = page.caption;
      handler.path = page.path;
      handler.paths = page.paths;
      handler.icon = page.icon;
      handler.sideNav = page.sideNav;
      return Object.assign(Pages, {[key]: handler});
    }
    return Object.assign(Pages, {[key]: page});
  }, {});

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

const topNavItems = [];
/*
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
//*/

const NoMatch = ({ location }) => (
  <ContainerFluid>
    <h3>No match for <code>{location.pathname}</code></h3>
  </ContainerFluid>
);

const App = ()=>{
  const routes = Object.keys(Pages).map((route)=>{
    const Page = Pages[route];
    const {
      path,
      paths
    } = Page;
    if(Array.isArray(paths)){
      return paths.map((path)=>{
        return <Route key={route} exact path={path} render={(match)=>{
          const params = (match.match||{}).params;
          const page = React.createElement(Page, params);
          return page;
        }} />
      });
    }
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
