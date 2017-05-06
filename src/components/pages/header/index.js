import React from 'react';

import Page from '../page';

import {
  Row,
  Col
} from 'martingale-ui-components';

const HeaderPage = ({Icon, title, children})=>{
  const pageTitle = Icon?<span>{React.createElement(Icon, {size: 32})} {title}</span>:title;
  return (
    <Page>
      <Row>
        <Col>
          <h1 className="page-header">
            {pageTitle}
          </h1>
        </Col>
      </Row>

      <Row>
        {children}
      </Row>
    </Page>
  );
};

export default HeaderPage;
