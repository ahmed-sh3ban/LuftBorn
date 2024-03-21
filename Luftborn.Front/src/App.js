import logo from "./logo.svg";
import "./App.css";
import AppLayout from "./views/app-layout";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
