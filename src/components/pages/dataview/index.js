import React from 'react';

import {
  Provider
} from 'martingale-provider';

import {
  Panel,
  PanelFooter,
  PanelTitle,
  ActionTable,
  Table,
  JsonView
} from 'martingale-ui-components';

import {
  betterType
} from 'martingale-utils';

import Page from '../page';

import {PageHeader} from '../header';

const View = ({data, actions, footerContents, inset = true, ...props})=>{
  if(!data){
    return (
        <Panel inset={true}>
          <span className="loading">Loading...</span>
        </Panel>
      );
  }
  const dataType = betterType(data);
  const wrap = (children, {inset = true})=>{
    return (
        <Panel inset={inset}>
          {children}
          {footerContents}
        </Panel>
      );
  };
  if(dataType === 'array'){
    if(actions){
      return wrap(<ActionTable data={data} actions={actions} {...props} />, {inset: false});
    }
    return wrap(<Table data={data} {...props} />, {inset: false});
  }
  return wrap(<JsonView json={data} inset={true} {...props} />, {inset});
};

const getFooterContents = (footer, props, defaultValue)=>{
  if(typeof(footer) === 'function'){
    return (
      <PanelFooter>
        {footer(props)}
      </PanelFooter>
    );
  }
  if(React.isValidElement(footer)){
    return (
      <PanelFooter>
        {footer}
      </PanelFooter>
    );
  }
  if(defaultValue){
    return (
      <PanelFooter>
        {defaultValue}
      </PanelFooter>
    );
  }
};

const DataViewPage=(props)=>{
  const {
    Icon,
    url,
    title,
    footer,
    mapper,
    root,
    ...rest
  } = props;
  const footerContents = getFooterContents(footer, props);
  const provide = {
    data: {
      url,
      mapper,
      root
    },
  };
  return (
    <Page>
      <PageHeader>{Icon?<PanelTitle>{React.createElement(Icon)} {title}</PanelTitle>:title}</PageHeader>
      <Provider
        Component={View}
        provide={provide}
        props={Object.assign(rest, {footerContents})}
        />
    </Page>
    );
};

export default DataViewPage;
