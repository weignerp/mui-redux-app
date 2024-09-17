import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import Button from "@mui/material/Button";
import { Box, Grid } from "@mui/material";
import { useMode, ColorModeContext } from "./theme/Theme";
import "./App.css";

import TopAppBar from "./components/TopAppBar";
import Language from "./components/Language";
import { Outlet, Route, Routes } from "react-router";
import Chart from "./components/Chart";
import ErrorPage from "./screens/ErroPage";
import MyErrorBoundary from "./components/MyErrorBoundary";

export const HomePage = () => {
  return (
    <Box className="App" sx={{ px: 5 }}>
      <TopAppBar props={window} />
      <Box
        sx={{
          position: "relative",
          mt: 10,
          p: 1,
          display: "grid",
          gap: 1,
          gridTemplateColumns: "repeat(2, 1fr)",
        }}
      >
        <Chart />
      </Box>

      <Language />
      <Outlet />
    </Box>
  );
};

function App() {
  return (
    <ErrorBoundary FallbackComponent={MyErrorBoundary}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
