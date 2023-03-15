import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import fdm from  './fdm-logo.png';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const CandidateApply = () => {

    return (
        <Container component="main" maxWidth="xs" sx={{ height:"100vh"}}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    paddingTop:50
                }}
            >
                <Typography component="h1" variant="h3">
                    Sign up
                </Typography>
                <Box component="form" noValidate sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="user"
                                name="username"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                            />
                        </Grid>
                        {/* <Grid item xs={12}>
                        <FormControl required fullWidth>
                            <InputLabel id="title-select-label">Stream</InputLabel>
                            <Select
                            id="Stream"
                            label="Stream"
                            name="Stream"
                            autoComplete="stream"
                            fullWidth
                            >
                                <MenuItem value="Stream1">Software Development</MenuItem>
                                <MenuItem value="Stream2">Business Analytics</MenuItem>
                                <MenuItem value="Stream2">Technical Analyst</MenuItem>

                            </Select>
                            </FormControl>
                        </Grid> */}
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Apply
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button href="/">
                                Already have an account? Sign in
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="center">
                    <Grid item
                        sx={{ position: 'absolute', bottom: 75 }}>
                        <img src={fdm} alt="FDM Logo" />
                    </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
export default CandidateApply;