import {Config} from './config';

import Components from '../components';

import {
  isTheSame
} from 'martingale-utils';

import {
  pageSchemaToReact
} from 'martingale-page-schema';

import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import {
  Loading,
  NoConfig,
  NoMatch
} from '../components/pages';

const {
  Nav,
} = Components;

const packsToPages = (Packs = [])=>{
  return Packs
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
          Page,
          pack
        };
      });
    })
    .reduce((pages, packPages)=>{
      return pages.concat(...packPages);
    }, []);
};

const unique = list => list.filter(
  (e, p, a)=>list.findIndex((e2)=>isTheSame(e, e2)) === p
);

const Wrapper = (opts)=>{
  const {
      state = 'loading',
      packs = [],
      //Pages = [],
      sideNav = [],
      topNav = []
    } = opts;
  const loading = state === 'loading';
  const hasConfig = state !== 'noconfig';
  const Pages = packsToPages(packs);
  const getSideNavPages = (sn)=>{
    if(Array.isArray(sn.pages)){
      return sn.pages;
    }
    return [sn];
  };
  const sideNavConfigs = unique(sideNav.reduce((config, sn)=>{
    const pages = getSideNavPages(sn);
    const pathConfigs = pages.map((p, i)=>{
        if(p.paths){
          return p.paths.map(path=>({
            path,
            config: p.config
          }));
        }
        if(p.path){
          return [{
            path: p.path,
            config: p.config
          }];
        }
      });
    return config.concat(...pathConfigs);
  }, []));

  const routeRender=(Page)=>{
    return (match)=>{
      const configs = sideNavConfigs.filter(c=>c.path===match.location.pathname);
      const config = (configs.shift() || {}).config || {};
      const params = {__settings: {packs}, config, params: (match.match||{}).params || {}};
      const page = React.createElement(Page, params);
      return page;
    };
  };
  const routes = Pages.reverse().filter((p, i, a)=>{
    const ai = a.findIndex((ai)=>{
      if(Array.isArray(ai.paths)){
        return ai.paths.indexOf(p.path) > -1;
      }
      return p.path === ai.path;
    });
    if((ai > -1) && (ai !== i)){
      console.warn(`Duplicate page path "${p.path}" in pack "${p.pack.name}" already defined in pack "${a[ai].pack.name}"`, p);
      return false;
    }
    return true;
  }).map((page)=>{
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
  const DefaultRoute = loading ? Loading
    : (hasConfig? NoMatch: NoConfig);
  return (
    <Router>
      <div id="wrapper">
        <Nav sideNav={sideNav} topNav={topNav} />
        <div id="page-wrapper">
          <Route render={({ location }) => (
              <Switch key={location.pathname} location={location}>
                {routes}
                <Route component={DefaultRoute}/>
              </Switch>
          )}/>
        </div>
      </div>
    </Router>
  );
};

const App = ()=><Config child={Wrapper} />;

export default App;
