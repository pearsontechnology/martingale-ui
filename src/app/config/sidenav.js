import {
  addQueryParams
} from 'martingale-utils';

const isTheSamePage = (p1, p2)=>p1.caption === p2.caption && p1.path === p2.path;
const uniquePages = (arr)=>arr.filter((e, p, a)=>arr.findIndex((i)=>isTheSamePage(i, e)) === p);

const getPages = (rawPages)=>{
  if(Array.isArray(rawPages)){
    return rawPages;
  }
  return Object.keys(rawPages).map((key)=>rawPages[key]);
};

const getIcon = (icon, pages)=>{
  if(icon){
    return icon;
  }
  const withIcons = pages.filter(p=>p.icon || p.Icon);
  const dashboardIcons = withIcons.filter(p=>p.isDashboard).map(p=>p.icon || p.Icon);
  if(dashboardIcons.length){
    return dashboardIcons.shift();
  }
  const pageIcons = withIcons.map(p=>p.icon || p.Icon);
  return pageIcons.shift();
};

const mkPath = (src, params)=>{
  if(params && src){
    return addQueryParams(src, params);
  }
  return src;
};

const sideNavFromPack = (pack, {caption, config = {}, icon: configIcon, Icon: configIconComponent, pages: navPages = {}, params} = {})=>{
  const toPage = (p)=>({
      caption: p.caption,
      icon: p.icon || p.Icon,
      path: mkPath(p.path, params),
      paths: p.paths?p.paths.map((p)=>mkPath(p, params)):undefined,
      isDashboard: p.isDashboard || false,
      config: Object.assign({}, config, p.config)
    });
  const pages = getPages(pack.pages).filter((page)=>page.sideNav).map(toPage);
  const res = {
    caption: caption || pack.caption || pack.name,
    icon: getIcon(configIcon || configIconComponent || pack.icon, pages),
    pages: uniquePages(getPages(navPages).map(toPage).concat(pages)),
    config
  };
  return res;
};

const linkSideNav = ({sideNav : definedSideNav = [], ...config}, callback)=>{
  const sideNav = definedSideNav.map(sn=>{
    if(typeof(sn.pack)==='string'){
      const {
        packs = []
      } = config;
      const pack = packs.filter(p=>p.name === sn.pack).shift();
      if(!pack){
        console.error(`Could not locate a pack using "${sn.pack}" to link to sideNav`);
        return false;
      }
      return sideNavFromPack(pack, sn);
    }
    return sn;
  }).filter(sn=>sn && (sn.caption && (sn.path || Array.isArray(sn.paths) || Array.isArray(sn.pages))));
  return callback(null, Object.assign({}, config, {sideNav}));
};

export default linkSideNav;
