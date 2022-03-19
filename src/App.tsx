import React from 'react'
import './App.css'
import Grid from '@mui/material/Grid'
import { Container } from '@mui/material'
import Search from './Components/Search/search'

const App: React.FC = () => {
  return (
    <Container maxWidth='lg'>
      <Grid my={5} display='flex' justifyContent='center'>
        <Search />
      </Grid>
    </Container>
  )
}

export default App
