import React from 'react';
import Routes from './Routes';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
  <BrowserRouter basename='/'>
    <Header />
    <Routes />
  </BrowserRouter>
);

export default App;
