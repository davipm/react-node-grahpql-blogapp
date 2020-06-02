import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AuthRoute from "./pages/AuthRoute/AuthRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SinglePost from "./pages/SinglePost";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <AuthRoute path="/login" component={Login} />
        <AuthRoute path="/register" component={Register} />
        <Route path="/posts/:postId" component={SinglePost} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
