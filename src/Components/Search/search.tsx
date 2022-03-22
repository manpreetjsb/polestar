import React, { useState } from 'react'
import Paper from '@mui/material/Paper'

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
import { Formik, Form, ErrorMessage, Field } from 'formik'
import Alert from '@mui/material/Alert'
import { TextField } from 'formik-material-ui'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import { IResult } from './data.type'

interface Values {
  search: string
}

const init: IResult[] = []

const Search: React.FC = () => {
  const [results, setResults] = useState<IResult[]>(init)
  const [isSubmitting, setIsSubmitting] = useState<Boolean>(false)
  const [apiError, setApiError] = useState<String | null>(null)

  const apiUrl = process.env.REACT_APP_API_URL
    ? process.env.REACT_APP_API_URL
    : ''

  const getApiData = async (values: string) => {
    setResults(init)
    await axios
      .get(apiUrl + values)
      .then((response) => {
        if (!response.data.docs.length) {
          setApiError('No Records Found, Please search different Keyword.')
          setIsSubmitting(false)
        } else {
          setResults(response.data.docs)
          setIsSubmitting(false)
          setApiError(null)
        }
      })
      .catch((error) => {
        setApiError(error)
      })
  }

  return (
    <Box width={1}>
      <Formik
        initialValues={{
          search: '',
        }}
        validate={(values) => {
          const errors: Partial<Values> = {}
          if (!values.search.trim()) {
            errors.search = 'Please write Search Keyword'
          }
          return errors
        }}
        onSubmit={(values) => {
          setIsSubmitting(true)
          setApiError(null)
          getApiData(values.search)
        }}
      >
        {({ submitForm }) => (
          <>
            <Form>
              <Paper
                sx={{
                  p: '2px 4px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Field
                  component={TextField}
                  sx={{ ml: 1, flex: 1, borderColor: '0' }}
                  placeholder='Please Write Book Title'
                  name='search'
                  inputProps={{
                    'aria-label': 'Without label',
                    name: 'search',
                  }}
                  disabled={isSubmitting}
                  size='small'
                />
                <IconButton
                  type='submit'
                  sx={{ p: '10px' }}
                  aria-label='search'
                  onClick={submitForm}
                >
                  {isSubmitting ? (
                    <CircularProgress color='inherit' size={28} />
                  ) : (
                    <SearchIcon />
                  )}
                </IconButton>
              </Paper>
            </Form>
            <ErrorMessage
              name='search'
              render={(msg) => <Alert severity='error'>{msg}</Alert>}
            />
          </>
        )}
      </Formik>
      <Box my={5}>
        {apiError ? (
          apiError
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell align='right' size='small' width={150}>
                    <Typography component='h5' variant='h5'>
                      Cover
                    </Typography>
                  </TableCell>
                  <TableCell align='right' size='small' width={150}>
                    <Typography component='h5' variant='h5'>
                      Title
                    </Typography>
                  </TableCell>
                  <TableCell align='right' size='small' width={150}>
                    <Typography component='h5' variant='h5'>
                      Author
                    </Typography>
                  </TableCell>
                  <TableCell
                    align='left'
                    size='small'
                    width={150}
                    sx={{ overflow: 'hidden' }}
                  >
                    <Typography component='h5' variant='h5'>
                      Year
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {results.map((row: IResult) => (
                  <TableRow
                    key={row.title}
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
                      align='left'
                      size='small'
                      sx={{ overflow: 'hidden' }}
                    >
                      {row.publish_year.join(',')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  )
}

export default Search
