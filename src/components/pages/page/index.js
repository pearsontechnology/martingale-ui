import React from 'react';

import {
  ContainerFluid
} from 'martingale-ui-components';

const Page = ({children})=>{
  return (
    <ContainerFluid>
      {children}
    </ContainerFluid>
  );
};

export default Page;
