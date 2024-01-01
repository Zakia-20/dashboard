import { useState } from 'react'
import './App.css'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import Container from '@mui/material/Container';
import theme  from './components/theme';
import { ThemeProvider } from 'styled-components';
function App() {


  return (
    <>
  <ThemeProvider theme={theme}>
    <Container maxWidth="xl">
      <Navbar></Navbar>
      <Hero></Hero>
    </Container>
  </ThemeProvider>
    </>
  )
}

export default App
