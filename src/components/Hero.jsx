import React, { useEffect, useState } from 'react';
import {Grid, Card ,CardContent,Box,Typography,Paper,Button,Modal,TextField} from '@mui/material';
import { Select, MenuItem} from '@mui/material';

import { Container } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { BarChart,  BarPlot } from '@mui/x-charts/BarChart';


//icons
import Graph from '../assets/icons/Graph.png';
import Folder from '../assets/icons/Folder.png'
import shopping from '../assets/icons/shopping.png'
import Bag from '../assets/icons/Bag.png'
import Heart from "../assets/icons/Heart.png"
import User from '../assets/icons/User.png'
import BagIcon from "../assets/icons/BagIcon.png"

//theme
import theme from '../components/theme';

//
import axios from 'axios';

//import data
import localData from '../components/data/data.json'

//colors
// const darkGray = theme.palette.primary.main
// const darkPink = theme.palette.secondary.main
const bgPink = theme.palette.secondary.secondary1
// const textColorP = theme.palette.secondary.secondary2
// const textColorS = theme.palette.secondary.secondary3
// const bordColor = theme.palette.secondary.secondary4
const black30 = theme.palette.secondary.secondary5
const black10 = theme.palette.secondary.secondary6
const black60 = theme.palette.secondary.secondary7
const black20 = theme.palette.secondary.black20
const orange = theme.palette.secondary.secondary8
const pink = theme.palette.primary.pink
const primary50= theme.palette.primary.primary50
const gray = theme.palette.primary.gray

//font
  // Access font families
  const fontFamilies = theme.typography.fontFamily.split(',').map(font => font.trim());

  const [Poppins, DmSans, DmMono, Monospace, Inter, SansSerif] = fontFamilies;
  const fontw= theme.typography.fontWeightMedium


const size = {
  width: 400,
  height: 300,
};


export const Hero = () => {

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    axios.get("https://api.github.com/users")
      .then((res) => {
        console.log(res.data); 
        setUserData(res.data);
      })
      .catch((error) => {
        console.error("Error fetching GitHub data:", error);
      });
  }, []);


  const user = userData && userData.length > 0 ? userData[0] : null;
console.log('user:', user);

const data = [
  { value: user ? user.id : null, label: `User ${user ? user.id : null}`, color: '#EEF0FA' },
];
 

//add prod
  const [products, setProducts] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newProductQuantity, setNewProductQuantity] = useState('');

  const isProductAdded = () => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    return storedProducts.length > 0;
  };

  useEffect(() => {
    if (isProductAdded()) {
      setProducts(JSON.parse(localStorage.getItem('products')) || []);
    }
  }, []);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleAddProduct = () => {
    const newProduct = {
      name: newProductName,
      quantity: newProductQuantity,
    };
    const updatedProducts = [newProduct, ...products];
    setProducts(updatedProducts);

    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setNewProductName('');
    setNewProductQuantity('');

    closeModal();
  };

  useEffect(() => {
    // Clear local storage when the component mounts (on page refresh)
    localStorage.removeItem('products');
  }, []);

//sales filter
const [selectedOption, setSelectedOption] = useState('this-week');
const [selectedOption2, setSelectedOption2] = useState('this-week');
const [selectedOption3, setSelectedOption3] = useState('this-week');

const handleSelectChangeGeneric = (event, setSelected, localData) => {
  const value = event.target.value;

  // Ensure that the value is one of the keys in data
  if (localData.hasOwnProperty(value)) {
    setSelected(value);
  } else {
    console.error(`Invalid value selected: ${value}`);
    // Optionally handle or log the error, or set a default value
  }
};

