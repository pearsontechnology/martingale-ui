import React from 'react';

import {
  ContainerFluid
} from '@martingale/ui-components';

const NoMatch = ({ location }) => (
  <ContainerFluid>
    <h3>No match for <code>{location.pathname}</code></h3>
  </ContainerFluid>
);

export {
  NoMatch
};
