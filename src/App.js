import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import Button from "@mui/material/Button";
import { useMode, ColorModeContext } from "./theme/Theme";
import "./App.css";

import TopAppBar from "./components/TopAppBar";
import Language from "./components/Language";
import { Outlet } from "react-router";

function App() {
  return (
    <div className="App">
      <TopAppBar props={window} />
      <Language />
      <Outlet />
    </div>
  );
}

export default App;
