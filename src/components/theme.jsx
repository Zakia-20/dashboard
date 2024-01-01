// theme.js
import { ThemeProvider, createTheme } from '@mui/system';

const theme = createTheme({
  palette: {
    primary: {
      main: '#45464E',
      pink: '#D23565',
      primary50: "#97A5EB",
      gray: "#EEF0FA"
    },
    secondary: {
      main: '#D23565',
      secondary1: '#D235651A',
      secondary2: '#0D062D',
      secondary3: '#787486',
      secondary4: '#F1F3F9',
      secondary5: '#8B8D97',
      secondary6: '#BEC0CA',
      secondary7: '#45464E',
      black20: "#A6A8B1",
      secondary8: "#FFCC91",
      
    },
  },
  typography: {
    fontFamily: '"Poppins", "DM Sans", "DM Mono", monospace, "Inter", sans-serif',
    fontWeightRegular: 400, 
    fontWeightMedium: 500,  
    fontWeightBold: 700,    
  },
  
});

export default theme;