const adjustedRadius = 7;
const adjustedWidth = 10; // Adjust the width as needed






  return (
 
    <Container maxWidth="xl" style={{ backgroundColor: "#EEF0FA", padding: 14,  overflow: 'hidden' ,  height: '100%'}}>
      <Grid container spacing={2}>
        {/* Première colonne (60%) */}
        <Grid item xs={8}>
          <Grid container spacing={2}>
            {/* First nested column (50% of the 60%) */}
            <Grid item xs={6}>
             
                <Grid item xs={12} >
                  <Card style={{borderRadius: 12,  boxShadow: "none"}}>
                    <CardContent>
                      <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Box style={{
                          backgroundColor: bgPink,
                          height: "20px",
                          width: "20px",
                          display: "flex",
                          justifyContent: "center",
                          padding: 8,
                          borderRadius: 5,
                        }}>
                          <img src={Graph} alt="Equalizer" />
                        </Box>
                        <Select
                  labelId="select-label"
                  id="select"
                  label="Select"
                  value={selectedOption2}
                  onChange={(event) => handleSelectChangeGeneric(event, setSelectedOption2, localData)}
                  IconComponent={(props) => <KeyboardArrowDownIcon {...props} style={{ color: black10 }} />}
                  sx={{ boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 }, fontFamily: Inter, color: black10, fontWeight: 400, fontSize: 12  }}
                >
              
              <MenuItem value={'this-week'} sx={{ fontFamily: Inter, color: black10, fontWeight: 400, fontSize: 12 }} >This Week</MenuItem>
                  <MenuItem value={'this-month'}>This month</MenuItem>
                  <MenuItem value={'this-year'}>This year</MenuItem>
                 
                </Select>
                      </Box>
                      <Paper sx={{ display: "flex", gap:16, marginTop: 4, boxShadow: "none" }}>
                        <Box>
                          <Typography variant="body2" sx={{
                            fontFamily: Inter,
                            fontWeight: 400,
                            fontSize: 14,
                            color: black30
                          }}>
                            Sales
                          </Typography>
                          <Typography variant="body2" sx={{
                            fontFamily: Poppins,
                            fontWeight: 500,
                            fontSize: 20,
                            color: black60,
                            display:"flex", 
                            alignItems: "center",
                            gap : "10px"
                          }}>{localData[selectedOption2] ? localData[selectedOption2].Sales: 'N/A'}<Typography variant="subtitle1" sx={{ color: "#519C66" , fontWeight: 400,
                          fontSize: 12, fontFamily: Inter}}>{localData[selectedOption2] ? localData[selectedOption2].plusValue: 'N/A'}</Typography></Typography>
                        </Box>
                        <Box>


                          <Typography variant='body2' sx={{
                            fontFamily: Inter,
                            fontWeight: 400,
                            fontSize: 14,
                            color: black30
                          }}>
                            Volume
                          </Typography>
                          <Typography variant="body2" sx={{
                            fontFamily: Poppins,
                            fontWeight: 500,
                            fontSize: 20,
                            color: black60,
                            display:"flex", 
                            alignItems: "center",
                            gap : "10px"
                          }}>{localData[selectedOption2] ? localData[selectedOption2].volume: 'N/A'}</Typography>
                        </Box>
                      </Paper>
                    </CardContent>
                  </Card>
                </Grid>
      

              {/* Chart */}
              <Grid item xs={12}  style={{ backgroundColor: 'white' , marginTop: 20, borderRadius: 12}}>
              
                
                  <Card style={{borderRadius: 12,  boxShadow: "none"}}>
                    <CardContent>
                  <Box>
                     <Box style={{width: '100%', display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      
                        <Typography sx={{ fontFamily: Inter, color: black60, fontWeight: 500, fontSize: 16 }}>Marketing</Typography>
                     
                        <Select
                  labelId="select-label"
                  id="select"
                  value={selectedOption2}
                  onChange={(event) => handleSelectChangeGeneric(event, setSelectedOption2, localData)}
                  label="Select"
                  IconComponent={(props) => <KeyboardArrowDownIcon {...props} style={{ color: black10 }} />}
                  sx={{ boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 }, fontFamily: Inter, color: black10, fontWeight: 400, fontSize: 12  }}
                >
              
              <MenuItem value={'this-week'} sx={{ fontFamily: Inter, color: black10, fontWeight: 400, fontSize: 12 }} disabled>This Week</MenuItem>
                  <MenuItem value={'this-month'}>This month</MenuItem>
                  <MenuItem value={'this-year'}>This year</MenuItem>
                 
                </Select>
                    </Box>
                  <Box style={{width: '100%',display:"flex", gap: "30px", marginTop: 6}}>
                    <Box style={{display:"flex", alignItems: "center"}}>
                      <Box style={{width: "8px", height:"8px", backgroundColor: pink, borderRadius: "6px"}}/>
                      <Typography sx={{ fontFamily: Inter, color: black20, fontWeight: 400, fontSize: 11, marginLeft:"8px" }}>Marketing</Typography>
                    </Box>
                    <Box style={{display:"flex", alignItems: "center"}}>
                      <Box style={{width: "8px", height:"8px", backgroundColor: primary50, borderRadius: "6px"}}/>
                      <Typography sx={{ fontFamily: Inter, color: black20, fontWeight: 400, fontSize: 11 , marginLeft:"8px" }}>Purchase</Typography>
                    </Box>
                    <Box style={{display:"flex", alignItems: "center"}}>
                      <Box style={{width: "8px", height:"8px", backgroundColor: orange, borderRadius: "6px"}}/>
                      <Typography sx={{ fontFamily: Inter, color: black20, fontWeight: 400, fontSize: 11, marginLeft:"8px"  }}>Retention</Typography>
                    </Box>
                  </Box>
                  <Box >
                  <PieChart series={[{ data , innerRadius: 70,}]} {...size}  slotProps={{
        legend: { hidden: true }}} sx={{width: '100%',marginTop: 4, maxWidth: '100%',marginLeft: 8 }}/> 
                  </Box>
              
            </Box>
            </CardContent>
            </Card>
            </Grid>
            
          </Grid>
            

            {/* Second nested column (50% of the 60%) */}
            <Grid item xs={6}>
              
                <Grid item xs={12} >
                  <Card style={{borderRadius: 12,  boxShadow: "none"}}>
                    <CardContent>
                      <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Box style={{
                          backgroundColor: "#FFCC9129",
                          height: "20px",
                          width: "20px",
                          display: "flex",
                          justifyContent: "center",
                          padding: 8,
                          borderRadius: 5,
                        }}>
                          <img src={User} alt="Equalizer" />
                        </Box>
                        <Select
                  labelId="select-label"
                  id="select"
                  value={selectedOption3}
                  onChange={(event) => handleSelectChangeGeneric(event, setSelectedOption3, localData)}
                  IconComponent={(props) => <KeyboardArrowDownIcon {...props} style={{ color: black10 }} />}
                  sx={{ boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 }, fontFamily: Inter, color: black10, fontWeight: 400, fontSize: 12  }}
                >
              
              <MenuItem value={'this-week'} sx={{ fontFamily: Inter, color: black10, fontWeight: 400, fontSize: 12 }} >This Week</MenuItem>
                  <MenuItem value={'this-month'}>This month</MenuItem>
                  <MenuItem value={'this-year'}>This year</MenuItem>
                 
                </Select>
                      </Box>
                      <Paper sx={{ display: "flex", gap:16, marginTop: 4, boxShadow: "none" }}>
                        <Box>
                          <Typography variant="body2" sx={{
                            fontFamily: Inter,
                            fontWeight: 400,
                            fontSize: 14,
                            color: black30
                          }}>
                            Customers
                          </Typography>
                          <Typography variant="body2" sx={{
                            fontWeight: 500,
                            fontSize: 20,
                            color: black60,
                            display: "flex",
                            alignItems: "center",
                            gap: "10px "
                          }}>{localData[selectedOption3] ? localData[selectedOption3].Customers: 'N/A'}<Typography variant="subtitle1" sx={{ color: "#519C66" , fontWeight: 400,
                          fontSize: 12, fontFamily: Inter}}>{localData[selectedOption3] ? localData[selectedOption3].plusValue: 'N/A'}</Typography>
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant='body2' sx={{
                            fontFamily: Inter,
                            fontWeight: 400,
                            fontSize: 14,
                            color: black30
                          }}>
                            Active
                          </Typography>
                          <Typography variant="body2" sx={{
                            display: "flex",
                            alignItems:"center",
                            gap:2,
                            fontWeight: 500,
                            fontSize: 20,
                            color: black60
                          }}>{localData[selectedOption3] ? localData[selectedOption3].Active: 'N/A'}<Typography variant="subtitle1" sx={{ color: "#519C66" , fontWeight: 400,
                          fontSize: 12, fontFamily: Inter}}>{localData[selectedOption3] ? localData[selectedOption3].plusValue: 'N/A'}</Typography></Typography>
                        </Box>
                      </Paper>
                    </CardContent>
                  </Card>
                </Grid>
             
               {/* Grid2 */}
            <Box >
            <Grid container spacing={2} sx={{ height: '100%' }} >
           
              <Grid item xs={12}  sx={{ marginTop: "20px", height: '100%' }}>
                <Card style={{borderRadius: 12, backgroundColor: pink,  boxShadow: "none"}}>
                  <CardContent >
                    <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Box style={{
                        backgroundColor: "#FFFFFF29",
                        height: "20px",
                        width: "20px",
                        display: "flex",
                        justifyContent: "center",
                        padding: 8,
                        borderRadius: 8,
                      }}>
                        <img src={Folder} alt="Equalizer" />
                      </Box>
                     
                    </Box>
                    <Paper sx={{ display: "flex", justifyContent: "space-between", marginTop: 4, boxShadow: "none" , backgroundColor: pink, marginTop: "57px"}}>
                      <Box>
                        <Typography variant="body2" sx={{
                          fontFamily: Inter,
                          fontWeight: 400,
                          fontSize: 14,
                          color: "white"
                        }}>
                          All Products
                        </Typography>
                        <Box style ={{}}>
                          <Typography variant="body2" sx={{
                            fontFamily: Poppins,
                            fontWeight: 500,
                            fontSize: 20,
                            color: "white",
                            display:"flex",
                            alignItems: "center", 
                            gap : "10px"
                          }}>0 <Typography variant="subtitle1" sx={{ color: "#DBDEEE" , fontWeight: 400,
                          fontSize: 12, fontFamily: Inter}}>+0.00%</Typography></Typography>
                        </Box>
                        
                      </Box>
                      <Box>
                        <Typography variant='body2' sx={{
                          fontFamily: Inter,
                          fontWeight: 400,
                          fontSize: 14,
                          color: "white"
                        }}>
                          Active
                        </Typography>
                        <Box>
                          <Typography variant="body2" sx={{
                            fontFamily: Poppins,
                            fontWeight: 500,
                            fontSize: 20,
                            color: "white",
                            display:"flex", 
                            alignItems: "center",
                            gap : "10px"
                          }}>0 <Typography variant="subtitle1"  sx={{ color: "#DBDEEE" , fontWeight: 400,
                          fontSize: 12, fontFamily: Inter}}>+0.00%</Typography></Typography>
                        </Box>
                      </Box>
                    </Paper>
                  </CardContent>
                </Card>
              </Grid>
        

              <Grid item xs={12} sx={{marginTop:2}}  >
                <Card style={{borderRadius: 12, backgroundColor: "white",  boxShadow: "none"}}>
                  <CardContent >
                    <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center" , }}>
                      <Box style={{
                        backgroundColor: "#FFCC9129",
                        height: "20px",
                        width: "20px",
                        display: "flex",
                        justifyContent: "center",
                        padding: 8,
                        borderRadius: 8,
                      }}>
                        <img src={shopping} alt="Equalizer" />
                      </Box>
                      
                      <Select
                  labelId="select-label"
                  id="select"
                  value={'this-week'}
                  
                  IconComponent={(props) => <KeyboardArrowDownIcon {...props} style={{ color: black10 }} />}
                  sx={{ boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 }, fontFamily: Inter, color: black10, fontWeight: 400, fontSize: 12  }}
                >
              
              <MenuItem value={'this-week'} sx={{ fontFamily: Inter, color: black10, fontWeight: 400, fontSize: 12 }} >This Week</MenuItem>
                  <MenuItem value={10}>This month</MenuItem>
                  <MenuItem value={20}>This year</MenuItem>
                 
                </Select>
                    </Box>
                    <Paper sx={{ display: "flex", justifyContent: "space-between", marginTop: 4, boxShadow: "none", marginTop: "57px"}}>
                      <Box>
                        <Typography variant="body2" sx={{
                          fontFamily: Inter,
                          fontWeight: 400,
                          fontSize: 14,
                          color: "#CC5F5F"
                        }}>
                          Abandoned Cart
                        </Typography>
                        <Box style ={{}}>
                          <Typography variant="body2" sx={{
                            fontFamily: Poppins,
                            fontWeight: 500,
                            fontSize: 20,
                            color: black60,
                            display:"flex",
                            alignItems: "center", 
                            gap : "10px"
                          }}>0 %<Typography variant="subtitle1" sx={{ color: "#519C66" , fontWeight: 400,
                          fontSize: 12, fontFamily: Inter}}>+0.00%</Typography></Typography>
                        </Box>
                        
                      </Box>
                      <Box>
                        <Typography variant='body2' sx={{
                          fontFamily: Inter,
                          fontWeight: 400,
                          fontSize: 14,
                          color: black30
                        }}>
                          Customers
                        </Typography>
                        <Box>
                          <Typography variant="body2" sx={{
                            fontFamily: Poppins,
                            fontWeight: 500,
                            fontSize: 20,
                            color: black60,
                            display:"flex", 
                            alignItems: "center",
                            gap : "10px"
                          }}>0</Typography>
                        </Box>
                      </Box>
                    </Paper>
                  </CardContent>
                </Card>
              </Grid>
        
          </Grid>
            </Box>
            </Grid>
            
          </Grid>
          <Grid item xs={12}  style={{ backgroundColor: 'white' , marginTop: 8, borderRadius: 12}}>
              
                
              <Card style={{borderRadius: 12,  boxShadow: "none"}}>
                <CardContent>
          <Box style={{backgroundColor: "white",padding: "21px 20px" , marginTop: 8, borderRadius: 12, height: "100%" }}>
            <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
           
                          <Box sx={{display: "flex", gap: 4, alignItems: "center"}}>
                          <Typography variant='h6' sx={{fontFamily:Inter,
                  fontWeight: 500, fontSize: 16, color: black60, lineHeight: "20px"}}>Summary</Typography>
                          <Select
                          labelId="select-label"
                          id="select"
                          value={'Sales'}
                          label="Select"
                          IconComponent={(props) => <KeyboardArrowDownIcon {...props} style={{ color: pink }} />}
                          sx={{ boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 }, fontFamily: Inter, color: pink, fontWeight: 400, fontSize: 14, backgroundColor: bgPink , height: 30, borderRadius: "5px", lineHeight: "17px"}}
                        >
              
                   <MenuItem value={'Sales'} sx={{ fontFamily: Inter, color: black10, fontWeight: 400, fontSize: 12 }} >Sales</MenuItem>
                  <MenuItem value={'Customers'}>Customers</MenuItem>
                  <MenuItem value={'All Orders'}>All Orders</MenuItem>
                 
                </Select>

                          </Box>
                
                <Select
                          labelId="select-label"
                          id="select"
                          value={'Last 7 days'}
                          label="Select"
                          IconComponent={(props) => <KeyboardArrowDownIcon {...props} style={{ color: "#1C1D22" }} />}
                          sx={{ boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 }, fontFamily: Inter, color: "#1C1D22", fontWeight: 400, fontSize: 14 , height: 30, borderRadius: "5px", lineHeight: "17px"}}
                        >
              
                   <MenuItem value={'Last 7 days'} sx={{ fontFamily: Inter, color: black10, fontWeight: 400, fontSize: 12 }} >Last 7 days</MenuItem>
                  <MenuItem value={'Last Month'}>Last Month</MenuItem>
                  <MenuItem value={'Last 3 Months'}>Last 3 Months</MenuItem>
                 
                </Select>
            </Box>
            
