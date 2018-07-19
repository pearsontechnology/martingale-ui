import React from 'react';

import {
  Panel,
  PanelFooter,
  PanelTitle,
  JsonView
} from '@martingale/ui-components';

import{
  Provider
} from '@martingale/provider';

import Page from '../page';

import {PageHeader} from '../header';

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

const ProvidedPage = (props)=>{
  const {
    Icon,
    url,
    Component=JsonView,
    title,
    footer,
    mapper,
    root,
    inset = false,
    dataKey='data',
    ...rest
  } = props;
  const provide = {
    [dataKey]: {
      url,
      mapper,
      root
    }
  };
  const footerContents = getFooterContents(footer, props);
  return (
    <Page>
      <PageHeader>{Icon?<PanelTitle>{React.createElement(Icon)} {title}</PanelTitle>:title}</PageHeader>
      <Panel inset={inset}>
        <Provider
          Component={Component}
          provide={provide}
          props={rest}
          />
        {footerContents}
      </Panel>
    </Page>
  );
};

export default ProvidedPage;
