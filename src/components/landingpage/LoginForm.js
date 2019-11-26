import React, { useState, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { withRouter } from "react-router-dom";
import useToggle from "../../hooks/useToggle";
import styles from "../../styles/landingpageStyles/StyleLoginForm";
import { loginUser } from "../../firebase/auth";
import useForm from "../../hooks/useForm";
import { BrowserRouter, Redirect } from "react-router-dom";

function LoginForm(props) {
  const { classes, history } = props;
  // const { values, handleChange } = useForm({ email: "", password: "" });
  const [loginError, toggleLoginError] = useToggle(false);

  const [formValues, setFormValues] = useState({ email: "", password: "" });

  function handleChange(e) {
    e.preventDefault();
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  }

  const onSignInClicked = (e, email, password) => {
    e.preventDefault();
    console.log(email);

    loginUser(email, password)
      .then(signedInUser => {
        console.log(signedInUser);
        history.push("/home");
      })
      .catch(e => {
        console.log(e);
      });
    // if (signedInUser !== true) {
    //   console.log("redirect");
    // }
    // console.log(signedInUser);
    // console.log(loggedin);

    // if (signedInUser) {
    //   this.props.history.push("/home");
    // }
    // if (!signedInUser && !loginError) {
    //   toggleLoginError();
    // }
  };

  return (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">signIn</Typography>

        <form className={classes.form}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">email</InputLabel>
            <Input
              value={formValues.email}
              onChange={handleChange}
              id="email"
              name="email"
              autoFocus
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">password</InputLabel>
            <Input
              value={formValues.password}
              onChange={handleChange}
              id="password"
              name="password"
            />
          </FormControl>
          <FormControlLabel
            control={<Checkbox color="primary" />}
            label="remember"
          />
          <Button
            variant="contained"
            type="submit"
            fullWidth
            color="primary"
            className={classes.submit}
            onClick={e => {
              onSignInClicked(e, formValues.email, formValues.password);
            }}
          >
            signIn
          </Button>
          {loginError && (
            <Typography>Please Check Email and Password</Typography>
          )}
        </form>
      </Paper>
    </main>
  );
}
export default withStyles(styles)(withRouter(LoginForm));
