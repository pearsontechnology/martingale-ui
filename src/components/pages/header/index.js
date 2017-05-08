import React from 'react';

import Page from '../page';

import {
  Row,
  Col
} from 'martingale-ui-components';
import PageHeader from './pageheader';

const HeaderPage = ({Icon, title, children})=>{
  const pageTitle = Icon?<span>{React.createElement(Icon, {size: 32})} {title}</span>:title;
  return (
    <Page>
      <Row>
        <Col>
          <PageHeader>{pageTitle}</PageHeader>
        </Col>
      </Row>

      <Row>
        {children}
      </Row>
    </Page>
  );
};

export {
  HeaderPage,
  PageHeader
};
