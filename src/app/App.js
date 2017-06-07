import {
  Martingale,
  Kong,
  Kube
} from './packs';

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

const Packs = [
  Kube,
  Kong,
  Martingale
];

const Pages = Packs
  .map((pack)=>{
    const {
      //name: packName,
      path: packPath = '',
      pages
    } = pack;
    const pageKeys = Array.isArray(pages)?pages:Object.keys(pages);
    return pageKeys.map((key)=>{
      const {
        pack: packName,
        path,
        paths,
        icon,
        sideNav=false,
        caption,
        ...layout
      } = pages[key];
      return {
        path: path?packPath+path:path,
        paths: paths?paths.map((path)=>packPath+path):paths,
        icon,
        sideNav,
        caption,
        Page: (props)=>pageSchemaToReact({
          layout,
          components: Components,
          props
        })
      };
    });
  })
  .reduce((pages, packPages)=>{
    return pages.concat(...packPages);
  }, []);

/*
const sideNavItems=Pages.filter((page)=>page.sideNav).map((page)=>{
  const caption = page.caption || page.path;
  const linkTo = page.path || page.paths[0];
  const icon = page.icon || 'Unknown';
  const Icon = Components[`Icon${icon}`] || Components.IconUnknown;
  return {
    caption,
    Icon,
    linkTo
  };
});
*/

const getPages = (rawPages)=>{
  if(Array.isArray(rawPages)){
    return rawPages;
  }
  return Object.keys(rawPages).map((key)=>rawPages[key]);
};

const sideNavItems = Packs.map((pack)=>{
  const {
    name,
    //path = '',
    icon: packIcon,
  } = pack;
  const pages = getPages(pack.pages).filter((page)=>page.sideNav);

  if(!packIcon){
    const dashboards = getPages(pack.pages).filter((page)=>page.isDashboard);
    if(dashboards.length > 0){
      const dashboard = dashboards[0];
      const icon = dashboard.icon || 'Unknown';
      const Icon = typeof(icon)==='function'?icon:Components[`Icon${icon}`] || Components.IconUnknown;
      return {
        caption: name,
        Icon,
        pages: pages.filter((page)=>page.sideNav)
      };
    }
  }

  const PackIcon = typeof(packIcon)==='function'?packIcon:Components[`Icon${packIcon}`] || Components.IconUnknown;
  return {
    Icon: PackIcon,
    caption: name,
    pages: pages.filter((page)=>page.sideNav)
  }
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
  const routes = Pages.map((page)=>{
    const {
      path,
      paths,
      Page
    } = page;
    if(Array.isArray(paths)){
      return paths.map((path)=>{
        return <Route key={path} exact path={path} render={(match)=>{
          const params = (match.match||{}).params;
          const page = React.createElement(Page, params);
          return page;
        }} />
      });
    }
    return <Route key={path} exact path={path} render={(match)=>{
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
