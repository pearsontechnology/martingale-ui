import {
  getObjectValue
} from 'martingale-utils';

const linkNavConfigs = (baseConfig, callback)=>{
  const {
    sideNav,
    packs
  } = baseConfig;
  const keys = Object.keys(sideNav);
  const navConfigs = keys.reduce((nc, key)=>{
    const sideNavItem = sideNav[key];
    const config = sideNavItem.config;
    const pack = packs.find((p)=>p.name === sideNavItem.pack) || {};
    if(pack && config && pack.basePath){
      const path = pack.basePath[0]==='/'?pack.basePath:getObjectValue(pack.basePath, {config});
      nc.push({
        path,
        pack: pack,
        config: config
      });
    }
    return nc;
  }, []);
  return callback(null, Object.assign(baseConfig, {navConfigs}));
};

export default linkNavConfigs;
