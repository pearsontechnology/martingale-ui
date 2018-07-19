import React from 'react';

import {
  Provider
} from '@martingale/provider';

import {
  PanelFooter,
  PanelTitle,
  DataView
} from '@martingale/ui-components';

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
    provide: explicitProvide,
    url,
    title,
    footer,
    mapper,
    root,
    refresh,
    headers,
    mode,
    method,
    ...rest
  } = props;
  const footerContents = getFooterContents(footer, props);
  const provide = explicitProvide?explicitProvide:{
    data: {
      url,
      mapper,
      root,
      refresh,
      headers,
      method,
      mode
    }
  };
  const finalMapper = explicitProvide?mapper:undefined;
  return (
    <Page>
      <PageHeader>{Icon?<PanelTitle>{React.createElement(Icon)} {title}</PanelTitle>:title}</PageHeader>
      <Provider
        Component={DataView}
        provide={provide}
        mapper={finalMapper}
        props={Object.assign(rest, {footerContents})}
        />
    </Page>
    );
};

export default DataViewPage;
