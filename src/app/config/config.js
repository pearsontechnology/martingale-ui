import React from 'react';
import {
  fetch
} from '@martingale/utils';
import linkSpecs from './specs';
import linkPacks from './packs';
import linkSideNav from './sidenav';

import {Error} from '@martingale/ui-components';

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
          this.trapError((config)=>this.setState(Object.assign(config, {state: 'loaded'})))
        )
      )
    );
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
    return <Error error={error} />;
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
