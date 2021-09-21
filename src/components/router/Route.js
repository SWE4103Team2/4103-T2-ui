import React from 'react';
import { Route as ReactRoute } from 'react-router-dom';
import { Content } from '../layout/index.js';

const Route = ({ children, ...rest }) => {
  return (
    <ReactRoute {...rest}>
      <Content>
        {children}
      </Content>
    </ReactRoute>
  );
};

export { Route };