import React from 'react';
const Icon = ({ type }) => {
  return (
    <i>{type}</i>
  )
};

export default React.memo(Icon);