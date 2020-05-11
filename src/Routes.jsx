import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  LandingPage,
  AddArticle,
  Article
} from './components';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route path="/addarticle" component={AddArticle} />
    <Route path="/viewarticle/:articleKey" component={Article} />
  </Switch>
);

export default Routes;