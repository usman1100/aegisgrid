import { createTheme } from "@mui/material/styles";
import { lime, grey } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: lime[500],
    },
    secondary: {
      main: grey[800],
    },
  },
});
