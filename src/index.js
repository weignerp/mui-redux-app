import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { ThemeProvider } from "@mui/material";
import { useMode, ColorModeContext } from "./theme/Theme";
import Dashboard from "./screens/Dashboard";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import Select from "./components/Select";

const AppContainer = () => {
  const [theme, colorMode] = useMode();
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <App />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
        ],
      },
      {
        path: "select",
        element: <Select />,
      },
    ] /* ,
    {
      basename: "/",
      future: {
        // Normalize `useNavigation()`/`useFetcher()` `formMethod` to uppercase
        v7_normalizeFormMethod: true,
      },
    } */
  );

  return (
    <React.StrictMode>
      <Provider store={store}>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <RouterProvider router={router}></RouterProvider>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </Provider>
    </React.StrictMode>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<AppContainer />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
