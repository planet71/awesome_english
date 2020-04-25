import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { routes } from './routes';
import styles from './App.module.scss';

function App() {
    return (
        <div className={styles.wrapper}>
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
        </div>
    );
}

export default App;
