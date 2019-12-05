import React from "react";
import { withRouter } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useFormik } from "formik";
import * as Yup from "yup";
import { registerUser } from "../../firebase/auth";
import { addUser } from "../../firebase/db";

const useStyles = makeStyles(theme => ({
  main: {
    height: "50%",
    width: "auto",
    display: "block",
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit,

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  button: {
    color: theme.palette.primary.light
  }
}));

function SignUp(props) {
  const { history } = props;
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(2, "Too Short")
        .max(70, "Too Long")
        .required("Required"),
      lastName: Yup.string()
        .min(2, "Too Short")
        .max(70, "Too Long")
        .required("Required"),
      email: Yup.string()
        .email("Invalid email")
        .required("Required"),
      password: Yup.string()
        .min(6, "Too Short")
        .max(60, "Too long")
        .required("Required")
    }),
    onSubmit: async values => {
      registerUser(values.email, values.password).then(uid => {
        addUser({
          firstName: values.firstName,
          lastName: values.lastName,
          userId: uid,
          darkMode: false
        });
        redirect();
      });
    }
  });
  const redirect = () => {
    history.push("/home");
  };

  return (
    <Box className={classes.main}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">Sign Up</Typography>

        <form onSubmit={formik.handleSubmit}>
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="first-name">First Name</InputLabel>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div>{formik.errors.firstName}</div>
            ) : null}
          </FormControl>
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="last-name">Last Name</InputLabel>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <div>{formik.errors.lastName}</div>
            ) : null}
          </FormControl>
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}
          </FormControl>
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.passwor && formik.errors.passwor ? (
              <div>{formik.errors.password}</div>
            ) : null}
          </FormControl>
          <Button
            variant="contained"
            type="submit"
            fullWidth
            color="secondary"
            className={classes.submit}
          >
            Sign Up
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default withRouter(SignUp);
