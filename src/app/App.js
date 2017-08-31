import {Config} from './config';

import Components from '../components';

import configprovider from './config/configprovider';

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

/*
const unique = list => list.filter(
  (e, p, a)=>list.findIndex((e2)=>isTheSame(e, e2)) === p
);
*/

const Wrapper = (opts)=>{
  const {
      state = 'loading',
      packs = [],
      //Pages = [],
      sideNav = [],
      topNav = [],
      //navConfigs = []
    } = opts;

  const loading = state === 'loading';
  const hasConfig = state !== 'noconfig';
  const Pages = packsToPages(packs);
  const routeRender=(Page)=>{
    return (match)=>{
      const config = configprovider.get(match.location.pathname);
      const params = {__settings: {packs}, config, params: (match.match||{}).params || {}};
      const page = React.createElement(Page, params);
      console.debug(match.location.pathname, {config, params, page});
      return page;
    };
  };

  const routes = Pages.reverse().filter((p, i, a)=>{
    const ai = a.findIndex((ai)=>{
      if(Array.isArray(ai.paths)){
        return ai.paths.indexOf(p.path) > -1;
      }
      if(p.path){
        return p.path === ai.path;
      }
      return false;
    });
    if((ai > -1) && (ai !== i)){
      console.warn(`Duplicate page path "${p.path}" in pack "${p.pack.name}" already defined in pack "${a[ai].pack.name}"`, p);
      return false;
    }
    const hasValidPath = (!!p.path) || (Array.isArray(p.paths) && p.paths.length);
    if(!hasValidPath){
      console.warn(`No path or paths defined for page "${p.name || p.caption}" in pack "${p.pack.name}"`, p);
    }
    return hasValidPath;
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
