import React from 'react';

import {
  Table,
} from '@martingale/ui-components';

import ProvidedPage from '../provided';

const ListingPage = (props)=>{
  const {
      Listing=Table,
      ...rest
    } = props;
  return <ProvidedPage Component={Listing} {...rest} />;
};

export default ListingPage;
