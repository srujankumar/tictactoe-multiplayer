import React from "react";
import ReactDom from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import App from "./components/App";
import Create from "./components/create";

ReactDom.render(
    <Router>
        <div>
            <Route path="/:game/:id/:secret" component={App} />
            <Route exact path="/" component={Create} />
        </div>
    </Router>,
    document.getElementById('root')
);

