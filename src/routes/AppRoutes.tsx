import React from 'react';
import { Route, Switch } from 'wouter';
import { routesList } from './routesList';

export const AppRoutes: React.FC = () => (
  <Switch>
    {routesList.map((data) => (
      <Route path={data.url} key={data.url}>
        {data.content}
      </Route>
    ))}
    <Route>
      <h1>Page not found</h1>
    </Route>
  </Switch>
);
