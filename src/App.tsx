import { FC, ReactElement, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { RootStore, StoreContext } from "./stores";
import { Main } from "./components";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import HeaderBar from './components/headerBar';

const myTheme = createTheme({
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      "\"Segoe UI\"",
      "Roboto",
      "\"Helvetica Neue\"",
      "Arial",
      "sans-serif",
      "\"Apple Color Emoji\"",
      "\"Segoe UI Emoji\"",
      "\"Segoe UI Symbol\"",
    ].join(","),
  }
});

const App: FC = (): ReactElement => {
  const stores = new RootStore();

  return (
    <StoreContext.Provider value={stores}>
      <ThemeProvider theme={myTheme}>
        <CssBaseline />
        <HeaderBar />
        <Main />
      </ThemeProvider>
    </StoreContext.Provider>
  );
};

export default App;