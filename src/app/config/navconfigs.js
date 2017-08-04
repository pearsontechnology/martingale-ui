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
    const pack = packs.find((p)=>p.name === sideNavItem.pack);
    if(pack && config && pack.baseUrl){
      const path = pack.baseUrl[0]==='/'?pack.baseUrl:getObjectValue(pack.baseUrl, config);
      nc.push({
        path,
        config
      });
    }
    return nc;
  }, []);
  return callback(null, Object.assign(baseConfig, {navConfigs}));
};

export default linkNavConfigs;
