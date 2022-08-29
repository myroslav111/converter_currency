import Home from 'page/Home/Home';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

export const App = () => {
  const [currency, setCurrency] = useState('USD');
  const [location, setLocation] = useState('You have not allowed us to locate');
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const latitude = position?.coords?.latitude;
        const longitude = position?.coords?.longitude;
        console.log(navigator);
        console.log();
        console.log();
        const apiKey = '14fe4a9bc173447d879daa5a9a91e05b';
        const urlPosition = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}&language=en`;

        fetch(urlPosition)
          .then(response => {
            if (!response.ok) {
              throw new Error(response.status);
            }
            return response.json();
          })
          .then(data => {
            console.log(data);
            setCurrency(data.results[0].annotations.currency.iso_code);
            setLocation(data.results[0].components.country);
          });
      });
    }

    var myHeaders = new Headers();
    myHeaders.append('apikey', 'Bqf0jgud3HsN3E435u3LbG7qgqDyjvOj');

    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders,
    };
    fetch(
      'https://api.apilayer.com/exchangerates_data/symbols',
      requestOptions
    ).then(response => {
      console.log(response);
      response.text();
    });
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Home />
      <Div>{`State: ${location}`}</Div>
      <Div>{`Curent currency: ${currency}`}</Div>
    </Box>
  );
};
