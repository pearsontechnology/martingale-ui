import {
  fetchJson
} from '@martingale/utils';
import async from 'async';
import linkPacks from './packs'

const linkSpecs = ({specs = [], ...config}, callback)=>{
  const loadSpec = (spec, next)=>{
    fetchJson({
      method: 'get',
      url: spec.swagger,
      callback(err, s = {}){
        const swagger = s['x-martingale'] || {};
        if(err){
          console.error('Error loading specs: ', err);
          return next(err);
        }
        return next(null, swagger);
      }
    });
  };

  const doPacks = (spec, callback)=>linkPacks(spec, callback);
  const doSideNav = (spec, callback)=>callback(null, spec);
  const doTopNav = (spec, callback)=>callback(null, spec);

  const done = (err, specs)=>{
    if(err){
      return callback(err);
    }
    async.reduce(specs, config, (config, spec, next)=>{
      return doPacks(Object.assign({}, config, spec), (err, spec)=>{
        if(err){
          return next(err);
        }
        return doSideNav(spec, (err, spec)=>{
          if(err){
            return next(err);
          }
          return doTopNav(spec, (err, spec)=>{
            if(err){
              return next(err);
            }
            if(Array.isArray(spec.packs)){
              config.packs = (config.packs || []).concat(spec.packs);
            }
            if(Array.isArray(spec.sideNav)){
              config.sideNav = (config.sideNav || []).concat(spec.sideNav);
            }
            if(Array.isArray(spec.topNav)){
              config.topNav = (config.topNav || []).concat(spec.topNav);
            }

            return next(null, config);
          });
        });
      });
    }, callback);
  };
  async.map(specs, loadSpec, done);
};

export default linkSpecs;
