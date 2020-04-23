import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { routes, Path } from './routes';

function App() {
    return (
        <BrowserRouter>
            <Switch>
                {routes.map((route, i) => (
                    <Route
                        exact={route.exact}
                        key={i}
                        path={route.path}
                        component={route.component}
                    />
                ))}
            </Switch>
        </BrowserRouter>
    );
}

export default App;
