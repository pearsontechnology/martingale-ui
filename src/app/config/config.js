import React from 'react';
import {
  fetch
} from 'martingale-utils';
import linkSpecs from './specs';
import linkPacks from './packs';
import linkSideNav from './sidenav';
import linkNavConfigs from './navconfigs';

import {Alert} from 'martingale-ui-components';

const DEFAULT_CONFIG = {state: 'noconfig'};

class Config extends React.Component{
  constructor(){
    super();
    this.state = {state: 'loading'};
  }

  trapError(next, ...args){
    return (err, data)=>{
      if(err){
        return this.setState({state: 'error', error: err});
      }
      return next(data, ...args);
    };
  }

  configurationLoaded(config = {}){
    linkSpecs(config,
      this.trapError(linkPacks,
        this.trapError(linkSideNav,
          this.trapError(linkNavConfigs,
            this.trapError((config)=>this.setState(Object.assign(config, {state: 'loaded'})))
          )
        ),
      )
    );
    /*
    linkSpecs(config,
      (err, config)=>linkPacks(config,
        (err, config)=>linkSideNav(config,
          (err, config)=>linkNavConfigs(config,
            (err, config)=>this.setState(Object.assign(config, {state: 'loaded'}))
          )
        )
      )
    );
    */
  }

  componentDidMount(){
    fetch('/config.json')
      .then((response)=>{
        if(response.status !== 200){
          return this.setState({state: 'noconfig'});
        }
        return response.json();
      })
      .then((config)=>{
        if(config){
          return this.configurationLoaded(config);
        }
        return this.configurationLoaded(DEFAULT_CONFIG);
      });
  }

  renderError(){
    const {
      error
    } = this.state;
    if(typeof(error)==='string'){
      return <Alert type='danger'>{error}</Alert>;
    }
    if(error.error && error.statusCode && error.message){
      return <Alert type='danger'><strong>{error.error} ({error.statusCode}):</strong> {error.message}</Alert>;
    }
    if(error.error && error.message){
      return <Alert type='danger'><strong>{error.error}:</strong> {error.message}</Alert>;
    }
    if(error.message){
      return <Alert type='danger'>{error.message}</Alert>;
    }
    return <Alert type='danger'><pre>{JSON.stringify(error, null, 2)}</pre></Alert>;
  };

  render(){
    const Child = this.props.child;
    if(this.state.state === 'error'){
      return this.renderError();
    }
    return <Child {...this.state} />;
  }
};

export default Config;
