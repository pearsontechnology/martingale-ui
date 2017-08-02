import {
  betterType,
  isTheSame
} from 'martingale-utils';
import {
  fetch
} from 'martingale-utils';
import async from 'async';
import YAML from 'js-yaml';
import * as Packs from '../packs';

const linkPacks = ({packs : definedPacks = [], sideNav: sideNavItems, ...config}, callback)=>{
  const done = (errs, packDefs)=>{
    const packs = packDefs.filter(p=>betterType(p)==='object');
    const sideNav = packs.reduce((sideNav, pack)=>{
      if(pack.sideNav){
        const sn = {
          caption: pack.caption || pack.name,
          icon: pack.icon,
          pages: pack.sideNav
        };
        const sni = sideNav.findIndex(sni=>isTheSame(sni, sn));
        if(sni === -1){
          return sideNav.concat(sn);
        }
      }
      return sideNav;
    }, sideNavItems);
    return callback(errs, Object.assign({}, config, {packs, sideNav}));
  };
  return async.map(definedPacks, (p, next)=>{
    if(typeof(p)==='string'){
      if(Packs[p]){
        return next(null, Packs[p]);
      }

      return fetch(p).then(response=>{
            if(response.status !== 200){
              console.error(p, response.status, response.statusText);
              return new Promise(resolve=>resolve(new Error(response.statusText)));
            }
            return response.text();
          }).then(text=>{
            if(text instanceof Error){
              return next(text);
            }
            try{
              const json = JSON.parse(text);
              return setImmediate(()=>next(null, json));
            }catch(e){
              try{
                const yaml = YAML.safeLoad(text);
                return setImmediate(()=>next(null, yaml));
              }catch(e2){
                console.error('Error parsing:\n', text);
                console.error('JSON: ', e);
                console.error('YAML: ', e2);
              }
              return next(e);
            }
          });
    }
    return next(null, p);
  }, done);
};

export default linkPacks;
