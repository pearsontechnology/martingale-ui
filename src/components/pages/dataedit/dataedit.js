import React from 'react';

import {
  Provider
} from 'martingale-provider';

import {
  PanelTitle,
  Panel,
  Form
} from 'martingale-ui-components';

import Page from '../page';

import {PageHeader} from '../header';

const DataEditPage = (props)=>{
  const {
    Editor = Form,
    source,
    Icon,
    url,
    title,
    footer,
    mapper,
    root,
    headers,
    inset = true,
    ...rest
  } = props;

  const provide = source?(()=>{
    if(typeof(source))==='string'){
      return {
        data: {
          url: source,
          mapper,
          root,
          headers
        }
      };
    }
    return source;
  })():{
    data: {
      url,
      mapper,
      root,
      headers
    }
  };

  const finalMapper = source?mapper:undefined;

  return (
    <Page>
      <PageHeader>{Icon?<PanelTitle>{React.createElement(Icon)} {title}</PanelTitle>:title}</PageHeader>
      <Panel inset={inset}>
        <Provider
          Component={Editor}
          provide={provide}
          mapper={finalMapper}
          props={rest}
          />
      </Panel>
    </Page>
  );
};

export default DataEditPage;
