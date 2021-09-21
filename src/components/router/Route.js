import React from 'react';
import { Route as ReactRoute } from 'react-router-dom';
import { Content, Header, Sidebar } from '../layout/index.js';

const Route = ({ children, ...rest }) => {
  return (
    <ReactRoute {...rest}>
      <Header />
      <Sidebar />
      <Content>
        {children}
      </Content>
    </ReactRoute>
  );
};

export { Route };