<BarChart
 sx={{ rx: 15 }}
  xAxis={[
    {
      id: 'bandAxis',
      scaleType: 'band',
      data: ['Sep 10', 'Sep 11', 'Sep 12', 'Sep 13', 'Sep 14', 'Sep 15', 'Sep 16'],
      // Additional properties specific to your charting library
      disableLine: true,
      disableTicks: true,
    },
  ]}
  yAxis={[
    {
      id: 'linearAxis',
      scaleType: 'linear',
      ticks: [0, 2, 4, 6, 8],
      tickLabels: ['Zero', 'Two', 'Four', 'Six', 'Eight'],
    },
    { id: 'logAxis', scaleType: 'log' },
  ]}
  leftAxis={{
    axisId: 'linearAxis',
    disableLine: true,
    disableTicks: true,
    labelFontSize: 12,
    tickLabelStyle:{
      fill:black20
    },
   
  }}
  bottomAxis={{
    axisId: 'bandAxis',
    disableLine: true,
    disableTicks: true,
    labelFontSize: 12,
    tickLabelStyle:{
      fill:black20
    }

  
    // Add additional properties specific to the library
  }}
  series={[
    { yAxisKey: 'linearAxis', data: [100, 100, 100, 100, 100, 100, 100],  color: gray, barRadius: 10},
    { yAxisKey: 'logAxis', data: [100, 100, 100, 100, 100, 100, 100],  color: gray, barRadius: 10 },
  ]}
  width={800}
  height={400}
  margin={{ top: 20, right: 30, bottom: 30, left: 50 }}
  
  slots={{
    bar: (props) => {
      const radius = 7;
      const { x, y, height, width, ownerState, ...restProps } = props;
  
      
      // Path of a rectangle with rounded corners on the right
      // for horizontal layout
      const d = `M${x},${y + adjustedRadius} h${adjustedWidth} a${adjustedRadius},${adjustedRadius} 0 0 1 ${adjustedRadius},${adjustedRadius}v ${height - 2 * adjustedRadius} a${adjustedRadius},${adjustedRadius} 0 0 1 ${-adjustedRadius},${adjustedRadius} h${width - adjustedRadius}`;

      // Adjust bar width using custom style
      const style = {
        width: adjustedWidth,
        fill: ownerState.color,
        
      };

      return <rect x={x} y={y}  style={{marginLeft: 20}} {...restProps} />;
    }
  }}
  
 
