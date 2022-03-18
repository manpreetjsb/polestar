import React from 'react'
import './App.css'
import Grid from '@mui/material/Grid'
import { Container } from '@mui/material'
import SearchResult from './Components'

const App: React.FC = () => {
  return (
    <Container maxWidth='lg'>
      <Grid my={5} display='flex' justifyContent='center'>
        <SearchResult />
      </Grid>
    </Container>
  )
}

export default App
