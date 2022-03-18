import React from 'react'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'

//import axios from 'axios'

const Search: React.FC = () => {
  // const [results, setResults] = useState<any>(null)
  //const [error, setError] = useState<String | null>(null)

  /* const apiUrl = process.env.REACT_APP_API_URL
    ? process.env.REACT_APP_API_URL
    : ''
 */
  const searchHandler = async () => {
    console.log('clicked')
    /*  const response = await axios.get(
      'https://www.openlibrary.org/search.json?title=the+lord+of+the+rings'
    )
    setResults(response.data) */

    const urlendpoint = 'https://www.openlibrary.org/search.json'
    const endpointfields = '?title=the+lord+of+the+rings'

    fetch(urlendpoint + endpointfields)
      .then((response) => response.json())
      .then((data) => console.log(data))

    //console.log(results)
  }

  return (
    <Paper
      component='form'
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
        onClick={searchHandler}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}

export default Search
