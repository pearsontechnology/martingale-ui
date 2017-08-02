import {
  Martingale,
  Kong,
  Kube
} from '../packs';

import {
  addQueryParams
} from 'martingale-utils';

import Components from '../../components';

const PackTypes = {
  Kube,
  Kong,
  Martingale
};

const packs = Object.keys(PackTypes).map(n=>PackTypes[n]);

const packConfigurations = [
  {
    pack: 'Kong'
  },
  {
    pack: 'Martingale'
  }
];

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

const makeSideNavItem = (p)=>({
    caption: p.caption,
    icon: p.icon,
    link: p.link
  });

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
    pages: pages.filter((page)=>page.sideNav).map(makeSideNavItem)
  }
};

const sideNav = packConfigurations.map(({pack, ...options})=>{
  const Pack = PackTypes[pack];
  return makeSideNav(Pack, options);
});

const config = {
  state: "loaded",
  specs: [
    {swagger: 'http://localhost:8080/api/swagger.json'}
  ],
  packs,
  sideNav: sideNav
};

export default config;
