import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';

function Form({}) {
  const [userCurrencyFrom, setUserCurrencyFrom] = useState('');
  const [userCurrencyTo, setUserCurrencyTo] = useState('');
  const handleSubmit = () => {
    var myHeaders = new Headers();
    myHeaders.append('apikey', 'Bqf0jgud3HsN3E435u3LbG7qgqDyjvOj');

    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders,
    };
    fetch(
      `https://api.apilayer.com/exchangerates_data/convert?to=UAH&from=USD&amount=${100}`,
      requestOptions
    )
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& .MuiTextField-root': { width: '25ch' },
      }}
    >
      <TextField
        sx={{
          display: 'flex',
          margin: '10px',
        }}
        id="outlined-name"
        label="Name"
        // value={name}
        // onChange={e => setUserCurrencyFrom(e.target.event)}
      />
      <TextField
        sx={{
          display: 'flex',
          margin: '10px',
        }}
        id="outlined-name"
        label="Name"
        // value={name}
        // onChange={handleChange}
      />
      <TextField
        sx={{
          display: 'flex',
          margin: '10px',
        }}
        id="outlined-name"
        label="Name"
        // value={name}
        // onChange={handleChange}
      />
      <Stack spacing={2} direction="row">
        <Button variant="contained" onClick={handleSubmit}>
          Go
        </Button>
      </Stack>
    </Box>
  );
}

export default Form;
