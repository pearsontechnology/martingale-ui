import React from 'react';
import {
  fetch
} from 'martingale-utils';
import linkSpecs from './specs';
import linkPacks from './packs';
import linkSideNav from './sidenav';

const DEFAULT_CONFIG = {state: 'noconfig'};

class Config extends React.Component{
  constructor(){
    super();
    this.state = {state: 'loading'};
  }

  configurationLoaded(config = {}){
    linkSpecs(config,
      (err, config)=>linkPacks(config,
        (err, config)=>linkSideNav(config,
          (err, config)=>this.setState(Object.assign(config, {state: 'loaded'})))));
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

  render(){
    const Child = this.props.child;
    return <Child {...this.state} />;
  }
};

export default Config;