>
<BarPlot sx={{ rx: 15 }}  />
</BarChart>

</Box>
</CardContent>
</Card>
</Grid>
        </Grid>

        
        {/* Deuxième colonne (40%) */}
        <Grid item xs={4}>
          <Paper style={{ backgroundColor: gray, boxShadow: "none" }}>
            {/* Contenu de la deuxième colonne */}
            <Grid container spacing={2}>
     
       
         
              
                <Grid item xs={12} >
                  <Card style={{borderRadius: 12,  boxShadow: "none"}}>
                    <CardContent>
                      <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Box style={{
                          backgroundColor: "#FFCC9129",
                          height: "20px",
                          width: "20px",
                          display: "flex",
                          justifyContent: "center",
                          padding: 8,
                          borderRadius: 5,
                        }}>
                          <img src={BagIcon} alt="Equalizer" />
                        </Box>
                        <Select
                          labelId="select-label"
                          id="select"
                          value={selectedOption}
                          onChange={(event) => handleSelectChangeGeneric(event, setSelectedOption,localData)}
                          label="Select"
                          IconComponent={(props) => <KeyboardArrowDownIcon {...props} style={{ color: black10 }} />}
                          sx={{ boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 }, fontFamily: Inter, color: black10, fontWeight: 400, fontSize: 12  }}
                        >
              
                   <MenuItem value={'this-week'} sx={{ fontFamily: Inter, color: black10, fontWeight: 400, fontSize: 12 }} >This Week</MenuItem>
                  <MenuItem value={'this-month'}>This month</MenuItem>
                  <MenuItem value={'this-year'}>This year</MenuItem>
                 
                </Select>
                      </Box>
                      <Paper sx={{ marginTop: 4, boxShadow: "none" }}>
                        <Box style={{ display: "flex",flexDirection: "row", alignItems: "stretch", justifyContent: "space-between"}}>
                          <Typography variant="body2" sx={{
                            fontFamily: Inter,
                            fontWeight: 400,
                            fontSize: 14,
                            color: black30
                          }}>
                            All orders
                          </Typography>


                          <Typography variant='body2' sx={{
                            fontFamily: Inter,
                            fontWeight: 400,
                            fontSize: 14,
                            color: black30
                          }}>
                            Pending
                          </Typography>

                          <Typography variant="body2" sx={{
                          fontFamily: Inter,
                          fontWeight: 400,
                          fontSize: 14,
                          color: black30
                        }}>
                          Completed
                        </Typography>
                        </Box>
                        <Box style={{ display: "flex",flexDirection: "row", alignItems: "stretch", justifyContent: "space-between"}}>

                        <Typography variant="body2" sx={{
                             fontFamily: Poppins,
                             fontWeight: 500,
                             fontSize: 20,
                             color: black60,
                             display:"flex", 
                             alignItems: "center",
                             gap : "10px"
                          }}>{localData[selectedOption] ? localData[selectedOption].allOrders : 'N/A'}</Typography>

                          <Typography variant="body2" sx={{
                             fontFamily: Poppins,
                             fontWeight: 500,
                             fontSize: 20,
                             color: black60,
                             display:"flex", 
                             alignItems: "center",
                             gap : "10px"
                          }}> {localData[selectedOption] ? localData[selectedOption].pending : 'N/A'}</Typography>

                          <Typography variant="body2" sx={{
                            fontFamily: Poppins,
                            fontWeight: 500,
                            fontSize: 20,
                            color: black60,
                            display:"flex",
                            alignItems: "center", 
                            gap : "5px"
                          }}> {localData[selectedOption] ? localData[selectedOption].completed : 'N/A'} <Typography variant="subtitle1" sx={{ color: "#519C66" , fontWeight: 400,
                          fontSize: 12, fontFamily: Inter}}>{localData[selectedOption] ? localData[selectedOption].plusValue : 'N/A'} </Typography>
                          </Typography>
                        </Box>
                       
                        
                      </Paper>
                    </CardContent>
                  </Card>
           
             
              </Grid>
              </Grid>
              
    
         
        <Box >
        <Grid container spacing={2} sx={{ height: '100%' }}>
      <Grid item xs={12} sx={{ marginTop: "20px", height: '100%' }}>
        <Card style={{  height: '943px', borderRadius: 12, boxShadow: "none", display: 'flex', flexDirection: 'column' }}>
          
      
             <CardContent >
               <Box >
                   <Typography sx={{fontFamily:Inter,
                  fontWeight: 500, fontSize: 16, color: black60, lineHeight: "20px"}}>Recent Orders</Typography>
               </Box>
               
               <Paper sx={{ display: "flex", marginTop: 26, boxShadow: "none", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                {!isProductAdded() && (
                  <Box sx={{ backgroundColor: theme.palette.primary.gray, border: "solid 1px ", borderColor: "#E1E2E9", borderRadius: 100, padding: 6 }}>
                    <img src={Bag} alt="" srcset="" />
                  </Box>
                )}
                <Typography sx={{ fontFamily: Poppins, fontWeight: fontw, fontSize: 20, lineHeight: "30px", marginTop: 2 }}>
                  {isProductAdded() ? 'Products Added!' : 'No Orders Yet?'}
                </Typography>
                <Typography sx={{ fontFamily: Poppins, fontWeight: 400, fontSize: 14, lineHeight: "17px", marginTop: 2, color: black30, textAlign: "center" }}>
                  {isProductAdded()
                    ? 'Products have been added to your store!'
                    : 'Add products to your store and start selling to see orders here.'}
                </Typography>

                {isProductAdded() && (
                  products.map((product, index) => (
                    <div key={index} style={{ marginTop: 8 }}>
                      <Typography variant="body2" sx={{ fontFamily: theme.typography.fontFamily, fontWeight: 500, fontSize: 16, color: black30 }}>
                        {product.name} - Quantity: {product.quantity}
                      </Typography>
                    </div>
                  ))
                )}
                    <button onClick={openModal} style={{display: "flex",gap:10, alignItems:"center",backgroundColor:pink, color: "white", padding: "10px 17px", border: "none", borderRadius: 12, marginTop: 14, fontFamily:Inter}}><img src={Heart}></img>New Products</button>
              </Paper>
                      {/* Modal */}
      <Modal open={isModalOpen} onClose={closeModal}>
        <Paper>
          <Box p={3}>
            <Typography variant="h6">Add New Product</Typography>
            <TextField
              label="Product Name"
              value={newProductName}
              onChange={(e) => setNewProductName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Quantity"
              value={newProductQuantity}
              onChange={(e) => setNewProductQuantity(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button onClick={handleAddProduct} variant="contained" sx={{backgroundColor: pink}}>
              Add
            </Button>
          </Box>
        </Paper>
      </Modal>
             </CardContent>
           </Card>
         </Grid>
      
       
       
         </Grid>
         </Box>
          </Paper>

           
     
       
        </Grid>
      </Grid>
    </Container>
  );
}
