import React from 'react';

// If we want a sidebar / header we add those components
// Then format this one with css so it doesn't overlap.
const Content = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  );
};

export default Content;