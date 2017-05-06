import React from 'react';

import {
  Panel,
  PanelFooter,
  PanelTitle,
  Table
} from 'martingale-ui-components';
import Page from '../page';

const getFooterContents = (footer, props, defaultValue)=>{
  if(typeof(footer) === 'function'){
    return footer(props);
  }
  if(React.isValidElement(footer)){
    return footer;
  }
  return footer || <div>Count {defaultValue}</div>
};

const ListingPage = (props)=>{
  const {
      Icon,
      url,
      items=[],
      Listing=Table,
      title,
      footer,
      mapper,
      root,
      inset,
      ...rest
    } = props;
  const footerContents = getFooterContents(footer, props, items.length);
  return (
    <Page>
      <Panel header={Icon?<PanelTitle>{React.createElement(Icon)} {title} ({items.length})</PanelTitle>:title}>
        <Listing data={items} url={url} mapper={mapper} mapRoot={root} {...rest} />
        <PanelFooter>
          {footerContents}
        </PanelFooter>
      </Panel>
    </Page>
  );
};

export default ListingPage;
