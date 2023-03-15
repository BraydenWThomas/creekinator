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
        <Container component="main" maxWidth="sm" sx={{ height:"100vh"}}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    paddingTop:30
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" noValidate sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="given-name"
                                name="fullname"
                                required
                                fullWidth
                                id="fullname"
                                label="Full Name"
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
                        <Grid item xs={12}>
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
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="center">
                    <Grid item
                        sx={{ mt: 35 }}>
                        <img src={fdm} alt="FDM Logo" />
                    </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
export default CandidateApply;