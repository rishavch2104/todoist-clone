import { responsiveFontSizes, createMuiTheme } from "@material-ui/core";

let muithemeLight = createMuiTheme({
  overrides: {
    MuiButton: {}
  },
  palette: {
    primary: {
      main: "#575A89",
      light: "#3F3D56"
    },
    secondary: {
      main: "#3F3D56"
    }
  }
});

muithemeLight = responsiveFontSizes(muithemeLight);

let muithemeDark = createMuiTheme({
  overrides: {
    root: {
      background: "#1E1E1E"
    }
  },
  palette: {
    primary: {
      main: "#282828"
    },
    secondary: {
      main: "#363333"
    }
  }
});
muithemeDark = responsiveFontSizes(muithemeDark);

export { muithemeLight, muithemeDark };
