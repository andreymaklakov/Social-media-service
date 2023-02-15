import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Login from "./layouts/login";
import Users from "./layouts/users";
import Main from "./layouts/main";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";
import AppLoader from "./components/ui/hoc/appLoader";

function App() {
  return (
    <>
      <AppLoader>
        <NavBar />

        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/login/:type?" component={Login} />
          <ProtectedRoute
            exact
            path="/users/:userId?/:edit?"
            component={Users}
          />
          <Route exact path="/logout" component={LogOut} />

          <Redirect to="/" />
        </Switch>
      </AppLoader>

      <ToastContainer />
    </>
  );
}

export default App;
