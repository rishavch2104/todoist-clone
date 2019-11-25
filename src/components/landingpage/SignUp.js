import React, { useState } from "react";
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
import styles from "../../styles/landingpageStyles/StyleLoginForm";
import { registerUser } from "../../firebase/auth";
import useForm from "../../hooks/useForm";

function Form(props) {
  const { classes } = props;
  // const { signUp, setsignUp } = useState({
  //   email: "",
  //   password: "",
  //   firstName: "",
  //   lastName: "",
  //   rePassword: ""
  // });
  const [signUp, setSignUp] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    rePassword: ""
  });
  console.log(signUp);
  console.log(signUp);
  const [signUpError, toggleSignupError] = useState(false);

  function handleChange(e) {
    e.preventDefault();
    setSignUp({ ...signUp, [e.target.name]: e.target.value });
  }

  const onRegisterClicked = async (e, email, password) => {
    e.preventDefault();
    console.log(email);

    const signedUpUser = await registerUser(email, password);
    // .then(() => {
    //   this.props.history.push("/home");
    // })
    // .catch(e => {
    //   toggleSignupError();
    // });

    console.log({ signedUpUser });

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
        <Typography variant="h5">signUp</Typography>

        <form className={classes.form}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="firstname">First Name</InputLabel>
            <Input
              id="firstname"
              name="firstName"
              value={signUp.firstName}
              onChange={handleChange}
              autoFocus
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="lastname">Last Name</InputLabel>
            <Input
              id="lastname"
              name="lastName"
              value={signUp.lastName}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">email</InputLabel>
            <Input
              id="email"
              name="email"
              value={signUp.email}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">password</InputLabel>
            <Input
              id="password"
              name="password"
              value={signUp.password}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Re-enter password</InputLabel>
            <Input
              id="password"
              name="rePassword"
              value={signUp.rePassword}
              onChange={handleChange}
            />
          </FormControl>
          <FormControlLabel
            control={<Checkbox color="primary" />}
            label="remember"
          />
          {signUpError && <Typography>Please Check Entered Details</Typography>}
          <Button
            onClick={e => onRegisterClicked(e, signUp.email, signUp.password)}
            variant="contained"
            type="submit"
            fullWidth
            color="primary"
            className={classes.submit}
          >
            signIn
          </Button>
        </form>
      </Paper>
    </main>
  );
}
export default withStyles(styles)(Form);
