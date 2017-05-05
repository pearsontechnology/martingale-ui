import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import {
  ContainerFluid
} from 'martingale-ui-components';

import Nav from '../components/nav';

const Pages = {
  home(){
    return <div>Welcome</div>
  }
};

const NoMatch = ({ location }) => (
  <ContainerFluid>
    <h3>No match for <code>{location.pathname}</code></h3>
  </ContainerFluid>
);

const App = ()=>{
  const routes = Object.keys(Pages).map((route)=>{
    return <Route key={route} exact path={`/${route}`} render={(match)=>{
      const params = (match.match||{}).params;
      const page = React.createElement(Pages[route], params);
      return page;
    }} />
  });
  return (
    <Router>
      <div id="wrapper">
        <Nav />
        <div id="page-wrapper">
          <Route render={({ location }) => (
              <Switch key={location.pathname} location={location}>
                <Route exact path="/" render={(match)=>{
                  return React.createElement(Pages.home, match.params);
                }} />
                {routes}
                <Route component={NoMatch}/>
              </Switch>
          )}/>
        </div>
      </div>
    </Router>
  );
};

export default App;
