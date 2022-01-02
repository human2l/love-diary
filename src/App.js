import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { blue, pink, grey, green, yellow } from "@material-ui/core/colors";
import { Navbar } from "./components/Navbar";
import { NewDiary } from "./pages/NewDiary";
import { Diarys } from "./pages/Diarys";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import styled from "styled-components";
import { useState } from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: pink[400],
    },
    secondary: {
      main: blue[400],
    },
    text: {
      primary: pink[400],
      light: pink[50],
    },
    white: grey[50],
    green: green[400],
    yellow: yellow[400],
  },
});

const AppContainer = styled("div")({
  height: "100vh",
});

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const login = () => {
    setAuthenticated(true);
  };
  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        {/* <Router>
          <Switch>
            {authenticated && (
              <>
                <Route exact path="/">
                  <Dashboard />
                </Route>
                <Route path="/new_diary">
                  <NewDiary />
                </Route>
                <Route path="/diarys">
                  <Diarys />
                </Route>
              </>
            )}
            <Route path="*">
              <Login login={login} />
            </Route>
          </Switch>
          {authenticated && <Navbar />}
        </Router> */}
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
