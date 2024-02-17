import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { currencyObj } from '../../currency/currency';
import { APIKEY } from '../../currency/currency';
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const curr = Object.keys(currencyObj);

function Form({ currency }) {
  const [userCurrencyFrom, setUserCurrencyFrom] = useState('');
  const [userCurrencyTo, setUserCurrencyTo] = useState('');
  const [amount, setAmount] = useState('');
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // console.log(currency);
  const handleSubmit = async () => {
    setIsLoading(true);
    var myHeaders = new Headers();

    myHeaders.append('apikey', APIKEY);

    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders,
    };
    // console.log('start');
    if (currency !== '') {
      await fetch(
        `https://api.apilayer.com/exchangerates_data/convert?to=${userCurrencyTo}&from=${userCurrencyFrom}&amount=${amount}`,
        requestOptions
      )
        .then(response => {
          // console.log(response);
          return response.text();
        })
        .then(result => {
          setData(JSON.parse(result));
        })
        .catch(error => console.log('error', error))
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      await fetch(
        `https://api.apilayer.com/exchangerates_data/convert?to=${userCurrencyTo}&from=${userCurrencyFrom}&amount=${amount}`,
        requestOptions
      )
        .then(response => {
          return response.text();
        })
        .then(result => setData(JSON.parse(result)))
        .catch(error => console.log('error', error))
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 5,
        '& .MuiTextField-root': { width: '25ch' },
      }}
    >
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={curr}
        onChange={e => setUserCurrencyFrom(e.target.textContent)}
        renderInput={params => <TextField {...params} label="from" />}
      />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={curr}
        onChange={e => setUserCurrencyTo(e.target.textContent)}
        sx={{ marginBottom: 3, marginTop: 3 }}
        renderInput={params => (
          <TextField {...params} label="to" />
          // label={currency !== '' ? currency : 'to'}
        )}
      />
      <TextField
        sx={{
          display: 'flex',
          margin: '10px',
        }}
        id="outlined-name"
        label="sum"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />
      <Stack spacing={2} direction="row">
        {isLoading ? (
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        ) : (
          <Button
            disabled={
              userCurrencyFrom && userCurrencyTo && amount ? false : true
            }
            variant="contained"
            onClick={handleSubmit}
          >
            Go
          </Button>
        )}
      </Stack>
      <p>
        {data ? Number.parseInt(data.result) : 0} -{' '}
        {data ? userCurrencyTo || 'UAH' : currency || 'currency'}
      </p>
    </Box>
  );
}

export default Form;
