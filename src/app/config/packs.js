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

const scripts = [];

const createScript = (src, callback)=>{
  if(scripts.indexOf(src)>-1){
    return setImmediate(callback);
  }
  scripts.push(src);
  const script = document.createElement('script');
  script.src = src;
  script.onload = ()=>callback();
  script.async = true;
  document.body.appendChild(script);
};

const inited = [];

const linkPacks = ({packs : definedPacks = [], sideNav: sideNavItems = [], ...config}, callback)=>{
  const done = (errs, packDefs)=>{
    if(errs){
      return callback(errs);
    }
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
    return callback(null, Object.assign({}, config, {packs, sideNav}));
  };

  const loadScripts = (pack, next)=>{
    if(Array.isArray(pack.externalScripts)){
      return async.each(pack.externalScripts, (source, nextScript)=>{
        createScript(source, nextScript);
      }, ()=>next(null, pack));
    }
    return next(null, pack);
  };

  const initPack = (pack, next)=>{
    if(inited.indexOf(pack.name)>-1){
      return setImmediate(()=>next(null, pack));
    }
    inited.push(pack.name);
    const {
      init: initScript
    } = pack || {};
    if(!initScript){
      return next(null, pack);
    }
    try{
      // eslint-disable-next-line
      const f = new Function('{pack, easyFetch, config, sideNav}', initScript);
      const res = f({pack, easyFetch: fetch, config, sideNav: sideNavItems});
      if(res instanceof Promise){
        return res
            .then((newPack)=>{
              const packDef = newPack || pack;
              return next(null, packDef);
            })
            .catch((err)=>{
              console.error(pack.name, err);
              next(err);
            });
      }
      const packDef = res || pack;
      return next(null, packDef);
      /*
      return f(pack, (err, newPack)=>{
        if(err){
          console.error(pack.name, err);
          return next(err);
        }
        const packDef = newPack || pack;
        console.log('pack def: ', packDef);
        try{
          return next(null, packDef);
        }catch(e){
          console.error(e);
          return next(e);
        }
      });
      */
    }catch(e){
      console.error(pack.name, e);
      return next(null, pack);
    }
  };

  const initPacks = (errs, packDefs)=>{
    if(errs){
      return done(errs);
    }
    return async.map(packDefs, initPack, done);
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
              json.sourceLocation = p;
              return setImmediate(()=>loadScripts(json, next));
            }catch(e){
              try{
                const yaml = YAML.safeLoad(text);
                yaml.sourceLocation = p;
                return setImmediate(()=>loadScripts(yaml, next));
              }catch(e2){
                console.error('Error parsing:\n', text);
                console.error('JSON: ', e);
                console.error('YAML: ', e2);
              }
              return next(e);
            }
          })
          .catch((e)=>next(e));
    }
    return next(null, p);
  }, initPacks);
};

export default linkPacks;
