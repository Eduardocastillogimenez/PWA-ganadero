import React, { lazy, Suspense } from "react";
import './App.less';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Error from 'componentes/errores/error404';
import Footer from 'componentes/footer';

import Auth0ProviderWithHistory from "auth";

// const Pool = require("pg").Pool;

// const pool = new Pool({
//   user: "postgres",
//   password: "jcgl2021",
//   host: "localhost",
//   port: 5432,
//   database: "appgestacion"
// });

// pool.connect();
// import axios from "axios";

// axios.create({
//   baseURL: "http://localhost:5432/palpaciones ",
//   headers: {
//     "Content-type": "application/json"
//   }
// });

const Home = lazy(() => import('views/home'));
const Login = lazy(() => import('views/login'));
const ModoOffline = lazy(() => import('views/modoOffline'));

const App = () => (
  <Auth0ProviderWithHistory>
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/">
          <Login/>
        </Route>
        <Route path="/welcome">
          <Home/>
        </Route>
        <Route exact path="/offline">
          <ModoOffline />
        </Route>
        <Route path="*">
          <Error />
        </Route>
      </Switch>
    </Suspense>
    <Footer/>
  </Router>
  </Auth0ProviderWithHistory>
);

export default App;