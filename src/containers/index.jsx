import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import classes from './index.less';
import Sidebar from '@components/sidebar';
import Header from '@components/header';
import menus from '@constants/menu';
/* <% customChunkName begin %> */
/* will dynamicChunkLoader code here !!! */
/* <% customChunkName end %> */
export default class Index extends React.Component {

  router = () => {
    const routers = [];

    menus.forEach(menu => {
      const Component = lazy(() => dynamicChunkLoader(menu.dir));
      routers.push(
        <Route
          path={menu.path}
          key={menu.name}
          component={
            (props) => (
              <Suspense fallback={<div>加载中</div>}>
                <Component {...props} />
              </Suspense>
            )
          } />
      )
    });
    const redirect = <Redirect to={`/aaa`} key={`aaa`} />;
    return [...routers, redirect];
  }

  render() {
    return (
      <Router>
        <main className={classes.main}>
          <Header />
          <div className={classes.container}>
            <Sidebar />
            <div className={classes.content}>
              <Switch>
                {this.router()}
              </Switch>
            </div>

          </div>
        </main>
      </Router>
    )
  }
}