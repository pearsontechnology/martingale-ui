import {
  getObjectValue
} from 'martingale-utils';

const linkNavConfigs = (baseConfig, callback)=>{
  const {
    sideNav,
    packs
  } = baseConfig;
  const keys = Object.keys(sideNav);
  const getPath = (path, config)=>{
    if(!path){
      return '';
    }
    return path[0]==='/'?path:getObjectValue(path, {config});
  };
  const navConfigs = keys.reduce((nc, key)=>{
    const sideNavItem = sideNav[key];
    const config = sideNavItem.config;
    const pack = packs.find((p)=>p.name === sideNavItem.pack) || {};
    if(pack && config){
      const basePath = getPath(pack.basePath, config);
      if(basePath){
        nc.push({
          path: basePath,
          pack: pack,
          config: config
        });
      }
      Object.keys(pack.pages||{}).forEach((key)=>{
        const page = pack.pages[key];
        const paths = page.path?[page.path]:page.paths || [];
        if(paths.filter(p=>p==='/')){
          nc.push({
            path: '/',
            pack: pack,
            config: config
          });
        }
      });
    }
    return nc;
  }, []);
  return callback(null, Object.assign(baseConfig, {navConfigs}));
};

export default linkNavConfigs;
