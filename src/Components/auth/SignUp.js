import React, {useState} from 'react';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';

import {auth, googleProvider} from '../.././config/firebase'
import {createUserWithEmailAndPassword, signInWithPopup} from 'firebase/auth'
import Copyright from "./Copyright";
import {InputAdornment} from "@mui/material";
import SnackbarInfo from "../SnackbarInfo";
import EmailIcon from "@mui/icons-material/Email";
import {Lock} from "@mui/icons-material";
import {NavLink, useNavigate} from "react-router-dom";


const SignUp = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [openWrongMail, setOpenWrongMail] = useState(false);
    const [openWeakPassword, setOpenWeakPassword] = useState(false);
    const [mailInUse, setMailInUse] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (error) {
            const errorCode = error.code
            console.log(error.code)
            if (errorCode === 'auth/invalid-email') {
                setOpenWrongMail(true)
            }

            if (errorCode === 'auth/weak-password') {
                setOpenWeakPassword(true)
            }

            if (errorCode === 'auth/email-already-in-use') {
                setMailInUse(true)
            }
        }
    };

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            navigate('/');
        } catch (err) {
            console.log(err)
        }

    }


    const theme = createTheme({
        overrides: {
            MuiInputBase: {
                input: {
                    border: 'none',
                    '&::before': {
                        content: 'none',
                    },
                },
            },
        },
        typography: {
            fontSize: 20
        }
    });

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    return (
        <Box sx={{
            padding: '2rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'Open Sans'
        }}>
            <Box sx={{

                border: '1px solid lightgray',
                overflow: 'scroll',
                borderRadius: '20px',
                padding: '4rem',
                background: 'white',
                boxShadow: 2

            }}>
                <ThemeProvider theme={theme}>
                    <Container component="main" maxWidth='xs'>
                        <CssBaseline/>
                        <Box
                            sx={{
                                marginTop: 5,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >

                            <h1 style={{
                                fontSize: '3rem',
                                fontWeight: 700,
                                textAlign: "center"
                            }}>
                                Zarejestruj się w SmartSpend i zacznij oszczędzać już dziś!
                            </h1>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="email"
                                            label="Adres email"
                                            name="email"
                                            autoComplete="email"
                                            autoFocus
                                            onChange={handleEmailChange}
                                            variant='filled'
                                            className='inputRounded'
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position='start'>
                                                        <EmailIcon/>
                                                    </InputAdornment>
                                                ),
                                                disableUnderline: true,
                                            }}
                                            InputLabelProps={{
                                                style: {
                                                    fontFamily: 'Open Sans',
                                                    color: 'rgba(0,55,87,1)'
                                                }
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="password"
                                            label="Hasło"
                                            type="password"
                                            id="password"
                                            autoComplete="current-password"
                                            onChange={handlePasswordChange}
                                            variant='filled'
                                            className='inputRounded'
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position='start'>
                                                        <Lock/>
                                                    </InputAdornment>
                                                ),
                                                disableUnderline: true,
                                            }}
                                            InputLabelProps={{
                                                style: {
                                                    fontFamily: 'Open Sans',
                                                    color: 'rgba(0,55,87,1)'
                                                }
                                            }}
                                        />
                                    </Grid>

                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    InputLabelProps={{
                                        style: {
                                            fontFamily: 'Open Sans',
                                            color: 'rgba(0,55,87,1)'
                                        }
                                    }}
                                    sx={{
                                        mt: 3,
                                        mb: 2,
                                        background: 'linear-gradient(149deg, rgba(0,55,87,1) 0%, rgba(0,96,135,1) 46%, rgba(0,157,189,1) 86%)',
                                        fontFamily: 'Open Sans',

                                    }}
                                >
                                    Zarejestruj się
                                </Button>
                                <Button

                                    variant="contained"
                                    sx={{
                                        fontFamily: 'Open Sans',
                                        mt: 3,
                                        mb: 2,
                                        background: 'linear-gradient(149deg, rgba(0,55,87,1) 0%, rgba(0,96,135,1) 46%, rgba(0,157,189,1) 86%)',
                                    }}
                                    type='button'
                                    fullWidth
                                    onClick={signInWithGoogle}
                                >
                                    Zarejestruj się przez Google
                                </Button>
                                <Grid container justifyContent="flex-end">
                                    <Grid item>
                                        <NavLink className="form__link" to='/login' variant="body2">
                                            Masz już konto? Zaloguj się!
                                        </NavLink>
                                    </Grid>
                                </Grid>
                            </Box>

                        </Box>
                        <Copyright sx={{mt: 5}}/>
                    </Container>
                </ThemeProvider>
                <SnackbarInfo severity={'error'} openState={openWrongMail} setOpenState={setOpenWrongMail}
                              message={'Podany adres email jest nieprawidłowy!'}/>
                <SnackbarInfo severity={'error'} openState={openWeakPassword} setOpenState={setOpenWeakPassword}
                              message={'Hasło musi składać się z minimum 6 znaków!'}/>
                <SnackbarInfo severity={'warning'} openState={mailInUse} setOpenState={setMailInUse}
                              message={'Podany adres email jest już w użyciu. '}/>

            </Box>
        </Box>
    );
}

export default SignUp