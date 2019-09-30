import React from "react";
import PlacesNavigator from "./navigation/PlacesNavigator";
import store from "./store";
import { Provider } from "react-redux";

const App = () => (
  <Provider store={store}>
    <PlacesNavigator />;
  </Provider>
);

export default App;
