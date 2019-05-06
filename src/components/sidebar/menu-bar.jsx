import React from 'react';
import menus from '@constants/menu';
import { NavLink } from 'react-router-dom';
import Icon from '@components/icon';
import classes from './menu-bar.less';
const Menubar = () => {
  return (
    <div className={classes.menu}>
      <ul className={classes.menuList}>
        {
          menus.map(menu => (
            <li key={menu.name}>
              <NavLink to={menu.path} activeClassName={classes.active} className={classes.name}>
                <Icon type={menu.icon} />
                <span>
                  {
                    menu.name
                  }
                </span>
              </NavLink>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default React.memo(Menubar);