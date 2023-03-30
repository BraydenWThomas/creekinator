import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import fdm from './fdm-logo.png';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import './Styling/LoginPageStyle.css'
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const FDMtheme = createTheme({
  palette: {
    primary: {
      main: '#6f00ff',
    },
    secondary: blue,
  },
});

const LoginPage = (props) => {
  return (
    <div className='login-container'>
      <ThemeProvider theme={FDMtheme}>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 20,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
            <Avatar src="/broken-image.jpg" sx={{ width: 350, height: 350 }} />
            <Box component="form" onSubmit={props.onClick} noValidate sx={{ mt: 10 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" />}
                label="Remember me"
              />
              <Button
                type="submit"
                color='primary'
                fullWidth
                variant="contained"
                size='large'
                disableElevation
                sx={{ mt: 2, mb: 2, }}>
                Login
              </Button>
            </Box>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button href="/apply">
                  Don't have an account? Apply
                </Button>
              </Grid>
            </Grid>
            <Grid item
              sx={{ position: 'absolute', bottom: 75 }}>
              <img src={fdm} alt="FDM Logo" />
            </Grid>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  )
}

export default LoginPage;