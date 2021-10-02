import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Pages/Home";
import Gallery from "./components/Pages/Gallery";
import NotFound from "./components/Pages/404";
import Login from "./components/Pages/Login";
import SignUp from "./components/Pages/SignUp";
import Dashboard from "./components/Pages/Dashboard";

function App() {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/gallery" component={Gallery} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route path="*" component={NotFound} />
            </Switch>
        </Router>
    );
}

export default App;
