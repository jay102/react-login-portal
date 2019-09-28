import React from 'react';
import spinner from './spinner.gif';

export default () => {
  return (
    <img
      src={spinner}
      alt="Loading..."
      style={{ width: '50px', height: '50px' }}
    />
  );
};