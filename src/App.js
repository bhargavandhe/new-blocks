// import Router from "./routes";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Page404 from "./pages/Page404";
import Register from "./pages/Register";
import Details from "./pages/Details";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/login" component={Login} />
          <Route path="/details" component={Details} />
          <Route path="/register" component={Register} />
          <Route path="" component={Page404} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
