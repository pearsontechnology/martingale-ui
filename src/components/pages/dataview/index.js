import React from 'react';

import {
  JsonView
} from 'martingale-ui-components';

import ProvidedPage from '../provided';

const DataViewPage=(props)=>{
  const {
    View=JsonView,
    ...rest
  } = props;
  return <ProvidedPage Component={View} inset={true} {...rest} />;
};

export default DataViewPage;
