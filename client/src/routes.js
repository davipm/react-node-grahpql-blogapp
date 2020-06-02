import React from "react";
import { Switch, Route } from "react-router-dom";
import AuthRoute from "./pages/AuthRoute/AuthRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SinglePost from "./pages/SinglePost";

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <AuthRoute path="/login" component={Login} />
      <AuthRoute path="/register" component={Register} />
      <Route path="/posts/:postId" component={SinglePost} />
    </Switch>
  );
}

export default Routes;
