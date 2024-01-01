import * as React from 'react';
import Toolbar from '@mui/material/Toolbar'; 
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import logo from '../assets/icons/logo.png'
import Link from '@mui/material/Link';

//icons
import NotificationsIcon from '@mui/icons-material/Notifications';
import HomeIcon from '@mui/icons-material/Home';


// Palette de couleurs
const theme = createTheme({
    palette: {
      primary: {
        main: '#45464E', 
      },
      secondary: {
        main: '#D23565', 
        secondary1:  '#D235651A',
        secondary2: '#0D062D',
        secondary3: "#787486",
        secondary4: "#F1F3F9",
        secondary5: "#8B8D97"
      },
      
    },

    typography: {
        fontFamily: '"DM Sans", "DM Mono, monospace, sans-serif',
      
        
      },
  });

  //colors
const darkGray=theme.palette.primary.main
const darkPink = theme.palette.secondary.main
const bgPink = theme.palette.secondary.secondary1
const textColorP= theme.palette.secondary.secondary2
const textColorS= theme.palette.secondary.secondary3
const bordColor = theme.palette.secondary.secondary4
const Black30 = theme.palette.secondary.secondary5
//font
const Dm= theme.typography.fontFamily
const DmMono = theme.typography.fontFamily

//pages

const pages = ["Page", "Page", "Page", "Page"]

export const Navbar = () => {
    
    const badgeStyle = {
        background: darkPink,
        position: 'absolute',
        top: '3px',
        right: '3px',
        width: '14px',
        height: '14px',
        borderRadius: '60px',
        fontSize: '6px',
        color: "white",
        textAlign: "center",
        display:"flex",
        alignItems: "center",
        justifyContent: "center"
                };
  return (
    <React.Fragment>
    <Toolbar sx={{ borderBottom: 1, borderColor: bordColor }}>
      
      <Typography
        component="h1"
        variant="h1"
        noWrap
        sx={{ flex: 1 ,
             color: darkGray,
            fontWeight: 500,
            fontSize: "20px",
            fontFamily: Dm,
        }}
      >
      Dashboard
      </Typography>
      <IconButton sx= {{position: "relative"}} >
      <Box style={badgeStyle}>1</Box>  <Badge style={{color: "white", }}
       
        >
       <NotificationsIcon sx= {{
            color: darkPink,
            fontSize: 18,
            background: bgPink,
            borderRadius: 60,
            padding: "6px",
           

        }}></NotificationsIcon>
      </Badge>
      
      </IconButton>
      
       <Box sx={{display:"flex", gap:2, marginLeft: 4}}>
        <Box>

            <Typography variant="body2" sx={{
                fontWeight: 400,
                fontSize: 14,
                textAlign: "right",
                fontFamily: Dm,
                color: textColorP

            }}>Anima Agrawal</Typography>
            <Typography variant="subtitle2" 
            sx={{
                fontWeight: 400,
                fontSize: 12,
                textAlign: "right",
                color: textColorS,
                fontFamily: DmMono
            }}>
                Anima Agrawal</Typography>

        </Box>
       
        
            <img src={logo} alt=""  />
       </Box>
        
      
    </Toolbar>
    <Toolbar
      // component="nav"
      // variant="dense"
      sx={{  overflowX: 'auto' }}
    >
      <HomeIcon sx= {{
            color: darkPink,
            fontSize: 18,
            marginRight: "8px"
            }}>

      </HomeIcon>
      {pages.map((page, index) => (
        <Link
          variant="body2"
          // href={section.url}
          key= {index}
          sx={{
             flexShrink: 0,
              paddingRight: "8px",
              textAlign:"center",
             textDecoration: "none",
            color: Black30}}
        >
           <Typography component="span" sx={{marginRight: "8px"}}>
            /
          </Typography>
           {page}
        </Link>
      ))}
    </Toolbar>
  </React.Fragment>
  )
}
