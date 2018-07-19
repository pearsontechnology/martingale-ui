import {
  betterType
} from '@martingale/utils';

const processFunctions = (val)=>{
  if(!val){
    return val;
  }

  const type = betterType(val);
  if(type==='array'){
    return val.map(processFunctions);
  }
  if(type==='function'){
    return val();
  }
  if(type === 'object'){
    return Object.keys(val).reduce((o, key)=>{
      o[key] = processFunctions(val[key]);
      return o;
    }, {});
  }
  return val;
};

class NavConfigProvider{
  constructor(){
    this.configs = {};
  }

  raw(uri){
    const config = Object.keys(this.configs).reduce((config, path)=>{
      if(uri.indexOf(path)===0){
        if(config.l < path.length){
          return {
            l: path.length,
            config: this.configs[path]
          };
        }
      }
      return config;
    }, {l: -1, config: {}});
    return config.config;
  }

  get(uri){
    const config = this.raw(uri);
    return processFunctions(config);
  }

  set(uri, config){
    console.debug('set: ', uri, config);
    this.configs[uri] = config;
  }

  getDefaultConfig(pack){
    const packConfig = pack.config || {};
    return Object.keys(packConfig)
        .filter(ci=>typeof(packConfig[ci] && packConfig[ci].default)!=='undefined')
        .reduce((cfg, key)=>{
          cfg[key] = packConfig[key] && packConfig[key].default;
          return cfg;
        }, {});
  }
};

const provider = new NavConfigProvider();

export default provider;
