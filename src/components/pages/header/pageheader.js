import React from 'react';

const PageHeader = ({title, children})=>{
  const pageTitle = title || children;
  return (
    <h1 className="page-header">
      {pageTitle}
    </h1>
  );
};

export default PageHeader;
