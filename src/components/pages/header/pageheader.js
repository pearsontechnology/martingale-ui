import React from 'react';

const PageHeader = ({title, children})=>{
  const pageTitle = title || children;
  return (
    <div className="clearfix">
      <h1 className="page-header">
        {pageTitle}
      </h1>
    </div>
  );
};

export default PageHeader;
