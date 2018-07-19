import React from 'react';

import {
  Provider
} from '@martingale/provider';

import {
  PanelFooter,
  DataView
} from '@martingale/ui-components';

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

const DataViewPanel=(props)=>{
  const {
    url,
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
      <Provider
        Component={DataView}
        provide={provide}
        props={Object.assign(rest, {footerContents})}
        />
    );
};

export default DataViewPanel;
