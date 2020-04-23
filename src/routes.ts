import { FunctionComponent } from 'react';
import { Home, Memory } from './pages';

export enum Path {
    Home = '/',
    Memory = '/memory',
}

interface Route {
    path: Path;
    component: FunctionComponent;
    routes?: Route[];
    exact?: boolean;
}

export const routes: Route[] = [
    { path: Path.Home, component: Home, exact: true },
    { path: Path.Memory, component: Memory },
];
