import {
  Martingale,
  Kong,
  Kube
} from './packs';

import {
  addQueryParams
} from 'martingale-utils';

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

const isDev = process.env.NODE_ENV==='development';

const packConfigurations=[
  {
    pack: 'Kube',
    caption: 'Kube US1'
  },
  {
    pack: 'Kong'
  },
  {
    pack: 'Martingale'
  }
];

if(isDev){
  packConfigurations.unshift({
      pack: 'Kube',
      caption: 'Kube Dev',
      apiBase: '/api/dev/kube'
    });
}

const PackTypes = {
  Kube,
  Kong,
  Martingale
};

const Packs = Object.keys(PackTypes).map(n=>PackTypes[n]);

const Pages = Packs
  .map((pack)=>{
    const {
      path: packPath = '',
      pages
    } = pack;
    const pageKeys = Array.isArray(pages)?pages:Object.keys(pages);
    return pageKeys.map((key)=>{
      const page = pages[key];
      const {
        pack: packName,
        path,
        paths,
        icon,
        sideNav=false,
        caption,
        ...layout
      } = page;
      const Page = typeof(page)==='function'?page:(props)=>pageSchemaToReact({
                layout,
                components: Components,
                props
              });
      return {
        path: path?packPath+path:path,
        paths: paths?paths.map((path)=>packPath+path):paths,
        icon,
        sideNav,
        caption,
        Page
      };
    });
  })
  .reduce((pages, packPages)=>{
    return pages.concat(...packPages);
  }, []);

const getPages = (rawPages)=>{
  if(Array.isArray(rawPages)){
    return rawPages;
  }
  return Object.keys(rawPages).map((key)=>rawPages[key]);
};

const makePackInstace = ({Pack, name, ...props})=>{
  const pages = Object.keys(Pack.pages).reduce((pages, key)=>{
    const page = Pack.pages[key];
    const newPage = Object.assign({}, page, {
      link: addQueryParams(page.path, props)
    });
    return Object.assign({}, pages, {[key]: newPage});
  }, {});
  return Object.assign({}, Pack, {
    name,
    pages,
  });
};

const makeSideNav=(Pack, {caption, ...params}={})=>{
  const pack = makePackInstace({
    Pack,
    name: caption || Pack.name,
    ...params
  });
  const {
    name,
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
};

const sideNavItems = packConfigurations.map(({pack, ...options})=>{
  const Pack = PackTypes[pack];
  return makeSideNav(Pack, options);
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
  const routeRender=(Page)=>{
    return (match)=>{
      const params = Object.assign({__settings: {Packs}}, (match.match||{}).params);
      const page = React.createElement(Page, params);
      return page;
    };
  };
  const routes = Pages.map((page)=>{
    const {
      path,
      paths,
      Page
    } = page;
    if(Array.isArray(paths)){
      return paths.map((path)=><Route key={path} exact path={path} render={routeRender(Page)} />);
    }
    return <Route key={path} exact path={path} render={routeRender(Page)} />;
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
