import React from 'react';
import classes from './index.less';
import Menubar from './menu-bar';

const Sidebar = () => {

  return (
    <aside className={classes.container}>
      <Menubar />
    </aside>
  )
}

export default React.memo(Sidebar);