import React, { useState } from 'react'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

//import axios from 'axios'

const Search: React.FC = () => {
  const [results, setResults] = useState<any>([])
  const [isLoading, setIsLoading] = useState<Boolean | null>(null)
  const apiUrl = process.env.REACT_APP_API_URL
    ? process.env.REACT_APP_API_URL
    : ''

  const getApiData = async () => {
    setIsLoading(true)
    const response = await fetch(apiUrl).then((response) => response.json())

    setResults(response.docs)
    setIsLoading(false)
    console.log(results)
  }

  return (
    <Box width={1}>
      <Paper
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder='Lord of the rings'
          inputProps={{ 'aria-label': 'Lord of the rings' }}
          value='Lord of the rings'
        />
        <IconButton
          type='submit'
          sx={{ p: '10px' }}
          aria-label='search'
          onClick={getApiData}
        >
          <SearchIcon />
          {isLoading && <CircularProgress />}
        </IconButton>
      </Paper>
      <Box my={5}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='right' size='small' width={150}>
                  Cover
                </TableCell>
                <TableCell align='right' size='small' width={150}>
                  Title
                </TableCell>
                <TableCell align='right' size='small' width={150}>
                  Author
                </TableCell>
                <TableCell
                  align='right'
                  size='small'
                  width={150}
                  sx={{ overflow: 'hidden' }}
                >
                  Year
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((row: any) => (
                <TableRow
                  key={row.Title}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align='left'>
                    {row.cover_i ? (
                      <img
                        src={`https://covers.openlibrary.org/b/id/${row.cover_i}-S.jpg`}
                      />
                    ) : (
                      'Image not Available'
                    )}
                  </TableCell>
                  <TableCell align='right'>{row.title}</TableCell>
                  <TableCell align='right'>{row.author_name}</TableCell>
                  <TableCell
                    align='right'
                    size='small'
                    width={150}
                    sx={{ overflow: 'hidden' }}
                  >
                    {row.publish_year.join(',')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  )
}

export default Search
