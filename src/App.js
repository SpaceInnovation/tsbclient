import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import history from "./history";
import rootReducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import ReduxThunk from "redux-thunk";
import indexRoutes from "./routes";

import "./App.css";

const middleWare = [ReduxThunk];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleWare))
);

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          {indexRoutes.map((prop, key) => {
            const { path, exact, Component } = prop;
            return (
              <Route
                path={path}
                exact={exact}
                key={key}
                render={(props) => <Component {...props} />}
              />
            );
          })}
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
