import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import { Provider } from 'react-redux';
import store from './store/store';
import Sidebar from "./components/Sidebar.jsx";

createRoot(document.getElementById("root")).render(
  <Router>
    <Provider store={store}>
      <div className="w-screen flex">
        <Sidebar className="h-full w-fit top-0 left-0" />
        <App />
      </div>
    </Provider>
  </Router>
);
