import {
  addQueryParams,
  getObjectValue
} from '@martingale/utils';

import configprovider from './configprovider';

const isTheSamePage = (p1, p2)=>p1.caption === p2.caption && p1.path === p2.path;
const uniquePages = (arr)=>arr.filter((e, p, a)=>arr.findIndex((i)=>isTheSamePage(i, e)) === p);

const isTheSameBasePath = (p1, p2)=>{
  const stack1 = p1.split('/').filter(s=>!!s);
  const stack2 = p2.split('/').filter(s=>!!s);
  const l1 = stack1.length;
  const l2 = stack2.length;
  if(l2 < l1){
    return false;
  }
  if(l1===0){
    return true;
  }
  for(let i = 0; i<l1; i++){
    const seg1 = stack1[i];
    const seg2 = stack2[i];
    if(seg1[0]===':'){
      continue;
    }
    if(seg2[0]===':'){
      continue;
    }
    if(seg1!==seg2){
      return false;
    }
  }
  return true;
};

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

const mkDynamicPath = (pattern, params, config)=>{
  const path = getObjectValue(pattern, {config});
  return mkPath(path, params);
};

const getPath = (path, config)=>{
  if(!path){
    return '';
  }
  return path[0]==='/'?getObjectValue(`\`${path}\``, {config}):getObjectValue(path, {config});
};

const sideNavFromPack = (pack, {caption, config: cfg = {}, icon: configIcon, Icon: configIconComponent, pages: navPages = {}, params} = {})=>{
  const defaultConfig = configprovider.getDefaultConfig(pack);
  const snConfig = Object.assign({}, defaultConfig, cfg);
  const snPath = pack.basePath?getPath(pack.basePath, snConfig):'';

  const toPage = (p)=>{
      if(p.sideNav&&(!p.path)&&(!p.dynamicPath)){
        console.error(`Page "${p.caption}" marked as sideNav but no path or dynamicPath defined`);
        return false;
      }
      const config = Object.assign({}, defaultConfig, cfg, p.config);
      const path = p.dynamicPath?mkDynamicPath(p.dynamicPath, params, config):mkPath(p.path, params);
      const paths = Array.isArray(p.paths)?p.paths:[];
      return {
        pack: pack.name,
        caption: p.caption,
        icon: p.icon || p.Icon,
        path,
        paths,
        isDashboard: p.isDashboard || false,
        sideNav: p.sideNav,
        config
      };
    };

  const allPages = getPages(pack.pages).map(toPage);
  const pages = allPages.filter((page)=>page.sideNav);
  const availablePages = pages.filter(p=>!!p);

  if(snPath){
    configprovider.set(snPath, snConfig);
  }

  allPages.forEach((page)=>{
    const {
      path,
      paths,
      config
    } = page;
    if((!snPath) || (path && path.indexOf(snPath)!==0)){
      configprovider.set(path, config);
    }
    paths.forEach((path)=>{
      if(!isTheSameBasePath(snPath, path)){
        configprovider.set(path, config);
      }
    });
  });


  const res = {
    pack: pack.name,
    caption: caption || pack.caption || pack.name,
    icon: getIcon(configIcon || configIconComponent || pack.icon, pages),
    pages: availablePages.length?uniquePages(availablePages.concat(pages)):[],
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
