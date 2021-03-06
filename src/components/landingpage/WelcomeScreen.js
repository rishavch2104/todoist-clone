import React from "react";
import Navbar from "../Navbar";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/styles/makeStyles";
import DialogAuth from "./DialogAuth";
import backgroundImage from "./../../img/todoistfinal.jpg";

const useStyles = makeStyles({
  image: {
    width: "80%",
    maxWidth: "700px",
    height: "auto"
  },
  griditem: {
    display: "flex",
    justifyContent: "center"
  },
  heading: {
    marginBottom: "3rem"
  }
});

const WelcomeScreen = () => {
  const classes = useStyles();
  return (
    <>
      <Navbar />
      <Grid style={{ marginTop: "8rem" }} container>
        <Grid item lg={6} sm={12}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100%"
          >
            <Typography align="center" className={classes.heading} variant="h1">
              Organise it all with Todoist!
            </Typography>
            <DialogAuth
              buttons={[
                {
                  name: "Get Started",
                  value: "signup",
                  props: { variant: "contained", color: "primary" }
                }
              ]}
            />
          </Box>
        </Grid>
        <Grid className={classes.griditem} item lg={6} sm={12}>
          <img className={classes.image} src={backgroundImage} alt="back"></img>
        </Grid>
      </Grid>
    </>
  );
};

export default WelcomeScreen;
