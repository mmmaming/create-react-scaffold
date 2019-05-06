import React from 'react';
import classes from './index.less';
const Header = () => {
  return (
    <div className={classes.container}>
      React
    </div>
  )
}

export default React.memo(Header);