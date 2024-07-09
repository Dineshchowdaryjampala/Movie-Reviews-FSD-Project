import { createTheme } from "@mui/material/styles";
import { colors } from "@mui/material";

export const themeModes = {
  dark: "dark",
  light: "light"
};

const themeConfigs = {
  custom: ({ mode }) => {
    const customPalette = mode === themeModes.dark
      ? {
          primary: {
            main: "#FFC107", // Yellow
            contrastText: "#ffffff" // Black text for better contrast on yellow
          },
          secondary: {
            main: "#FFD54F", // Lighter yellow
            contrastText: "#ffffff"
          },
          background: {
            default: "#212121", // Dark gray
            paper: "#424242" // Slightly lighter gray
          }
        }
      : {
          primary: {
            main: "#FFC107" // Yellow
          },
          secondary: {
            main: "#FFD54F" // Lighter yellow
          },
          background: {
            default: colors.yellow["50"], // Very light yellow background
          }
        };

    return createTheme({
      palette: {
        mode,
        ...customPalette
      },
      components: {
        MuiButton: {
          defaultProps: {
            disableElevation: true
          }
        }
      }
    });
  }
};

export default themeConfigs;