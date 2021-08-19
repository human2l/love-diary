import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { blue, common, pink } from "@material-ui/core/colors";
import { Navbar } from "./components/Navbar";
import { NewDiary } from "./pages/NewDiary";
import { Diarys } from "./pages/Diarys";
import { Dashboard } from "./pages/Dashboard";

import { styled } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: pink[400],
    },
    secondary: {
      main: blue[400],
    },
    text: {
      primary: common.white,
    },
  },
});

const AppContainer = styled("div")({
  height: "100vh",
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <Router>
          <Switch>
            <Route exact path="/">
              <Dashboard />
            </Route>
            <Route path="/new_diary">
              <NewDiary />
            </Route>
            <Route path="/diarys">
              <Diarys />
            </Route>
          </Switch>
          <Navbar />
        </Router>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
