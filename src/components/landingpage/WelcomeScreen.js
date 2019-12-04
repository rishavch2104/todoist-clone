import React from "react";
import Navbar from "../Navbar";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/styles";
import DialogAuth from "./DialogAuth";

import backgroundImage from "./../../img/todoistfinal.jpg";

const useStyles = makeStyles({
  root: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  },
  image: {
    width: "80%",
    maxWidth: "700px",
    height: "auto"
  }
});

const WelcomeScreen = () => {
  const styles = useStyles();
  return (
    <div>
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
            <Typography
              align="center"
              style={{ marginBottom: "3rem" }}
              variant="h1"
            >
              Organise it all with Todoist!
            </Typography>
            <DialogAuth buttons={[{ name: "Get Started", value: "signup", props: {variant: 'contained', color: 'primary'} }]} />
          </Box>
        </Grid>
        <Grid style={{display:"flex", justifyContent:"center"}} item lg={6} sm={12}>
          <img className={styles.image} src={backgroundImage} alt="back"></img>
        </Grid>
      </Grid>
    </div>
  );
};

export default WelcomeScreen;
