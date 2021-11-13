// import Router from "./routes";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Page404 from "./pages/Page404";
import Register from "./pages/Register";
import Details from "./pages/Details";
import PrivateRoute from "./components/PrivateRoute";
import Update from "./pages/Update";
import Requests from "./pages/Requests";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />
          <Route path="/login" component={Login} />
          <Route path="/details" component={Details} />
          <Route path="/register" component={Register} />
          <Route path="/update" component={Update} />
          <Route path="/requests" component={Requests} />
          <Route path="" component={Page404} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
