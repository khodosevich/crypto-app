import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './components/Home';
import {  HashRouter } from 'react-router-dom';


ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement)
    .render(
        <React.StrictMode>
            <HashRouter>
                <Home />
            </HashRouter>
        </React.StrictMode>
    );