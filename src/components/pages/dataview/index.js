import React from 'react';

import {
  Provider
} from 'martingale-provider';

import {
  PanelFooter,
  PanelTitle,
  DataView
} from 'martingale-ui-components';

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

const DataViewPage=(props)=>{
  const {
    Icon,
    url,
    title,
    footer,
    mapper,
    root,
    refresh,
    headers,
    ...rest
  } = props;
  const footerContents = getFooterContents(footer, props);
  const provide = {
    data: {
      url,
      mapper,
      root,
      refresh,
      headers
    }
  };
  return (
    <Page>
      <PageHeader>{Icon?<PanelTitle>{React.createElement(Icon)} {title}</PanelTitle>:title}</PageHeader>
      <Provider
        Component={DataView}
        provide={provide}
        props={Object.assign(rest, {footerContents})}
        />
    </Page>
    );
};

export default DataViewPage;