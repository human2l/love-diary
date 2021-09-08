import { useState } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withTheme } from "@material-ui/core/styles";
import styled from "styled-components";

const LoginLabel = withTheme(styled(Typography)`
  color: ${(props) => props.theme.palette.primary.main};
  background-color: ${(props) => props.theme.palette.text.light};
  border-radius: 50px;
  text-align: center;
`);

const LoginContainer = styled.div`
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const PasswordPad = styled.div`
  padding-top: 30px;
  padding-bottom: 50px;
`;
const PasswordButtonText = withTheme(styled(Typography)`
  color: ${(props) => props.theme.palette.white};
`);

export const Login = (props) => {
  const [password, setPassword] = useState("");
  const login = () => {
    password === "5181226" && props.login();
    setPassword("");
  };
  const onPasswordButtonClick = (buttonValue) => {
    setPassword(password + buttonValue);
  };

  return (
    <LoginContainer>
      <LoginLabel variant="h5">宝贝输一下密码哈</LoginLabel>
      <PasswordPad>
        <Grid
          container
          spacing={1}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Grid container item xs={12} spacing={1}>
            <Grid item xs={4}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  onPasswordButtonClick("1");
                }}
                style={{
                  borderRadius: "20px",
                  width: "100%",
                }}
              >
                <PasswordButtonText variant="h1">1</PasswordButtonText>
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  onPasswordButtonClick("2");
                }}
                style={{
                  borderRadius: "20px",
                  width: "100%",
                }}
              >
                <PasswordButtonText variant="h1">2</PasswordButtonText>
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  onPasswordButtonClick("3");
                }}
                style={{
                  borderRadius: "20px",
                  width: "100%",
                }}
              >
                <PasswordButtonText variant="h1">3</PasswordButtonText>
              </Button>
            </Grid>
          </Grid>
          <Grid container item xs={12} spacing={1}>
            <Grid item xs={4}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  onPasswordButtonClick("4");
                }}
                style={{
                  borderRadius: "20px",
                  width: "100%",
                }}
              >
                <PasswordButtonText variant="h1">4</PasswordButtonText>
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  onPasswordButtonClick("5");
                }}
                style={{
                  borderRadius: "20px",
                  width: "100%",
                }}
              >
                <PasswordButtonText variant="h1">5</PasswordButtonText>
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  onPasswordButtonClick("6");
                }}
                style={{
                  borderRadius: "20px",
                  width: "100%",
                }}
              >
                <PasswordButtonText variant="h1">6</PasswordButtonText>
              </Button>
            </Grid>
          </Grid>
          <Grid container item xs={12} spacing={1}>
            <Grid item xs={4}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  onPasswordButtonClick("7");
                }}
                style={{
                  borderRadius: "20px",
                  width: "100%",
                }}
              >
                <PasswordButtonText variant="h1">7</PasswordButtonText>
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  onPasswordButtonClick("8");
                }}
                style={{
                  borderRadius: "20px",
                  width: "100%",
                }}
              >
                <PasswordButtonText variant="h1">8</PasswordButtonText>
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  onPasswordButtonClick("9");
                }}
                style={{
                  borderRadius: "20px",
                  width: "100%",
                }}
              >
                <PasswordButtonText variant="h1">9</PasswordButtonText>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </PasswordPad>
      <Button variant="contained" color="primary" size="large" onClick={login}>
        登录
      </Button>
    </LoginContainer>
  );
};
